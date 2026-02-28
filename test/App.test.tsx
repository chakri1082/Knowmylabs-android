import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

vi.mock('../services/geminiService', () => ({
  getMedicalExplanations: vi.fn()
}));

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(),
  Type: {
    OBJECT: 'object',
    ARRAY: 'array',
    STRING: 'string',
    NUMBER: 'number'
  }
}));

import { getMedicalExplanations } from '../services/geminiService';
const mockGetMedicalExplanations = getMedicalExplanations as ReturnType<typeof vi.fn>;

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header', () => {
    render(<App />);
    expect(screen.getAllByText(/KnowMyLabs/i).length).toBeGreaterThan(0);
  });

  it('renders the input section', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter a test name/i)).toBeInTheDocument();
  });

  it('renders the feature cards on initial load', () => {
    render(<App />);
    expect(screen.getByText(/Visual Spectrum/i)).toBeInTheDocument();
    expect(screen.getByText(/Friendly Analogies/i)).toBeInTheDocument();
    expect(screen.getByText(/Warm Insights/i)).toBeInTheDocument();
  });

  it('shows loading state when processing text', async () => {
    mockGetMedicalExplanations.mockImplementation(() => new Promise(() => {}));

    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    await userEvent.type(input, 'Glucose');

    const button = screen.getByRole('button', { name: /Explain Clearly/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Creating your story/i)).toBeInTheDocument();
    });
  });

  it('shows results on successful text processing', async () => {
    mockGetMedicalExplanations.mockResolvedValue({
      explanations: [
        {
          testName: 'Glucose',
          value: '100',
          unit: 'mg/dL',
          refMin: 70,
          refMax: 100,
          interpretation: 'NORMAL' as const,
          whatItIs: 'A sugar in your blood',
          whatItMeasures: 'Blood sugar level',
          whyItsOrdered: 'Diabetes screening',
          upReasons: 'Diabetes, stress',
          downReasons: 'Hypoglycemia',
          analogy: 'Like fuel for your car',
          educationalNotes: 'Important energy source',
          personalInsight: 'Your level is normal',
          doctorAdvice: 'Please speak with a healthcare provider'
        }
      ]
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    await userEvent.type(input, 'Glucose');

    const button = screen.getByRole('button', { name: /Explain Clearly/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Your Health Summary/i)).toBeInTheDocument();
    });
    expect(screen.getByText('Glucose')).toBeInTheDocument();
  });

  it('shows error state when processing fails', async () => {
    mockGetMedicalExplanations.mockRejectedValue(new Error('API Error'));

    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    await userEvent.type(input, 'InvalidTest');

    const button = screen.getByRole('button', { name: /Explain Clear/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Something didn't quite click/i)).toBeInTheDocument();
    });
  });

  it('shows empty state when no explanations found', async () => {
    mockGetMedicalExplanations.mockResolvedValue({
      explanations: []
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    await userEvent.type(input, 'UnknownTest');

    const button = screen.getByRole('button', { name: /Explain Clear/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Nothing found yet/i)).toBeInTheDocument();
    });
  });

  it('allows retry after error', async () => {
    mockGetMedicalExplanations
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce({
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
            doctorAdvice: 'Consult doctor'
          }
        ]
      });

    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    await userEvent.type(input, 'Test');
    const button = screen.getByRole('button', { name: /Explain Clear/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Something didn't quite click/i)).toBeInTheDocument();
    });

    const retryButton = screen.getByRole('button', { name: /Try another search/i });
    await userEvent.click(retryButton);

    await userEvent.type(input, 'Glucose');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Your Health Summary/i)).toBeInTheDocument();
    });
  });

  it('renders the safety footer', () => {
    render(<App />);
    expect(screen.getByText(/Educational purposes only/i)).toBeInTheDocument();
  });
});
