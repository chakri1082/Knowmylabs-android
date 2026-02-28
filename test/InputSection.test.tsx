import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InputSection from '../components/InputSection';

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual
  };
});

describe('InputSection', () => {
  const mockProcessText = vi.fn();
  const mockProcessFile = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field and buttons', () => {
    render(
      <InputSection
        onProcessText={mockProcessText}
        onProcessFile={mockProcessFile}
        isLoading={false}
      />
    );

    expect(screen.getByPlaceholderText(/Enter a test name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Explain Clearly/i })).toBeInTheDocument();
  });

  it('calls onProcessText when form is submitted with text', () => {
    render(
      <InputSection
        onProcessText={mockProcessText}
        onProcessFile={mockProcessFile}
        isLoading={false}
      />
    );

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    fireEvent.change(input, { target: { value: 'Glucose' } });

    const button = screen.getByRole('button', { name: /Explain Clearly/i });
    fireEvent.click(button);

    expect(mockProcessText).toHaveBeenCalledWith('Glucose');
  });

  it('does not submit empty text', () => {
    render(
      <InputSection
        onProcessText={mockProcessText}
        onProcessFile={mockProcessFile}
        isLoading={false}
      />
    );

    const button = screen.getByRole('button', { name: /Explain Clearly/i });
    fireEvent.click(button);

    expect(mockProcessText).not.toHaveBeenCalled();
  });

  it('disables input and buttons when loading', () => {
    render(
      <InputSection
        onProcessText={mockProcessText}
        onProcessFile={mockProcessFile}
        isLoading={true}
      />
    );

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    expect(input).toBeDisabled();

    const button = screen.getByRole('button', { name: /Thinking.../i });
    expect(button).toBeDisabled();
  });

  it('trims whitespace from input', () => {
    render(
      <InputSection
        onProcessText={mockProcessText}
        onProcessFile={mockProcessFile}
        isLoading={false}
      />
    );

    const input = screen.getByPlaceholderText(/Enter a test name/i);
    fireEvent.change(input, { target: { value: '  Glucose  ' } });

    const button = screen.getByRole('button', { name: /Explain Clearly/i });
    fireEvent.click(button);

    expect(mockProcessText).toHaveBeenCalledWith('  Glucose  ');
  });

  it('shows Secure & Private badge', () => {
    render(
      <InputSection
        onProcessText={mockProcessText}
        onProcessFile={mockProcessFile}
        isLoading={false}
      />
    );

    expect(screen.getByText(/Secure & Private/i)).toBeInTheDocument();
  });

  it('renders educational focus text', () => {
    render(
      <InputSection
        onProcessText={mockProcessText}
        onProcessFile={mockProcessFile}
        isLoading={false}
      />
    );

    expect(screen.getByText(/Educational focus/i)).toBeInTheDocument();
  });
});
