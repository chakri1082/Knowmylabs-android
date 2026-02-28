
import { GoogleGenAI, Type } from "@google/genai";
import { ExplanationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are a friendly, expert medical explainer. 
Your goal is to help users understand their blood test results in clear, everyday language.

NEW MISSION:
1. Extract test names, user values, units, and reference ranges (min/max) from the provided text or image.
2. Interpret the value: Determine if it is LOW, NORMAL, or HIGH based on the reference range provided.
3. Explain why levels go UP and why they go DOWN for each specific test.
4. Provide a "Personal Insight": This should be a friendly sentence linking their specific value to common health concepts (e.g., "Your Ferritin is slightly low - this is often linked to iron intake.").
5. Provide "Doctor Advice" (Escalation Message): This MUST be clear and informative. Start or include the phrase "Please speak with a healthcare provider if..." followed by specific educational criteria for when a professional review is prioritized.
6. Still include the basic "What it is" and "Analogy" components.

TONE: Friendly, expert, calm.
STRICT RULE: Include the disclaimer "Educational purposes only" in spirit. Always emphasize that this is educational context, not a diagnosis or medical advice.
`;

export const getMedicalExplanations = async (input: string | { data: string, mimeType: string }): Promise<ExplanationResponse> => {
  const model = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: typeof input === 'string' 
      ? [{ parts: [{ text: input }] }]
      : { parts: [
          { inlineData: { data: input.data, mimeType: input.mimeType } },
          { text: "Extract all tests. For each, include the value, unit, and reference range found. If multiple historical values exist, focus on the most recent but mention the trend in personalInsight." }
        ]},
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                testName: { type: Type.STRING },
                value: { type: Type.STRING },
                unit: { type: Type.STRING },
                refMin: { type: Type.NUMBER },
                refMax: { type: Type.NUMBER },
                interpretation: { 
                  type: Type.STRING, 
                  description: "Must be LOW, NORMAL, HIGH, or NOT_APPLICABLE" 
                },
                whatItIs: { type: Type.STRING },
                whatItMeasures: { type: Type.STRING },
                whyItsOrdered: { type: Type.STRING },
                upReasons: { type: Type.STRING },
                downReasons: { type: Type.STRING },
                analogy: { type: Type.STRING },
                educationalNotes: { type: Type.STRING },
                personalInsight: { type: Type.STRING },
                doctorAdvice: { type: Type.STRING },
              },
              required: [
                "testName", "whatItIs", "upReasons", "downReasons", 
                "analogy", "personalInsight", "doctorAdvice"
              ]
            }
          }
        },
        required: ["explanations"]
      }
    }
  });

  const text = model.text || '{"explanations":[]}';
  return JSON.parse(text) as ExplanationResponse;
};
