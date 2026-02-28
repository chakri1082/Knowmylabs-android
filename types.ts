
export interface Explanation {
  testName: string;
  value?: string | number;
  unit?: string;
  refMin?: number;
  refMax?: number;
  interpretation?: 'LOW' | 'NORMAL' | 'HIGH' | 'NOT_APPLICABLE';
  whatItIs: string;
  whatItMeasures: string;
  whyItsOrdered: string;
  upReasons: string;
  downReasons: string;
  analogy: string;
  educationalNotes: string;
  personalInsight: string;
  doctorAdvice: string;
}

export interface ExplanationResponse {
  explanations: Explanation[];
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
