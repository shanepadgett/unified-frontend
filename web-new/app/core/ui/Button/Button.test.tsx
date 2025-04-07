import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './index';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
  });
  
  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    
    let button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-gray-200');
    
    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('border-gray-300');
    
    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toHaveClass('hover:bg-gray-100');
    
    rerender(<Button variant="danger">Danger</Button>);
    button = screen.getByRole('button', { name: /danger/i });
    expect(button).toHaveClass('bg-red-600');
  });
  
  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    
    let button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('px-3 py-1.5 text-sm');
    
    rerender(<Button size="md">Medium</Button>);
    button = screen.getByRole('button', { name: /medium/i });
    expect(button).toHaveClass('px-4 py-2 text-base');
    
    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('px-6 py-3 text-lg');
  });
  
  it('renders with icons', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const rightIcon = <span data-testid="right-icon">→</span>;
    
    render(
      <Button leftIcon={leftIcon} rightIcon={rightIcon}>
        With Icons
      </Button>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
  
  it('renders in loading state', () => {
    render(<Button isLoading>Loading</Button>);
    
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-80 cursor-not-allowed');
    
    // Check for loading spinner
    const spinner = document.querySelector('svg.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
  
  it('renders in disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-60 cursor-not-allowed');
  });
  
  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('does not call onClick handler when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );
    
    const button = screen.getByRole('button', { name: /disabled/i });
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});
