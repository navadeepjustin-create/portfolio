import type { Project } from '../types';

/**
 * Your projects. Add one object per project, newest or most important first.
 * Put screenshots in /public/projects and reference them like "/projects/my-app.png".
 * Only add links that really exist, and only describe results you can stand behind.
 *
 * Template (copy, paste and fill in):
 *
 * {
 *   id: 'my-project',
 *   name: 'My Project',
 *   summary: 'One or two sentences about what it is.',
 *   category: 'Web',                       // used for the filter buttons
 *   featured: true,                        // the first featured project gets the large layout
 *   problem: 'What problem does it solve?',
 *   contribution: 'What did you personally build?',
 *   stack: ['React', 'TypeScript'],
 *   features: ['Feature one', 'Feature two'],
 *   images: ['/projects/my-project-1.png'],
 *   imageAlt: 'Screenshot of the dashboard page',
 *   github: 'https://github.com/your-username/my-project',
 *   live: 'https://my-project.example.com',  // omit if not deployed
 *   status: '2025',
 * },
 */
export const projects: Project[] = [];
