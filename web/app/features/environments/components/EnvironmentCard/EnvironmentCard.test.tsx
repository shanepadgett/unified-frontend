import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EnvironmentCard } from './index';
import { updateEnvironment, deleteEnvironment } from '../../services/environments';

// Mock the environment services
jest.mock('../../services/environments', () => ({
  updateEnvironment: jest.fn(),
  deleteEnvironment: jest.fn(),
}));

describe('EnvironmentCard', () => {
  const mockEnvironment = {
    id: '1',
    name: 'Development',
    description: 'Development environment',
    isDefault: true,
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2023-01-02T00:00:00Z'),
  };

  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders environment information correctly', () => {
    render(<EnvironmentCard environment={mockEnvironment} onUpdate={mockOnUpdate} />);
    
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Development environment')).toBeInTheDocument();
    expect(screen.getByText('Default')).toBeInTheDocument();
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
    expect(screen.getByText(/Last Updated:/)).toBeInTheDocument();
  });

  it('switches to edit mode when Edit button is clicked', () => {
    render(<EnvironmentCard environment={mockEnvironment} onUpdate={mockOnUpdate} />);
    
    fireEvent.click(screen.getByText('Edit'));
    
    expect(screen.getByLabelText('Name')).toHaveValue('Development');
    expect(screen.getByLabelText('Description')).toHaveValue('Development environment');
    expect(screen.getByLabelText('Set as default environment')).toBeChecked();
  });

  it('updates environment when Save button is clicked', async () => {
    (updateEnvironment as jest.Mock).mockResolvedValue(mockEnvironment);
    
    render(<EnvironmentCard environment={mockEnvironment} onUpdate={mockOnUpdate} />);
    
    // Switch to edit mode
    fireEvent.click(screen.getByText('Edit'));
    
    // Change values
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Dev' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Updated description' } });
    
    // Save changes
    fireEvent.click(screen.getByText('Save'));
    
    await waitFor(() => {
      expect(updateEnvironment).toHaveBeenCalledWith('1', {
        name: 'Updated Dev',
        description: 'Updated description',
        isDefault: true,
      });
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });

  it('cancels editing when Cancel button is clicked', () => {
    render(<EnvironmentCard environment={mockEnvironment} onUpdate={mockOnUpdate} />);
    
    // Switch to edit mode
    fireEvent.click(screen.getByText('Edit'));
    
    // Change values
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Dev' } });
    
    // Cancel changes
    fireEvent.click(screen.getByText('Cancel'));
    
    // Should be back in view mode with original values
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(updateEnvironment).not.toHaveBeenCalled();
  });

  it('disables Delete button for default environment', () => {
    render(<EnvironmentCard environment={mockEnvironment} onUpdate={mockOnUpdate} />);
    
    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeDisabled();
  });

  it('deletes environment when Delete button is clicked', async () => {
    const nonDefaultEnv = { ...mockEnvironment, isDefault: false };
    (deleteEnvironment as jest.Mock).mockResolvedValue(true);
    
    render(<EnvironmentCard environment={nonDefaultEnv} onUpdate={mockOnUpdate} />);
    
    fireEvent.click(screen.getByText('Delete'));
    
    await waitFor(() => {
      expect(deleteEnvironment).toHaveBeenCalledWith('1');
      expect(mockOnUpdate).toHaveBeenCalled();
    });
  });
});
