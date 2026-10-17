import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../data/portfolioData';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
}

const DEFAULT_TITLE = 'Navadeep — Software Engineering & AIML Developer Portfolio';
const DEFAULT_DESC =
  'Portfolio of Navadeep, B.Tech AIML student and software developer at MLRIT Hyderabad. Explore campus workflow platforms Statio-MLR and Fast Bite, in-browser client-side ML lab, and verified technical competencies.';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image = `${SITE_URL}/og-image.png`,
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Determine Title and Description based on route
    let pageTitle = title || DEFAULT_TITLE;
    let pageDesc = description || DEFAULT_DESC;

    if (!title) {
      if (pathname === '/projects') {
        pageTitle = 'Projects // Campus Platforms & Architecture Prototypes — Navadeep';
        pageDesc = 'Explore interactive prototypes and architecture specifications for campus platforms Statio-MLR, Fast Bite, and client-side systems.';
      } else if (pathname === '/projects/statio-mlr') {
        pageTitle = 'Statio-MLR: Campus Xerox & Stationery System // Case Study — Navadeep';
        pageDesc = 'Deep-dive into the student print workflow, decoupled QR pickup tokens, and counter queue elimination system at MLRIT.';
      } else if (pathname === '/projects/fast-bite') {
        pageTitle = 'Fast Bite: Digital Campus Canteen Ordering // Case Study — Navadeep';
        pageDesc = 'Mobile-first campus cafeteria queue scheduling, scheduled pickup windows, and token verification workflow.';
      } else if (pathname === '/about') {
        pageTitle = 'About // Technical Foundations & Philosophy — Navadeep';
        pageDesc = 'Undergraduate engineering journey in CSE (AI & ML) at MLRIT Hyderabad, technical philosophy, and verified hackathons.';
      } else if (pathname === '/resume') {
        pageTitle = 'Resume // ATS Single-Column Engineering Specification — Navadeep';
        pageDesc = 'Clean, single-column, ATS-friendly curriculum vitae for software engineering and applied AI/ML internship roles.';
      } else if (pathname === '/lab') {
        pageTitle = 'Lab // In-Browser Client-Side ML Playground — Navadeep';
        pageDesc = 'Real-time feedforward neural inference estimating canteen wait times in pure client-side TypeScript with zero API calls.';
      } else if (pathname === '/notes') {
        pageTitle = 'Engineering Notes // Architectural Field Logs — Navadeep';
        pageDesc = 'Technical reflections on decoupling QR tokens, client-side inference latency, and designing physical human workflows.';
      }
    }

    document.title = pageTitle;

    // Update meta tags dynamically
    const updateMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute(attr, value);
      }
    };

    updateMeta('meta[name="description"]', 'content', pageDesc);
    updateMeta('link[rel="canonical"]', 'href', `${SITE_URL}${pathname === '/' ? '' : pathname}`);
    updateMeta('meta[property="og:title"]', 'content', pageTitle);
    updateMeta('meta[property="og:description"]', 'content', pageDesc);
    updateMeta('meta[property="og:url"]', 'content', `${SITE_URL}${pathname}`);
    updateMeta('meta[property="og:image"]', 'content', image);
    updateMeta('meta[name="twitter:title"]', 'content', pageTitle);
    updateMeta('meta[name="twitter:description"]', 'content', pageDesc);
    updateMeta('meta[name="twitter:image"]', 'content', image);
  }, [pathname, title, description, image]);

  return null;
};
