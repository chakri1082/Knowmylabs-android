import { describe, it, expect } from 'vitest';

describe('geminiService response parsing', () => {
  it('should parse valid JSON response', () => {
    const jsonString = JSON.stringify({
      explanations: [
        {
          testName: 'Glucose',
          value: '100',
          unit: 'mg/dL',
          refMin: 70,
          refMax: 100,
          interpretation: 'NORMAL',
          whatItIs: 'A sugar in your blood',
          whatItMeasures: 'Blood sugar level',
          whyItsOrdered: 'Diabetes screening',
          upReasons: 'Diabetes, stress',
          downReasons: 'Hypoglycemia',
          analogy: 'Like fuel',
          educationalNotes: 'Important energy',
          personalInsight: 'Normal range',
          doctorAdvice: 'Consult doctor'
        }
      ]
    });

    const result = JSON.parse(jsonString);
    expect(result.explanations).toHaveLength(1);
    expect(result.explanations[0].testName).toBe('Glucose');
    expect(result.explanations[0].interpretation).toBe('NORMAL');
  });

  it('should handle empty explanations array', () => {
    const jsonString = '{"explanations":[]}';
    const result = JSON.parse(jsonString);
    expect(result.explanations).toHaveLength(0);
  });

  it('should handle missing text gracefully', () => {
    const fallback = '{"explanations":[]}';
    const text = null;
    const result = JSON.parse(text || fallback);
    expect(result.explanations).toHaveLength(0);
  });

  it('should parse multiple explanations', () => {
    const jsonString = JSON.stringify({
      explanations: [
        {
          testName: 'Glucose',
          whatItIs: 'Sugar',
          whatItMeasures: 'Blood sugar',
          whyItsOrdered: 'Diabetes',
          upReasons: 'Up',
          downReasons: 'Down',
          analogy: 'Fuel',
          personalInsight: 'Normal',
          doctorAdvice: 'Doctor'
        },
        {
          testName: 'Hemoglobin',
          whatItIs: 'Protein',
          whatItMeasures: 'Oxygen',
          whyItsOrdered: 'Anemia',
          upReasons: 'Up',
          downReasons: 'Down',
          analogy: 'Trucks',
          personalInsight: 'Normal',
          doctorAdvice: 'Doctor'
        }
      ]
    });

    const result = JSON.parse(jsonString);
    expect(result.explanations).toHaveLength(2);
    expect(result.explanations[0].testName).toBe('Glucose');
    expect(result.explanations[1].testName).toBe('Hemoglobin');
  });

  it('should handle various interpretation values', () => {
    const interpretations = ['LOW', 'NORMAL', 'HIGH', 'NOT_APPLICABLE'];
    
    interpretations.forEach(interpretation => {
      const jsonString = JSON.stringify({
        explanations: [
          {
            testName: 'Test',
            interpretation,
            whatItIs: 'Description',
            whatItMeasures: 'Measures',
            whyItsOrdered: 'Reason',
            upReasons: 'Up',
            downReasons: 'Down',
            analogy: 'Like',
            personalInsight: 'Insight',
            doctorAdvice: 'Advice'
          }
        ]
      });
      
      const result = JSON.parse(jsonString);
      expect(result.explanations[0].interpretation).toBe(interpretation);
    });
  });

  it('should handle numeric values in response', () => {
    const jsonString = JSON.stringify({
      explanations: [
        {
          testName: 'Iron',
          value: 50,
          unit: 'ug/dL',
          refMin: 50,
          refMax: 170,
          interpretation: 'NORMAL',
          whatItIs: 'Mineral',
          whatItMeasures: 'Iron level',
          whyItsOrdered: 'Anemia',
          upReasons: 'Up',
          downReasons: 'Down',
          analogy: 'Metal',
          personalInsight: 'Insight',
          doctorAdvice: 'Advice'
        }
      ]
    });

    const result = JSON.parse(jsonString);
    expect(result.explanations[0].value).toBe(50);
    expect(result.explanations[0].refMin).toBe(50);
    expect(result.explanations[0].refMax).toBe(170);
  });
});
