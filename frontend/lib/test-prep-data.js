/**
 * Test Preparation Data for PTE, TOEFL, GRE, and GMAT.
 *
 * Provides structured content matching the exact layout and section design of the IELTS page:
 * 1. Hero Content & Stats
 * 2. 4 Benefit Indicators
 * 3. About the Test (Overview, Who Should Take It, Test Format, Scoring & Duration)
 * 4. Versions & Coaching Modules
 * 5. What Students Get (6 benefits)
 * 6. Teaching Approach (5 steps)
 * 7. Why Choose Reasons & 5 Comprehensive FAQs
 * 8. Final CTA Content
 */

export const TEST_PREP_DATA = {
  pte: {
    heroContent: {
      eyebrow: 'PTE ACADEMIC PREPARATION — SHINE CONSULTANT',
      headline: 'PTE Academic Preparation — Fast, Fair & Computer-Based.',
      supportingLine:
        'Master PTE Academic with AI-calibrated mock scoring, integrated skill strategies, and personalized coaching from Borivali West, Mumbai.',
      primaryCtaLabel: 'Book Free Consultation',
      primaryCtaHref: '/book-consultation',
      secondaryCtaLabel: 'Explore Syllabus',
      secondaryCtaHref: '#about-pte',
    },
    heroStats: [
      {
        value: '3 Parts',
        label: 'integrated test sections',
        srLabel: 'Speaking & Writing, Reading, Listening',
      },
      {
        value: '2 Hours',
        label: 'single computer sitting',
        srLabel: 'Two-hour computer exam',
      },
      {
        value: '10–90',
        label: 'Global Scale of English',
        srLabel: 'Scored from 10 to 90 on GSE',
        featureLabel: 'Score Scale',
      },
    ],
    benefitIndicators: [
      {
        icon: 'GraduationCap',
        title: 'Expert Faculty',
        subtitle: 'Certified PTE specialists',
      },
      {
        icon: 'Laptop',
        title: 'Computer Lab Practice',
        subtitle: 'Official interface mock exams',
      },
      {
        icon: 'TrendingUp',
        title: 'Score Improvement',
        subtitle: 'AI-aligned scoring strategies',
      },
      {
        icon: 'Headphones',
        title: 'One-on-One Feedback',
        subtitle: 'Personalised speech & essay analysis',
      },
    ],
    about: {
      badgeTitle: 'PTE Academic',
      badgeSubtitle: 'Pearson Test of English Academic',
      overviewText:
        'PTE Academic is a multi-level, computer-based English language test trusted by universities, colleges and governments worldwide for international study and migration.',
      cards: [
        {
          icon: 'Users',
          title: 'Who Should Take It?',
          description:
            'Students seeking university admissions in Australia, New Zealand, the UK, Canada, and the USA, as well as migration applicants.',
        },
        {
          icon: 'Calendar',
          title: 'Test Format',
          description:
            '100% computer-based test covering Speaking & Writing, Reading, and Listening through 20 integrated question types.',
        },
        {
          icon: 'Clock',
          title: 'Scoring & Results',
          description:
            'Scored on the Global Scale of English (10–90). Fast turnaround with official results typically available in 48 hours.',
        },
      ],
    },
    versions: {
      eyebrow: 'TARGETED COACHING',
      title: 'PTE Formats',
      items: [
        {
          title: 'PTE Academic',
          subtitle: 'Higher Education & Professional Licensure',
          description:
            'Accepted by 3,300+ universities worldwide including Harvard, Oxford, and all universities in Australia and New Zealand.',
          bullets: [
            'Undergraduate & postgraduate university admissions',
            'Accepted for Australian & New Zealand student & work visas',
          ],
          ctaLabel: 'Enquire for PTE Academic',
        },
        {
          title: 'PTE Core',
          subtitle: 'Immigration & Permanent Residency',
          description:
            'Approved by Immigration, Refugees and Citizenship Canada (IRCC) for Canadian PR, Express Entry, and work permits.',
          bullets: [
            'General English proficiency for Canadian migration',
            'Real-life everyday English communication tasks',
          ],
          ctaLabel: 'Enquire for PTE Core',
        },
      ],
    },
    modules: [
      {
        title: 'Speaking & Writing',
        icon: 'MessageSquare',
        duration: 'Part 1 • 54–67 Minutes',
        focus: 'Personal introduction, Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture, Summarize Written Text, and Essay.',
        bullets: [
          'Fluency and pronunciation drills',
          'Structured templates for Describe Image & Retell Lecture',
          'Essay grammar, vocabulary and coherence training',
        ],
      },
      {
        title: 'Reading',
        icon: 'BookOpen',
        duration: 'Part 2 • 29–30 Minutes',
        focus: 'Reading & Writing Fill in the Blanks, Multiple Choice, Re-order Paragraphs, and Reading Fill in the Blanks.',
        bullets: [
          'Collocation and academic vocabulary mastery',
          'Re-order paragraph sequence & logical connectors',
          'Speed reading and context-clue techniques',
        ],
      },
      {
        title: 'Listening',
        icon: 'Headphones',
        duration: 'Part 3 • 30–43 Minutes',
        focus: 'Summarize Spoken Text, Multiple Choice, Fill in the Blanks, Highlight Correct Summary, Select Missing Word, and Write from Dictation.',
        bullets: [
          'Shorthand note-taking strategies for fast audio',
          'Write from Dictation spelling and memory drills',
          'Accent familiarisation (British, American, Australian)',
        ],
      },
    ],
    benefits: [
      'Full-length computer-based mock tests',
      'AI scoring algorithm insights & error mapping',
      'Certified, experienced PTE trainers',
      'Personalised diagnostic study plan',
      'Question-specific templates and timing tactics',
      'One-on-one speaking pronunciation feedback',
    ],
    teachingSteps: [
      {
        step: '01',
        title: 'Diagnostic Test',
        description: 'Evaluate your baseline scores across all 20 question types.',
      },
      {
        step: '02',
        title: 'Skill Gap Analysis',
        description: 'Identify where enabling skills (fluency, grammar, pronunciation) lose marks.',
      },
      {
        step: '03',
        title: 'Template & Strategy Drills',
        description: 'Master high-yield templates for speaking, writing and dictation.',
      },
      {
        step: '04',
        title: 'Timed Computer Mocks',
        description: 'Practice on real-feel testing software with strict time constraints.',
      },
      {
        step: '05',
        title: 'Final Score Polishing',
        description: 'Review mock reports and calibrate pacing for your target score.',
      },
    ],
    reasons: [
      {
        icon: 'Award',
        title: 'Certified Faculty',
        description: 'Trainers with extensive experience in PTE computer test nuances.',
      },
      {
        icon: 'Laptop',
        title: 'PTE Simulation Lab',
        description: 'Practice on dedicated workstations mirroring official exam conditions.',
      },
      {
        icon: 'Target',
        title: 'AI Score Mapping',
        description: 'Understand how PTE machine scoring evaluates oral fluency and pronunciation.',
      },
      {
        icon: 'Layers',
        title: 'Structured Strategy',
        description: 'High-scoring response frameworks and time management methods.',
      },
    ],
    faqs: [
      {
        id: 1,
        question: 'What is the PTE Academic test?',
        answer:
          'PTE Academic (Pearson Test of English) is a computer-based English language test that measures speaking, writing, reading and listening skills in a single two-hour sitting. It uses automated AI scoring for objective, consistent results.',
        icon: '💬',
      },
      {
        id: 2,
        question: 'Which countries accept PTE Academic for study and visas?',
        answer:
          'PTE Academic is accepted by 100% of universities in Australia and New Zealand, 99% of UK universities, thousands of institutions in the US and Canada, and is approved for all Australian, New Zealand, and UK visa applications.',
      },
      {
        id: 3,
        question: 'How is PTE different from IELTS?',
        answer:
          'Unlike IELTS, which offers paper and computer tests with a face-to-face speaking examiner, PTE is 100% computer-based, including speaking into a microphone. PTE also features integrated scoring, where tasks often contribute to two skill scores simultaneously.',
      },
      {
        id: 4,
        question: 'How soon do I receive my PTE score report?',
        answer:
          'PTE results are typically released very quickly — often within 48 hours of test completion, and sometimes in as little as 24 hours, making it ideal for tight university or visa deadlines.',
        icon: '💡',
      },
      {
        id: 5,
        question: 'How does Shine Consultant prepare students for PTE?',
        answer:
          'We provide diagnostic evaluation, dedicated computer lab practice, high-scoring speaking templates, vocabulary and collocation lists, timed mock tests, and personalized performance reviews from experienced trainers.',
      },
    ],
    finalCta: {
      headline: 'Ready to Achieve Your Target PTE Score?',
      description:
        'Join Shine Consultant’s PTE preparation programme and master the computer-based exam with proven AI-aligned strategies.',
    },
  },

  toefl: {
    heroContent: {
      eyebrow: 'TOEFL iBT PREPARATION — SHINE CONSULTANT',
      headline: 'TOEFL iBT Preparation — Master Academic English for Global Universities.',
      supportingLine:
        'Comprehensive TOEFL coaching covering all four papers with authentic practice tests, speaking feedback, and university-aligned target score planning.',
      primaryCtaLabel: 'Book Free Consultation',
      primaryCtaHref: '/book-consultation',
      secondaryCtaLabel: 'Explore Syllabus',
      secondaryCtaHref: '#about-toefl',
    },
    heroStats: [
      {
        value: '4 Sections',
        label: 'Reading, Listening, Speaking, Writing',
        srLabel: 'Four core test sections',
      },
      {
        value: '< 2 Hours',
        label: 'enhanced shorter format',
        srLabel: 'Enhanced test takes under two hours',
      },
      {
        value: '0–120',
        label: 'scaled score range (30 per section)',
        srLabel: 'Total score from 0 to 120 points',
        featureLabel: 'Score Scale',
      },
    ],
    benefitIndicators: [
      {
        icon: 'GraduationCap',
        title: 'ETS-Oriented Faculty',
        subtitle: 'Specialists in academic English',
      },
      {
        icon: 'BookOpen',
        title: 'Timed Mock Tests',
        subtitle: 'Authentic ETS format practice',
      },
      {
        icon: 'TrendingUp',
        title: 'Target Band Strategy',
        subtitle: '100+ score roadmap',
      },
      {
        icon: 'Headphones',
        title: 'Speaking & Writing Critiques',
        subtitle: 'Detailed rubric-based evaluations',
      },
    ],
    about: {
      badgeTitle: 'TOEFL iBT',
      badgeSubtitle: 'Test of English as a Foreign Language',
      overviewText:
        'The TOEFL iBT test measures your ability to understand and use English at the university level. It accurately evaluates how well you integrate reading, listening, speaking, and writing skills to succeed in academic classrooms.',
      cards: [
        {
          icon: 'Users',
          title: 'Who Should Take It?',
          description:
            'Students planning to study undergraduate or postgraduate programmes in the USA, Canada, the UK, Europe, Australia, and worldwide.',
        },
        {
          icon: 'Calendar',
          title: 'Test Format',
          description:
            'Administered via computer with 4 sections: Reading (20 Qs), Listening (28 Qs), Speaking (4 tasks), and Writing (2 tasks).',
        },
        {
          icon: 'Clock',
          title: 'Duration & Scoring',
          description:
            'Completed in under 2 hours. Scored out of 120 points (0–30 per section). Official test scores are valid for 2 years.',
        },
      ],
    },
    versions: {
      eyebrow: 'TARGETED COACHING',
      title: 'TOEFL Options',
      items: [
        {
          title: 'TOEFL iBT (Test Center)',
          subtitle: 'Authorised Secure Testing Center',
          description:
            'The gold standard test taken on a desktop computer at an approved ETS test center with strict invigilation.',
          bullets: [
            'Accepted by 12,500+ institutions across 160+ countries',
            'Full audio headset and individual testing booth',
          ],
          ctaLabel: 'Enquire for Test Center TOEFL',
        },
        {
          title: 'TOEFL iBT Home Edition',
          subtitle: 'Secure At-Home Testing',
          description:
            'The identical exam taken from your personal computer at home, monitored live by an online human proctor.',
          bullets: [
            '100% identical content, scoring, and university acceptance',
            'Flexible scheduling available 4 days a week, 24 hours a day',
          ],
          ctaLabel: 'Enquire for Home Edition',
        },
      ],
    },
    modules: [
      {
        title: 'Reading Section',
        icon: 'BookOpen',
        duration: '20 Questions • 35 Minutes',
        focus: 'Academic passages excerpted from university textbooks covering diverse science, history, and social science topics.',
        bullets: [
          'Factual information, negative factual, and inference questions',
          'Vocabulary in context and sentence simplification',
          'Reading to learn: summary and category chart questions',
        ],
      },
      {
        title: 'Listening Section',
        icon: 'Headphones',
        duration: '28 Questions • 36 Minutes',
        focus: 'Conversations and university lectures reflecting real campus dialogues and academic discussions.',
        bullets: [
          'Note-taking strategies for long academic lectures',
          'Pragmatic understanding: speaker attitude and purpose',
          'Connecting information: organization and relationship questions',
        ],
      },
      {
        title: 'Speaking Section',
        icon: 'MessageSquare',
        duration: '4 Tasks • 16 Minutes',
        focus: '1 Independent task on familiar topics and 3 Integrated tasks combining reading, listening, and spoken response.',
        bullets: [
          'Structured response templates within strict 45-60s timers',
          'Clear pronunciation, intonation, and topic development',
          'Synthesizing campus announcements and lecture key points',
        ],
      },
      {
        title: 'Writing Section',
        icon: 'Edit3',
        duration: '2 Tasks • 29 Minutes',
        focus: 'Integrated Writing task (reading + listening lecture) and Academic Discussion Writing task.',
        bullets: [
          'Contrasting reading points with lecture counterarguments',
          'Academic discussion task: engaging clearly in an online forum',
          'Grammar precision, lexical variety, and essay coherence',
        ],
      },
    ],
    benefits: [
      'Full-length timed mock tests matching the new shorter format',
      'Integrated task mastery: synthesising audio and reading texts',
      'Experienced TOEFL trainers with American English expertise',
      'Personalised study plan targeting a 100+ score',
      'ETS rubric-aligned essay evaluations and corrected drafts',
      'One-on-one speaking recording reviews and feedback',
    ],
    teachingSteps: [
      {
        step: '01',
        title: 'Diagnostic Test',
        description: 'Complete a full baseline test to uncover your section strengths and score deficits.',
      },
      {
        step: '02',
        title: 'Academic Skill Building',
        description: 'Develop fast reading comprehension and lecture note-taking techniques.',
      },
      {
        step: '03',
        title: 'Integrated Task Mastery',
        description: 'Practice combining reading, listening, and speaking/writing seamlessly.',
      },
      {
        step: '04',
        title: 'Timed Mock Simulations',
        description: 'Take full-length tests under official time pressure to master pacing.',
      },
      {
        step: '05',
        title: 'Target Score Calibration',
        description: 'Review writing and speaking rubrics to secure top university admission scores.',
      },
    ],
    reasons: [
      {
        icon: 'Award',
        title: 'ETS Rubric Experts',
        description: 'Faculty trained in the exact scoring rubrics used by ETS examiners.',
      },
      {
        icon: 'Users',
        title: 'US Admissions Knowledge',
        description: 'Guidance on university-specific cutoff scores for top US and global colleges.',
      },
      {
        icon: 'Target',
        title: 'Targeted Score Strategy',
        description: 'Specific score improvement plans designed to push you past the 100+ threshold.',
      },
      {
        icon: 'Layers',
        title: 'Interactive Coaching',
        description: 'Engaging classroom sessions with live speaking practice and peer review.',
      },
    ],
    faqs: [
      {
        id: 1,
        question: 'What is the TOEFL iBT test?',
        answer:
          'The TOEFL iBT (Test of English as a Foreign Language internet-based test) evaluates your proficiency in academic English across Reading, Listening, Speaking, and Writing. It is particularly popular for US, Canadian, and European university admissions.',
        icon: '💬',
      },
      {
        id: 2,
        question: 'What is a good TOEFL score for top universities?',
        answer:
          'While cutoff requirements vary, most competitive universities look for a score of 80 to 90 for general admission, and 100+ (with 25+ in Speaking and Writing) for top-tier institutions, Ivy League universities, and teaching assistantships.',
      },
      {
        id: 3,
        question: 'How long does the new shorter TOEFL iBT take?',
        answer:
          'In July 2023, ETS streamlined the TOEFL iBT to under two hours. The test includes shorter reading and listening sections, streamlined instructions, and replaced the Independent Writing task with a concise "Writing for an Academic Discussion" task.',
      },
      {
        id: 4,
        question: 'Is TOEFL accepted in the UK and Canada?',
        answer:
          'Yes, TOEFL iBT is accepted by 100% of UK universities, including all Russell Group institutions, and by all major Canadian universities. It is also approved for Canadian Student Direct Stream (SDS) visa processing.',
        icon: '💡',
      },
      {
        id: 5,
        question: 'How does Shine Consultant help with TOEFL coaching?',
        answer:
          'We offer comprehensive classroom and online coaching, diagnostic testing, extensive practice on academic reading and note-taking, speech recording analysis, essay correction, and full-length timed mock exams.',
      },
    ],
    finalCta: {
      headline: 'Ready to Achieve Your Target TOEFL Score?',
      description:
        'Join Shine Consultant’s TOEFL preparation programme and gain the academic English confidence required for your dream university.',
    },
  },

  gre: {
    heroContent: {
      eyebrow: 'GRE PREPARATION — SHINE CONSULTANT',
      headline: 'GRE Preparation — Unlock Top Master’s, MS & PhD Programmes Worldwide.',
      supportingLine:
        'Targeted coaching for the shorter GRE General Test focusing on advanced quantitative problem-solving, vocabulary mastery, critical reading, and analytical writing.',
      primaryCtaLabel: 'Book Free Consultation',
      primaryCtaHref: '/book-consultation',
      secondaryCtaLabel: 'Explore Syllabus',
      secondaryCtaHref: '#about-gre',
    },
    heroStats: [
      {
        value: '3 Measures',
        label: 'Quant, Verbal & Analytical Writing',
        srLabel: 'Three key test measures',
      },
      {
        value: '1 hr 58 min',
        label: 'shorter official test duration',
        srLabel: 'Completed in under two hours',
      },
      {
        value: '260–340',
        label: 'combined score scale (130–170 each)',
        srLabel: 'Combined score range from 260 to 340',
        featureLabel: 'Score Scale',
      },
    ],
    benefitIndicators: [
      {
        icon: 'GraduationCap',
        title: 'Specialist Faculty',
        subtitle: 'Dedicated Quant & Verbal mentors',
      },
      {
        icon: 'Calculator',
        title: 'Quant Logic Mastery',
        subtitle: 'Shortcuts, not memorisation',
      },
      {
        icon: 'TrendingUp',
        title: '320+ Score Target',
        subtitle: 'Targeted top-tier strategies',
      },
      {
        icon: 'BookOpen',
        title: 'Adaptive Mock Tests',
        subtitle: 'Official section-level adaptive practice',
      },
    ],
    about: {
      badgeTitle: 'GRE General',
      badgeSubtitle: 'Graduate Record Examinations',
      overviewText:
        'The GRE General Test is the world’s most widely accepted graduate admissions test for master’s, specialised master’s in business, MBA, JD, and doctoral (PhD) degrees, assessing verbal reasoning, quantitative reasoning, and critical thinking.',
      cards: [
        {
          icon: 'Users',
          title: 'Who Should Take It?',
          description:
            'Graduates and working professionals in Engineering, Sciences, Business, and Humanities aiming for premier global universities.',
        },
        {
          icon: 'Calendar',
          title: 'Test Format',
          description:
            'Section-level adaptive computer test: 1 Analytical Writing essay, 2 Verbal sections (27 Qs), and 2 Quantitative sections (27 Qs).',
        },
        {
          icon: 'Clock',
          title: 'Duration & Validity',
          description:
            'Completed in 1 hour 58 minutes. Quantitative (130–170), Verbal (130–170), Writing (0–6). Scores remain valid for 5 years.',
        },
      ],
    },
    versions: {
      eyebrow: 'TARGETED COACHING',
      title: 'GRE Pathways',
      items: [
        {
          title: 'GRE for MS & STEM Fields',
          subtitle: 'Graduate Engineering, Tech & Science Degrees',
          description:
            'Crucial for securing admission and research/teaching assistantships in competitive MS programs in the US, Germany, and Canada.',
          bullets: [
            'Heavy emphasis on 165+ Quantitative score strategy',
            'Strong Analytical Writing profile for scholarship evaluation',
          ],
          ctaLabel: 'Enquire for STEM GRE',
        },
        {
          title: 'GRE for Business & Law (MBA / JD)',
          subtitle: 'Top Business & Law Schools Worldwide',
          description:
            'Accepted interchangeably with the GMAT by over 1,300 business schools worldwide, including Stanford, Harvard, and Wharton.',
          bullets: [
            'Balanced Quant & Verbal scoring strategy for MBA cohorts',
            'Flexible application across both dual-degree and business courses',
          ],
          ctaLabel: 'Enquire for MBA GRE',
        },
      ],
    },
    modules: [
      {
        title: 'Quantitative Reasoning',
        icon: 'Calculator',
        duration: '2 Sections • 27 Questions • 47 Mins',
        focus: 'Arithmetic, Algebra, Geometry, and Data Analysis tested through Problem Solving, Quantitative Comparison, and Numeric Entry.',
        bullets: [
          'High-yield Quantitative Comparison shortcut techniques',
          'Data interpretation graphs, statistics, and probability',
          'Eliminating trap answers and avoiding arithmetic time sinks',
        ],
      },
      {
        title: 'Verbal Reasoning',
        icon: 'BookOpen',
        duration: '2 Sections • 27 Questions • 41 Mins',
        focus: 'Reading Comprehension, Text Completion, and Sentence Equivalence measuring subtle vocabulary in context and argument analysis.',
        bullets: [
          'Root-word and contextual vocabulary building (1,000+ words)',
          'Text completion: identifying tone shifts and semantic clues',
          'Dense academic Reading Comprehension argument mapping',
        ],
      },
      {
        title: 'Analytical Writing',
        icon: 'Edit3',
        duration: '1 Task • 30 Minutes',
        focus: 'Analyze an Issue task evaluating your ability to develop a compelling argument with relevant examples and reasoned logic.',
        bullets: [
          'Essay templates for thesis generation and counterarguments',
          'Structured paragraph transitions and persuasive rhetoric',
          'Grammar precision, vocabulary maturity, and proofreading',
        ],
      },
    ],
    benefits: [
      'Official computer-adaptive timed mock tests',
      'Curated high-frequency GRE vocabulary lists & flashcard apps',
      'Proven Quantitative shortcut formulas and logic techniques',
      'Comprehensive error-log review identifying lost marks',
      'Analytical Writing evaluations with detailed scoring rubrics',
      'Customised study timeline tailored to your target universities',
    ],
    teachingSteps: [
      {
        step: '01',
        title: 'Diagnostic Evaluation',
        description: 'Pinpoint your baseline Quant and Verbal scores and identify key knowledge gaps.',
      },
      {
        step: '02',
        title: 'Foundation & Concepts',
        description: 'Rebuild core mathematical concepts and master high-frequency academic vocabulary.',
      },
      {
        step: '03',
        title: 'Advanced Question Drills',
        description: 'Tackle high-difficulty questions with shortcut techniques and logic frameworks.',
      },
      {
        step: '04',
        title: 'Adaptive Mock Testing',
        description: 'Practice on realistic section-adaptive tests to master pacing and endurance.',
      },
      {
        step: '05',
        title: 'Target 320+ Strategy',
        description: 'Fine-tune section timing, error avoidance, and question skipping strategies.',
      },
    ],
    reasons: [
      {
        icon: 'Award',
        title: 'Expert Quant & Verbal Faculty',
        description: 'Specialists dedicated to breaking down complex mathematics and nuanced vocabulary.',
      },
      {
        icon: 'Target',
        title: 'Diagnostic-First Approach',
        description: 'We don’t waste your time reteaching concepts you already know; we teach to your gaps.',
      },
      {
        icon: 'Laptop',
        title: 'Adaptive Testing Engine',
        description: 'Mock tests replicating the exact difficulty progression of the official GRE.',
      },
      {
        icon: 'Layers',
        title: 'Proven Track Record',
        description: 'Consistent track record of helping students achieve 320+ scores for top MS programs.',
      },
    ],
    faqs: [
      {
        id: 1,
        question: 'What is the format of the new shorter GRE General Test?',
        answer:
          'Launched in September 2023, the shorter GRE takes under 2 hours (1 hour 58 minutes). It features 1 Analytical Writing essay, two 12-question and 15-question Verbal sections (27 total), and two 12-question and 15-question Quantitative sections (27 total).',
        icon: '💬',
      },
      {
        id: 2,
        question: 'What is a good GRE score for top MS programmes?',
        answer:
          'For top-tier US and Canadian engineering/MS programs, universities typically look for a Quantitative score of 165+ and an overall score of 320+. Highly competitive programs (like Stanford, MIT, Carnegie Mellon) often see Quant scores of 168–170.',
      },
      {
        id: 3,
        question: 'How does section-level adaptivity work on the GRE?',
        answer:
          'The first Quantitative and Verbal sections have a balanced mix of difficulty. How well you perform in the first section determines whether your second section is Easy, Medium, or Hard. Scoring a Hard second section opens the door to top-bracket scaled scores.',
      },
      {
        id: 4,
        question: 'Can I use GRE scores to apply for MBA programmes?',
        answer:
          'Yes, over 1,300 business schools worldwide (including Harvard Business School, Stanford GSB, INSEAD, and London Business School) accept GRE scores interchangeably with the GMAT for MBA and Master’s in Management admissions.',
        icon: '💡',
      },
      {
        id: 5,
        question: 'How does Shine Consultant prepare students for the GRE?',
        answer:
          'We provide thorough concept teaching, shortcut techniques, customized vocabulary learning systems, error-log analysis, and multiple computer-adaptive mock tests with detailed post-test mentoring.',
      },
    ],
    finalCta: {
      headline: 'Ready to Achieve Your Target GRE Score?',
      description:
        'Join Shine Consultant’s GRE coaching programme and take a confident step towards your dream graduate school abroad.',
    },
  },

  gmat: {
    heroContent: {
      eyebrow: 'GMAT FOCUS EDITION — SHINE CONSULTANT',
      headline: 'GMAT Focus Edition — Premier Coaching for Elite Global MBA Programmes.',
      supportingLine:
        'Master the streamlined GMAT Focus Edition with precision data insights, critical reasoning, and high-yield quantitative problem-solving.',
      primaryCtaLabel: 'Book Free Consultation',
      primaryCtaHref: '/book-consultation',
      secondaryCtaLabel: 'Explore Syllabus',
      secondaryCtaHref: '#about-gmat',
    },
    heroStats: [
      {
        value: '3 Sections',
        label: 'Quant, Verbal & Data Insights',
        srLabel: 'Three equal 45-minute sections',
      },
      {
        value: '2 hr 15 min',
        label: 'streamlined test duration',
        srLabel: 'Completed in two hours and 15 minutes',
      },
      {
        value: '205–805',
        label: 'new Focus Edition score scale',
        srLabel: 'Scored on the Focus scale from 205 to 805',
        featureLabel: 'Score Scale',
      },
    ],
    benefitIndicators: [
      {
        icon: 'GraduationCap',
        title: 'MBA Mentors',
        subtitle: 'B-school admission specialists',
      },
      {
        icon: 'Calculator',
        title: 'Data Insights Mastery',
        subtitle: 'Multi-source & graphical analysis',
      },
      {
        icon: 'TrendingUp',
        title: '685+ Score Target',
        subtitle: 'Top 5% percentile strategy',
      },
      {
        icon: 'Laptop',
        title: 'Question-Adaptive Mocks',
        subtitle: 'Official algorithm simulations',
      },
    ],
    about: {
      badgeTitle: 'GMAT Focus',
      badgeSubtitle: 'Graduate Management Admission Test',
      overviewText:
        'The GMAT Focus Edition is the premier assessment designed exclusively for graduate business schools, measuring real-world critical thinking, problem-solving, and data analytics skills relevant in business leadership.',
      cards: [
        {
          icon: 'Users',
          title: 'Who Should Take It?',
          description:
            'Ambitious professionals and graduates applying to elite MBA, Executive MBA, Master’s in Finance (MFin), and MiM programmes.',
        },
        {
          icon: 'Calendar',
          title: 'Test Format',
          description:
            'Question-adaptive computer test consisting of 3 equal sections of 45 minutes: Quantitative (21 Qs), Verbal (23 Qs), and Data Insights (20 Qs).',
        },
        {
          icon: 'Clock',
          title: 'Scoring & Flexibility',
          description:
            'Total score from 205 to 805. You choose your section order, with the ability to bookmark and edit up to 3 answers per section.',
        },
      ],
    },
    versions: {
      eyebrow: 'TARGETED COACHING',
      title: 'Testing Options',
      items: [
        {
          title: 'GMAT Focus (Test Center)',
          subtitle: 'Pearson VUE Testing Center',
          description:
            'Administered on a dedicated computer at authorised Pearson VUE test centers with standard scratchpad booklet and noise-cancelling headphones.',
          bullets: [
            'Physical erasable whiteboard booklet provided',
            'Optional 10-minute break between any two sections',
          ],
          ctaLabel: 'Enquire for Center GMAT',
        },
        {
          title: 'GMAT Focus (Online)',
          subtitle: 'Secure Online At-Home Exam',
          description:
            'Taken on your home computer with live proctoring. Features identical section length, content, and the same score scale.',
          bullets: [
            'Physical erasable whiteboard or online digital whiteboard',
            'Convenient scheduling available around the clock',
          ],
          ctaLabel: 'Enquire for Online GMAT',
        },
      ],
    },
    modules: [
      {
        title: 'Quantitative Reasoning',
        icon: 'Calculator',
        duration: '21 Questions • 45 Minutes',
        focus: 'Focuses entirely on Problem Solving through foundational arithmetic and algebraic logic (pure logic, no geometry questions).',
        bullets: [
          'Algebraic formulation, ratios, rates, and number properties',
          'Word problem modeling and strategic value substitution',
          'Eliminating calculation heavy traps without an on-screen calculator',
        ],
      },
      {
        title: 'Verbal Reasoning',
        icon: 'BookOpen',
        duration: '23 Questions • 45 Minutes',
        focus: 'Comprises Critical Reasoning and Reading Comprehension questions (Sentence Correction has been completely removed).',
        bullets: [
          'Critical Reasoning: argument assumptions, strengthen/weaken, flaw',
          'Reading Comprehension: main idea, inference, and tone analysis',
          'Deconstructing complex business and sociological texts rapidly',
        ],
      },
      {
        title: 'Data Insights',
        icon: 'TrendingUp',
        duration: '20 Questions • 45 Minutes',
        focus: 'Evaluates your ability to analyze multi-source data, spreadsheets, graphics, and data sufficiency with an on-screen calculator.',
        bullets: [
          'Data Sufficiency: determining if data is sufficient to answer',
          'Multi-Source Reasoning: synthesizing tabs of reports and charts',
          'Table Analysis & Two-Part Analysis decision modeling',
        ],
      },
    ],
    benefits: [
      'Official question-adaptive timed mock tests',
      'Data Insights intensive modules with calculator shortcuts',
      'Advanced Quantitative logic training (no memorisation)',
      'Critical Reasoning argument deconstruction framework',
      'Bookmark and answer review strategy drills (review up to 3 answers)',
      'Personalised target score roadmap for top global B-schools',
    ],
    teachingSteps: [
      {
        step: '01',
        title: 'Diagnostic Test',
        description: 'Assess your performance across Quant, Verbal, and Data Insights under exam conditions.',
      },
      {
        step: '02',
        title: 'Core Logic Foundation',
        description: 'Build mathematical problem-solving logic and critical reasoning argument mapping.',
      },
      {
        step: '03',
        title: 'Data Insights Mastery',
        description: 'Develop fluency in interpreting complex multi-tab business datasets and graphs.',
      },
      {
        step: '04',
        title: 'Adaptive Mock Testing',
        description: 'Simulate the official question-level adaptivity with strict time management.',
      },
      {
        step: '05',
        title: 'Section Order & Strategy',
        description: 'Optimize your section sequence and bookmark editing tactics for maximum score.',
      },
    ],
    reasons: [
      {
        icon: 'Award',
        title: 'MBA Admissions Focus',
        description: 'Guidance that connects your target GMAT score with top international MBA admissions.',
      },
      {
        icon: 'Calculator',
        title: 'Data Insights Specialists',
        description: 'Dedicated coaching on the newest, most challenging section of the Focus Edition.',
      },
      {
        icon: 'Target',
        title: 'Adaptive Strategy Mastery',
        description: 'Train to handle question-level adaptivity and optimize time per question.',
      },
      {
        icon: 'Layers',
        title: 'Error Log Discipline',
        description: 'Detailed analysis of why you picked a wrong answer and how to spot test traps.',
      },
    ],
    faqs: [
      {
        id: 1,
        question: 'What is the GMAT Focus Edition?',
        answer:
          'The GMAT Focus Edition is the updated, streamlined version of the GMAT. It is 2 hours and 15 minutes long, consisting of 3 sections: Quantitative Reasoning, Verbal Reasoning, and Data Insights. Sentence Correction and the Analytical Writing Assessment have been removed.',
        icon: '💬',
      },
      {
        id: 2,
        question: 'What is considered a good score on the GMAT Focus Edition?',
        answer:
          'Scores on the Focus Edition range from 205 to 805 (all ending in 5). A score of 645+ is roughly the 86th percentile, and 685+ is the 95th percentile, which is highly competitive for top global business schools like INSEAD, LBS, Wharton, and Harvard.',
      },
      {
        id: 3,
        question: 'Can I choose my section order on the GMAT Focus Edition?',
        answer:
          'Yes, you can take the three sections in any order you prefer. You can also take one optional 10-minute break between any two sections.',
      },
      {
        id: 4,
        question: 'Can I change my answers during the test?',
        answer:
          'Yes! The GMAT Focus Edition introduces Question Review & Edit. You can bookmark as many questions as you like and change up to three answers per section before your section time expires.',
        icon: '💡',
      },
      {
        id: 5,
        question: 'How does Shine Consultant coach candidates for GMAT Focus?',
        answer:
          'We provide diagnostic evaluation, focused instruction in math logic and Critical Reasoning, specialized training for Data Insights, adaptive mock test simulations, and individualized pacing reviews.',
      },
    ],
    finalCta: {
      headline: 'Ready to Achieve Your Target GMAT Score?',
      description:
        'Join Shine Consultant’s GMAT Focus preparation programme and prepare for the world’s top business schools with confidence.',
    },
  },
};

