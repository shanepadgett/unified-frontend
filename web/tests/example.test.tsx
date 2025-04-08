import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Example test', () => {
  it('should pass', () => {
    render(<div>Hello, world!</div>);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
