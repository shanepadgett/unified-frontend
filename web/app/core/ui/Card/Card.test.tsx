import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardBody, CardFooter } from './index';

describe('Card', () => {
  it('renders correctly with default props', () => {
    render(<Card>Card Content</Card>);
    
    const card = screen.getByText('Card Content');
    expect(card.parentElement).toHaveClass('bg-white rounded-lg shadow-sm');
    expect(card.parentElement).toHaveClass('border border-gray-200');
    expect(card.parentElement).toHaveClass('p-4'); // Default padding is "md"
  });
  
  it('renders with different padding options', () => {
    const { rerender } = render(<Card padding="none">No Padding</Card>);
    
    let card = screen.getByText('No Padding');
    expect(card.parentElement).not.toHaveClass('p-3');
    expect(card.parentElement).not.toHaveClass('p-4');
    expect(card.parentElement).not.toHaveClass('p-6');
    
    rerender(<Card padding="sm">Small Padding</Card>);
    card = screen.getByText('Small Padding');
    expect(card.parentElement).toHaveClass('p-3');
    
    rerender(<Card padding="md">Medium Padding</Card>);
    card = screen.getByText('Medium Padding');
    expect(card.parentElement).toHaveClass('p-4');
    
    rerender(<Card padding="lg">Large Padding</Card>);
    card = screen.getByText('Large Padding');
    expect(card.parentElement).toHaveClass('p-6');
  });
  
  it('renders with hover effect when hoverable is true', () => {
    render(<Card hoverable>Hoverable Card</Card>);
    
    const card = screen.getByText('Hoverable Card');
    expect(card.parentElement).toHaveClass('transition-shadow hover:shadow-md');
  });
  
  it('renders without border when bordered is false', () => {
    render(<Card bordered={false}>No Border</Card>);
    
    const card = screen.getByText('No Border');
    expect(card.parentElement).not.toHaveClass('border border-gray-200');
  });
  
  it('renders with custom className', () => {
    render(<Card className="custom-class">Custom Class</Card>);
    
    const card = screen.getByText('Custom Class');
    expect(card.parentElement).toHaveClass('custom-class');
  });
  
  it('renders with CardHeader, CardBody, and CardFooter', () => {
    render(
      <Card>
        <CardHeader>Header Content</CardHeader>
        <CardBody>Body Content</CardBody>
        <CardFooter>Footer Content</CardFooter>
      </Card>
    );
    
    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    
    const header = screen.getByText('Header Content').parentElement;
    expect(header).toHaveClass('border-b border-gray-200');
    
    const body = screen.getByText('Body Content').parentElement;
    expect(body).toHaveClass('p-6');
    
    const footer = screen.getByText('Footer Content').parentElement;
    expect(footer).toHaveClass('border-t border-gray-200');
  });
});
