import { describe, it, expect } from 'vitest';
import { portfolioData, SITE_URL } from '../data/portfolioData';
import { resumeData } from '../data/resume';
import { caseStudies } from '../data/caseStudies';

describe('Data Integrity & Single Source of Truth', () => {
  it('verifies owner identity and contact facts', () => {
    expect(portfolioData.personal.name.toUpperCase()).toBe('NAVADEEP');
    expect(portfolioData.personal.location).toContain('Hyderabad');
    expect(portfolioData.contact.email).toBe('navadeepjustin@gmail.com');
    expect(portfolioData.contact.linkedin).toBe('https://www.linkedin.com/in/navadeep-justin-946366371');
    expect(portfolioData.contact.github).toBe('https://github.com/navadeepjustin-create');
    expect(portfolioData.contact.instagramHandle).toBe('navdeep_.07');
    expect(SITE_URL).toBe('https://portfolio-one-alpha-6gy1a73x99.vercel.app');
  });

  it('verifies academic credentials', () => {
    expect(portfolioData.education.degree).toBe('B.Tech in Computer Science & Engineering (AI & ML)');
    expect(portfolioData.education.institution).toBe('MLR Institute of Technology (MLRIT)');
    expect(portfolioData.education.location).toBe('Hyderabad, Telangana, India');
    expect(portfolioData.education.status).toContain('2022');
    expect(portfolioData.education.status).toContain('2026');
  });

  it('verifies hackathons have zero fabricated details', () => {
    expect(portfolioData.hackathons.length).toBe(2);
    expect(portfolioData.hackathons[0].name).toBe('Cloud technology hackathon');
    expect(portfolioData.hackathons[1].name).toBe('Finathon');
    portfolioData.hackathons.forEach((h) => {
      expect(h.role).toBe('Participant');
      // Must not invent prize, rank, or unconfirmed results
      expect(h.result).toBeUndefined();
    });
  });

  it('verifies projects do not overclaim beyond concept & prototype', () => {
    const statio = portfolioData.projects.find((p) => p.id === 'statio-mlr');
    const fastbite = portfolioData.projects.find((p) => p.id === 'fast-bite');
    const portfolioSite = portfolioData.projects.find((p) => p.id === 'portfolio-website');

    expect(statio).toBeDefined();
    expect(statio?.status).toBe('CONCEPT & PROTOTYPE');

    expect(fastbite).toBeDefined();
    expect(fastbite?.status).toBe('CONCEPT & PROTOTYPE');

    expect(portfolioSite).toBeDefined();
    expect(portfolioSite?.links?.repo).toBe('https://github.com/navadeepjustin-create/portfolio');
  });

  it('verifies resumeData mirrors portfolioData without discrepancies', () => {
    expect(resumeData.header.name.toUpperCase()).toBe(portfolioData.personal.name.toUpperCase());
    expect(resumeData.header.email).toBe(portfolioData.contact.email);
    expect(resumeData.header.linkedin.url).toContain('navadeep-justin-946366371');
    expect(resumeData.header.github.url).toContain('navadeepjustin-create');
    expect(resumeData.projects.length).toBe(3);
  });

  it('ensures case studies do not contain unsourced wait time claims', () => {
    Object.values(caseStudies).forEach((study) => {
      const studyString = JSON.stringify(study);
      expect(studyString).not.toContain('Students wait 30-45 minutes');
    });
  });
});
