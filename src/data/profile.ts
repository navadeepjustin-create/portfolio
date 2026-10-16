/**
 * Who you are. Only facts you have confirmed belong here.
 * The About copy below is a first draft written from the details provided:
 * rewrite it in your own voice.
 */
export const profile = {
  name: 'Navadeep',
  degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
  college: 'MLR Institute of Technology',
  collegeShort: 'MLRIT',

  goal: 'Build strong technical skills, develop impactful projects, and pursue internships and career opportunities in technology.',

  about: {
    paragraphs: [
      "I'm Navadeep, a B.Tech student in Computer Science and Engineering with a specialisation in AI & ML at MLR Institute of Technology.",
      'I am drawn to artificial intelligence and machine learning, and to the everyday craft of software and web development: the moment an idea turns into something you can open, click and use. I learn best by building practical projects.',
      'My aim is to build strong technical foundations, make projects that are genuinely useful, and turn that work into internships and opportunities in technology.',
    ],
    /** Optional. Write a short personal statement (1-3 sentences) in your own words. */
    statement: '',
  },

  /** Areas of focus. Keep these to interests you actually pursue. */
  focusAreas: [
    { title: 'Artificial Intelligence', note: 'Understanding how intelligent systems are built.' },
    { title: 'Machine Learning', note: 'Learning from data, step by step.' },
    { title: 'Software Development', note: 'Writing clear, maintainable code.' },
    { title: 'Web Development', note: 'Building interfaces people enjoy using.' },
  ],
} as const;
