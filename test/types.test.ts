import { describe, it, expect } from 'vitest';
import { AppState, Explanation, ExplanationResponse } from '../types';

describe('types', () => {
  describe('AppState', () => {
    it('should have correct enum values', () => {
      expect(AppState.IDLE).toBe('IDLE');
      expect(AppState.LOADING).toBe('LOADING');
      expect(AppState.SUCCESS).toBe('SUCCESS');
      expect(AppState.ERROR).toBe('ERROR');
    });
  });

  describe('Explanation', () => {
    it('should create a valid Explanation object', () => {
      const explanation: Explanation = {
        testName: 'Glucose',
        value: '100',
        unit: 'mg/dL',
        refMin: 70,
        refMax: 100,
        interpretation: 'NORMAL',
        whatItIs: 'A sugar',
        whatItMeasures: 'Blood sugar level',
        whyItsOrdered: 'Diabetes screening',
        upReasons: 'Diabetes, stress',
        downReasons: 'Hypoglycemia',
        analogy: 'Fuel for cells',
        educationalNotes: 'Important for energy',
        personalInsight: 'Your level is normal',
        doctorAdvice: 'Maintain healthy diet'
      };

      expect(explanation.testName).toBe('Glucose');
      expect(explanation.interpretation).toBe('NORMAL');
      expect(explanation.refMin).toBe(70);
      expect(explanation.refMax).toBe(100);
    });

    it('should allow optional fields to be undefined', () => {
      const explanation: Explanation = {
        testName: 'Test',
        whatItIs: 'Description',
        whatItMeasures: 'Measures something',
        whyItsOrdered: 'Ordered for reason',
        upReasons: 'Goes up because',
        downReasons: 'Goes down because',
        analogy: 'Like a metaphor',
        personalInsight: 'Insight text',
        doctorAdvice: 'Doctor advice text'
      };

      expect(explanation.value).toBeUndefined();
      expect(explanation.unit).toBeUndefined();
    });

    it('should accept all interpretation values', () => {
      const interpretations: Explanation['interpretation'][] = ['LOW', 'NORMAL', 'HIGH', 'NOT_APPLICABLE'];
      
      interpretations.forEach(interpretation => {
        const explanation: Explanation = {
          testName: 'Test',
          whatItIs: 'Description',
          whatItMeasures: 'Measures something',
          whyItsOrdered: 'Ordered for reason',
          upReasons: 'Goes up because',
          downReasons: 'Goes down because',
          analogy: 'Like a metaphor',
          personalInsight: 'Insight text',
          doctorAdvice: 'Doctor advice text',
          interpretation
        };
        expect(explanation.interpretation).toBe(interpretation);
      });
    });
  });

  describe('ExplanationResponse', () => {
    it('should create a valid ExplanationResponse object', () => {
      const response: ExplanationResponse = {
        explanations: [
          {
            testName: 'Test 1',
            whatItIs: 'Description 1',
            whatItMeasures: 'Measures 1',
            whyItsOrdered: 'Reason 1',
            upReasons: 'Up 1',
            downReasons: 'Down 1',
            analogy: 'Analogy 1',
            personalInsight: 'Insight 1',
            doctorAdvice: 'Advice 1'
          }
        ]
      };

      expect(response.explanations).toHaveLength(1);
      expect(response.explanations[0].testName).toBe('Test 1');
    });

    it('should allow empty explanations array', () => {
      const response: ExplanationResponse = {
        explanations: []
      };

      expect(response.explanations).toHaveLength(0);
    });
  });
});
