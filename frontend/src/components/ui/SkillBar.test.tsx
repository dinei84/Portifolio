import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkillBar } from './SkillBar';

describe('SkillBar', () => {
  it('should render skill name', () => {
    render(<SkillBar name="React" level={75} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should render progress bar with correct width style', () => {
    render(<SkillBar name="React" level={75} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveStyle({ width: '75%' });
  });

  it('should have aria-valuenow equal to level', () => {
    render(<SkillBar name="JavaScript" level={80} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '80');
  });

  it('should clamp level to 0–100', () => {
    render(<SkillBar name="Test" level={150} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveStyle({ width: '100%' });
  });
});
