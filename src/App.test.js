import { render, screen } from '@testing-library/react';
import App from './App';

test('renders accessibility test page', () => {
  render(<App />);
  const headingElement = screen.getByText(/Accessibility Test Page/i);
  expect(headingElement).toBeInTheDocument();
});
