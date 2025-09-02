import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

jest.mock('next/link', () => {
  return ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

describe('Button component', () => {
  it('renders as a button by default', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders as an anchor when as="a"', () => {
    render(
      <Button as="a" href="/test">
        Go to test
      </Button>
    );
    const link = screen.getByRole('link', { name: /go to test/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders as Next.js Link when as="link"', () => {
    render(
      <Button as="link" href="/next">
        Next Link
      </Button>
    );
    const link = screen.getByRole('link', { name: /next link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/next');
  });

  it('applies correct classes', () => {
    render(
      <Button variant="outline" size="lg" className="custom-class">
        Styled Button
      </Button>
    );
    const button = screen.getByRole('button', { name: /styled button/i });
    expect(button.className).toMatch(/outline/);
    expect(button.className).toMatch(/lg/);
    expect(button.className).toMatch(/custom-class/);
  });

  it('triggers onClick handler', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole('button', { name: /click/i });

    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
