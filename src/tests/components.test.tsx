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

  it('renders Navbar mobile drawer with scrollable container and active node indicators', async () => {
    const { Navbar } = await import('../components/Navbar');
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Find and click mobile menu toggle button
    const toggleButton = screen.getByRole('button', { name: /open navigation menu/i });
    expect(toggleButton).toBeInTheDocument();
    fireEvent.click(toggleButton);

    // Verify mobile drawer dialog and node items
    const mobileDrawer = screen.getByRole('dialog', { name: /mobile navigation menu/i });
    expect(mobileDrawer).toBeInTheDocument();
    expect(mobileDrawer.className).toContain('overflow-y-auto');
    expect(mobileDrawer.className).toContain('touch-pan-y');
    expect(screen.getByText(/ACTIVE NODE/i)).toBeInTheDocument();
    expect(screen.getByText(/SYSTEM \/\/ NAVIGATION/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /projects/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('renders ArchitectureDiagram with horizontal touch scrollable node topology and swipe cue', async () => {
    const { ArchitectureDiagram } = await import('../components/ArchitectureDiagram');
    render(<ArchitectureDiagram projectId="statio-mlr" />);

    // Check header and mobile swipe cue
    expect(screen.getByText(/SYSTEM TOPOLOGY \/\/ STATIO-MLR ARCHITECTURE/i)).toBeInTheDocument();
    expect(screen.getByText(/← SWIPE NODES →/i)).toBeInTheDocument();

    // Check SVG node topology region
    const diagramRegion = screen.getByRole('region', { name: /Statio-MLR System Architecture Diagram/i });
    expect(diagramRegion).toBeInTheDocument();
  });
});
