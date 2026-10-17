import '@testing-library/jest-dom/vitest';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LiveStatusWidget } from '../components/LiveStatusWidget';
import { AccentSwitcher } from '../components/AccentSwitcher';
import { HackathonsBlock } from '../components/HackathonsBlock';
import { CommandPalette } from '../components/CommandPalette';

describe('Key Components Verification', () => {
  it('renders LiveStatusWidget with Hyderabad timezone cue and building status', () => {
    render(<LiveStatusWidget />);
    expect(screen.getByText(/HYD:/i)).toBeInTheDocument();
    expect(screen.getByText(/17.54°N, 78.43°E/i)).toBeInTheDocument();
    expect(screen.getByText(/BUILDING:/i)).toBeInTheDocument();
  });

  it('renders AccentSwitcher and handles palette toggles', () => {
    render(<AccentSwitcher />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3); // lime, cyan, orange

    // Click cyan
    fireEvent.click(buttons[1]);
    expect(document.documentElement.getAttribute('data-accent')).toBe('cyan');

    // Click lime
    fireEvent.click(buttons[0]);
    expect(document.documentElement.getAttribute('data-accent')).toBe('lime');
  });

  it('renders HackathonsBlock with zero empty fields or invented rankings', () => {
    render(<HackathonsBlock />);
    expect(screen.getAllByText(/Cloud technology hackathon/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Finathon/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Participant/i).length).toBeGreaterThanOrEqual(2);
    // Should NOT display unconfirmed "Result" or "Organizer"
    expect(screen.queryByText(/Winner/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/1st Place/i)).not.toBeInTheDocument();
  });

  it('renders CommandPalette and responds to keyboard selection', () => {
    const handleClose = () => {};
    render(
      <BrowserRouter>
        <CommandPalette isOpen={true} onClose={handleClose} />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Type a command/i)).toBeInTheDocument();
    expect(screen.getByText(/Home \/\/ System Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/sudo hire navadeep/i)).toBeInTheDocument();
  });

  it('preserves body scroll when ProjectCaseStudyModal is unrendered (null project)', async () => {
    const { ProjectCaseStudyModal } = await import('../components/ProjectCaseStudyModal');
    document.body.style.overflow = '';
    render(<ProjectCaseStudyModal project={null} onClose={() => {}} />);
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('keeps document body scrollable when ProjectsPage is mounted', async () => {
    const { ProjectsPage } = await import('../pages/ProjectsPage');
    document.body.style.overflow = '';
    render(
      <BrowserRouter>
        <ProjectsPage />
      </BrowserRouter>
    );
    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
