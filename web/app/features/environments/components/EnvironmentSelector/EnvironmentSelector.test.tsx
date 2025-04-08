import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EnvironmentSelector } from './index';
import { getEnvironments } from '../../services/environments';

// Mock the environment services
jest.mock('../../services/environments', () => ({
  getEnvironments: jest.fn(),
}));

describe('EnvironmentSelector', () => {
  const mockEnvironments = [
    {
      id: '1',
      name: 'development',
      description: 'Development environment',
      isDefault: true,
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
    {
      id: '2',
      name: 'staging',
      description: 'Staging environment',
      isDefault: false,
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
    {
      id: '3',
      name: 'production',
      description: 'Production environment',
      isDefault: false,
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
    },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (getEnvironments as jest.Mock).mockResolvedValue(mockEnvironments);
  });

  it('renders with loading state initially', () => {
    render(
      <EnvironmentSelector
        selectedEnvironment="development"
        onChange={mockOnChange}
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders environments after loading', async () => {
    render(
      <EnvironmentSelector
        selectedEnvironment="development"
        onChange={mockOnChange}
      />
    );
    
    await waitFor(() => {
      expect(getEnvironments).toHaveBeenCalled();
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.getByText('Staging')).toBeInTheDocument();
      expect(screen.getByText('Production')).toBeInTheDocument();
    });
  });

  it('selects the correct environment', async () => {
    render(
      <EnvironmentSelector
        selectedEnvironment="staging"
        onChange={mockOnChange}
      />
    );
    
    await waitFor(() => {
      const select = screen.getByRole('combobox') as HTMLSelectElement;
      expect(select.value).toBe('staging');
    });
  });

  it('calls onChange when selection changes', async () => {
    render(
      <EnvironmentSelector
        selectedEnvironment="development"
        onChange={mockOnChange}
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Development')).toBeInTheDocument();
    });
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'production' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('production');
  });

  it('selects default environment when current selection is not available', async () => {
    render(
      <EnvironmentSelector
        selectedEnvironment="nonexistent"
        onChange={mockOnChange}
      />
    );
    
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('development');
    });
  });

  it('uses fallback environments when API call fails', async () => {
    (getEnvironments as jest.Mock).mockRejectedValue(new Error('API error'));
    
    render(
      <EnvironmentSelector
        selectedEnvironment="development"
        onChange={mockOnChange}
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Development')).toBeInTheDocument();
      expect(screen.getByText('Staging')).toBeInTheDocument();
      expect(screen.getByText('Production')).toBeInTheDocument();
    });
  });
});
