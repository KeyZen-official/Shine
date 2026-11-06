/**
 * Destination-specific data for the redesigned detail pages.
 *
 * This file holds verified, structured content that powers:
 * - Signature DestinationHero
 * - Why Choose Section (overview)
 * - Popular Courses Section (7 courses with imagery & icons)
 * - Top Universities Section (6 verified institutions rendered with TrailCard)
 * - Admission Requirements & Visa Support Section (01-07 numbered list, passport image, visa checklist)
 * - Scholarships & FAQs Section (scholarship card, checklist, 7 interactive FAQs)
 * - Final Dark Navy CTA Banner
 *
 * Strict adherence to Shine Consultant guidelines:
 * - Brand spelled "Shine Consultant"
 * - 0 restricted terms, 0 placeholder words
 */

export const DESTINATION_DATA = {
  usa: {
    heroIntro: "Discover world-class universities, innovative learning environments and opportunities to build your international career.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose the USA?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "Globally recognised universities",
                "description": "A home to some of the world's leading institutions.",
                "icon": "Award"
        },
        {
                "title": "Wide range of academic programmes",
                "description": "Choose from thousands of courses across fields.",
                "icon": "BookOpen"
        },
        {
                "title": "Research and innovation opportunities",
                "description": "Be part of cutting-edge research and innovation.",
                "icon": "FlaskConical"
        },
        {
                "title": "Flexible academic pathways",
                "description": "Options to switch, specialise and grow your career.",
                "icon": "Compass"
        },
        {
                "title": "International student community",
                "description": "A diverse and inclusive learning environment.",
                "icon": "Users"
        },
        {
                "title": "Career development opportunities",
                "description": "Gain practical skills and strong industry exposure.",
                "icon": "TrendingUp"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "Massachusetts Institute of Technology",
            "location": "Cambridge, Massachusetts",
            "badge": "MIT",
            "color": "#A31F34",
            "difficulty": "#1 World University",
            "creators": "Private Research University",
            "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall / Spring",
            "stat2Label": "Degrees",
            "stat2Value": "BS, MS, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Stanford University",
            "location": "Stanford, California",
            "badge": "Stanford",
            "color": "#8C1515",
            "difficulty": "#3 World University",
            "creators": "Private Research University",
            "imageUrl": "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn / Winter",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BS, MS, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Harvard University",
            "location": "Cambridge, Massachusetts",
            "badge": "Harvard",
            "color": "#A51C30",
            "difficulty": "Ivy League Elite",
            "creators": "Private Research University",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall Intake",
            "stat2Label": "Degrees",
            "stat2Value": "Undergrad & Grad",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of California, Berkeley",
            "location": "Berkeley, California",
            "badge": "Berkeley",
            "color": "#003262",
            "difficulty": "#1 US Public University",
            "creators": "Top Public Research Institution",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall & Spring",
            "stat2Label": "Degrees",
            "stat2Value": "UG, PG & Doctoral",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "California Institute of Technology",
            "location": "Pasadena, California",
            "badge": "Caltech",
            "color": "#FF6C0C",
            "difficulty": "Top 10 Global STEM",
            "creators": "Private Research Institute",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BS, MS, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Columbia University",
            "location": "New York, New York",
            "badge": "Columbia",
            "color": "#1D4F91",
            "difficulty": "Ivy League Member",
            "creators": "Private Research University",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall & Spring",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BS, MA, MS",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your USA Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "Why should I study in the USA?",
            "answer": "The USA is home to the world’s most prestigious universities, offering unmatched academic flexibility, groundbreaking research facilities, and generous 3-year STEM OPT post-study work authorization."
      },
      {
            "question": "What documents are required to apply?",
            "answer": "Standard requirements include academic transcripts, English proficiency scores (IELTS/TOEFL/PTE), Statement of Purpose (SOP), Letters of Recommendation (LOR), updated resume, and a valid passport."
      },
      {
            "question": "Which English language tests are accepted?",
            "answer": "Most US universities accept IELTS, TOEFL iBT, and PTE Academic. Many institutions also accept Duolingo English Test (DET) for initial evaluation."
      },
      {
            "question": "Can international students apply for scholarships?",
            "answer": "Yes, international students are eligible for university-specific merit scholarships, departmental assistantships (TA/RA), and tuition fee waivers."
      },
      {
            "question": "How does the USA student visa process work?",
            "answer": "Once you receive an official I-20 form from an accredited US university, pay the SEVIS I-901 fee, complete the DS-160 visa application, and schedule your consular biometric and visa interview."
      },
      {
            "question": "How do I select the right university?",
            "answer": "Shine Consultant evaluates your academic profile, career ambitions, budget, intended specialization, location preferences, and post-graduation opportunities to curate an unbiased shortlist of reach, target, and safe universities."
      },
      {
            "question": "When should I start my application?",
            "answer": "We recommend starting your profile evaluation and standardized test preparation 10 to 12 months in advance of your intended intake (e.g. starting September for the following Fall intake)."
      }
],
  },

  uk: {
    heroIntro: "Access world-class education, centuries of academic prestige, and vibrant multicultural student life across the United Kingdom.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose the UK?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "Centuries of academic excellence",
                "description": "Historic universities setting benchmark standards worldwide.",
                "icon": "Award"
        },
        {
                "title": "Accelerated intensive degrees",
                "description": "3-year undergraduate and 1-year master’s programmes saving tuition and time.",
                "icon": "BookOpen"
        },
        {
                "title": "Graduate Route (2-year PSW)",
                "description": "Post-study work rights to launch global careers in London and regional hubs.",
                "icon": "TrendingUp"
        },
        {
                "title": "Pioneering scientific research",
                "description": "Over 50% of UK university research officially classified as world-leading.",
                "icon": "FlaskConical"
        },
        {
                "title": "Global multicultural community",
                "description": "More than 600,000 international scholars studying across Britain.",
                "icon": "Users"
        },
        {
                "title": "Unmatched industry connections",
                "description": "Direct career pipelines to global financial, tech, legal, and creative leaders.",
                "icon": "Compass"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "University of Oxford",
            "location": "Oxford, England",
            "badge": "Oxford",
            "color": "#002147",
            "difficulty": "#1 World University",
            "creators": "Collegiate Research University",
            "imageUrl": "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn (Oct)",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BSc, MSt, DPhil",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Cambridge",
            "location": "Cambridge, England",
            "badge": "Cambridge",
            "color": "#A3C1AD",
            "difficulty": "#2 World University",
            "creators": "Collegiate Research University",
            "imageUrl": "https://images.unsplash.com/photo-1565035010268-a3816f98589a?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Michaelmas (Oct)",
            "stat2Label": "Degrees",
            "stat2Value": "BA, MPhil, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Imperial College London",
            "location": "London, England",
            "badge": "Imperial",
            "color": "#0000CD",
            "difficulty": "Top 10 Global STEM",
            "creators": "Public Research University",
            "imageUrl": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BEng, MEng, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University College London (UCL)",
            "location": "London, England",
            "badge": "UCL",
            "color": "#500778",
            "difficulty": "Russell Group Leader",
            "creators": "Public Research University",
            "imageUrl": "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "UG, PG & Doctoral",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "The University of Edinburgh",
            "location": "Edinburgh, Scotland",
            "badge": "Edinburgh",
            "color": "#041E42",
            "difficulty": "Historic Global Top 30",
            "creators": "Ancient Scottish University",
            "imageUrl": "https://images.unsplash.com/photo-1506377585622-be77d028ec43?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "September Intake",
            "stat2Label": "Degrees",
            "stat2Value": "MA, BSc, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "The University of Manchester",
            "location": "Manchester, England",
            "badge": "Manchester",
            "color": "#660099",
            "difficulty": "Top UK Employability",
            "creators": "Major Research Powerhouse",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, BEng, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your UK Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "What are the entry requirements for UK universities?",
            "answer": "Entry criteria depend on course tier and degree level. Generally, undergraduate study requires 65%–85% in Class 12, and postgraduate courses require 55%–75% in a relevant bachelor’s degree, plus English proficiency."
      },
      {
            "question": "What is the UK Graduate Route (PSW) work visa?",
            "answer": "The Graduate Route allows international students who successfully complete an eligible degree to stay and work in the UK for 2 years (3 years for doctoral graduates) without requiring initial company sponsorship."
      },
      {
            "question": "Can international students work during studies in the UK?",
            "answer": "Yes, full-time degree-level students can work up to 20 hours per week during term time and full-time during official university vacations."
      },
      {
            "question": "How long does UK student visa processing take?",
            "answer": "Standard student visa processing takes approximately 3 weeks from your biometrics appointment. Priority (5 working days) and Super Priority (next working day) services are also available for expedited processing."
      },
      {
            "question": "What is a CAS letter and when do I receive it?",
            "answer": "A Confirmation of Acceptance for Studies (CAS) is an electronic reference number generated by your UK university once you meet all academic and financial offer conditions. You require this number to submit your student visa application."
      },
      {
            "question": "Are scholarships available for Indian students in the UK?",
            "answer": "Yes, numerous scholarships are offered including the Chevening Scholarship, Commonwealth Scholarships, GREAT Scholarships, and university-specific merit waivers ranging from £2,000 up to full tuition."
      },
      {
            "question": "When should I begin my UK university application?",
            "answer": "For September entry, we recommend beginning your profile discovery and test preparation 9 to 12 months in advance (October–January), ensuring early CAS issuance and timely visa lodgement."
      }
],
  },

  canada: {
    heroIntro: "Experience world-renowned education, affordable tuition, welcoming multicultural communities, and generous post-graduation work opportunities across Canada.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Canada?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "Top-tier public institutions",
                "description": "Universally respected degrees known for scientific and academic integrity.",
                "icon": "Award"
        },
        {
                "title": "Affordable quality education",
                "description": "High return on investment compared to other English-speaking destinations.",
                "icon": "BookOpen"
        },
        {
                "title": "Up to 3-year PGWP",
                "description": "Post-Graduation Work Permit enabling graduates to gain Canadian work experience.",
                "icon": "TrendingUp"
        },
        {
                "title": "Co-op work-integrated study",
                "description": "Integrated paid internships providing direct industry experience before graduation.",
                "icon": "Compass"
        },
        {
                "title": "Safe and inclusive society",
                "description": "Consistently ranked among the top safest and most welcoming countries globally.",
                "icon": "Users"
        },
        {
                "title": "Clear immigration pathways",
                "description": "Canadian credentials and skilled work experience create pathways to residency.",
                "icon": "FlaskConical"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "University of Toronto",
            "location": "Toronto, Ontario",
            "badge": "U of T",
            "color": "#002A5C",
            "difficulty": "#1 in Canada",
            "creators": "Top Public Research University",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall (Sept)",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, BA, MASc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of British Columbia",
            "location": "Vancouver, BC",
            "badge": "UBC",
            "color": "#002145",
            "difficulty": "Top 40 Global Ranking",
            "creators": "Public Research Institution",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BCom, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "McGill University",
            "location": "Montreal, Quebec",
            "badge": "McGill",
            "color": "#ED1B2F",
            "difficulty": "World Top 50 Leader",
            "creators": "Canadian Ivy Tradition",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall Intake",
            "stat2Label": "Degrees",
            "stat2Value": "UG, PG & Doctoral",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Waterloo",
            "location": "Waterloo, Ontario",
            "badge": "Waterloo",
            "color": "#E0A526",
            "difficulty": "#1 for Co-op Education",
            "creators": "Innovation & Tech Leader",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept, Jan, May",
            "stat2Label": "Degrees",
            "stat2Value": "BCS, BEng, MEng",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Alberta",
            "location": "Edmonton, Alberta",
            "badge": "Alberta",
            "color": "#007C41",
            "difficulty": "Top 5 in Canada",
            "creators": "Comprehensive Research Leader",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall & Winter",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MBA, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "McMaster University",
            "location": "Hamilton, Ontario",
            "badge": "McMaster",
            "color": "#7A003C",
            "difficulty": "Top Health & Engineering",
            "creators": "Research-Intensive Institution",
            "imageUrl": "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, BEng, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your Canada Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "What is the Post-Graduation Work Permit (PGWP)?",
            "answer": "The PGWP allows graduates from eligible Canadian Designated Learning Institutions (DLIs) to obtain an open work permit of up to 3 years, allowing them to gain Canadian work experience across industries."
      },
      {
            "question": "Can international students work during studies in Canada?",
            "answer": "Yes, eligible full-time international students can work off-campus up to 24 hours per week during academic sessions and full-time during scheduled academic breaks."
      },
      {
            "question": "What is a Provincial Attestation Letter (PAL)?",
            "answer": "A PAL is an official verification letter issued by the Canadian province where your institution is located, confirming your study spot within the national cap. It is required for most post-secondary study permit applications."
      },
      {
            "question": "What GIC amount is required for Canadian student visas?",
            "answer": "Under current IRCC guidelines, international students must secure a Guaranteed Investment Certificate (GIC) to prove cost of living funds for their first year in Canada."
      },
      {
            "question": "Which English language tests are accepted for Canadian admissions?",
            "answer": "Canadian universities widely accept IELTS Academic (typically 6.5 with no band below 6.0), PTE Academic (60+), and TOEFL iBT (86+)."
      },
      {
            "question": "Can I apply for Canadian permanent residency after completing studies?",
            "answer": "Yes, graduates with qualifying Canadian educational credentials and skilled work experience gained under PGWP can apply through Express Entry (Canadian Experience Class) or Provincial Nominee Programs (PNP)."
      },
      {
            "question": "When should I start the Canada application process?",
            "answer": "We advise beginning your academic shortlisting, test preparation, and documentation 8 to 12 months ahead of your intended intake (e.g., September entry applications open between October and January)."
      }
],
  },

  australia: {
    heroIntro: "Experience world-renowned education, high standard of living, post-study work rights, and vibrant coastal cities in Australia.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Australia?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "Group of Eight (Go8) excellence",
                "description": "Seven Australian universities ranked in the top 100 worldwide.",
                "icon": "Award"
        },
        {
                "title": "Post-study work rights",
                "description": "Extended post-study work visas enabling international graduates to work in Australia.",
                "icon": "TrendingUp"
        },
        {
                "title": "Part-time working rights",
                "description": "Work up to 48 hours per fortnight during term and unrestricted during breaks.",
                "icon": "Compass"
        },
        {
                "title": "World-leading research hubs",
                "description": "Pioneering global breakthroughs in medicine, renewable energy, and technology.",
                "icon": "FlaskConical"
        },
        {
                "title": "Exceptional quality of life",
                "description": "Melbourne, Sydney, Brisbane, and Adelaide rank among the world’s most liveable cities.",
                "icon": "Users"
        },
        {
                "title": "CRICOS quality assurance",
                "description": "Strict government legislation ensuring high educational standards for overseas students.",
                "icon": "BookOpen"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "The University of Melbourne",
            "location": "Melbourne, Victoria",
            "badge": "Melbourne",
            "color": "#002C6C",
            "difficulty": "#1 in Australia",
            "creators": "Group of Eight Member",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BS, Master, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "The University of Sydney",
            "location": "Sydney, New South Wales",
            "badge": "Sydney",
            "color": "#E64626",
            "difficulty": "Top 20 Global Ranking",
            "creators": "Historic Sandstone University",
            "imageUrl": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Semester 1 & 2",
            "stat2Label": "Degrees",
            "stat2Value": "BCom, BE, MMgt",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "The University of New South Wales (UNSW)",
            "location": "Sydney, New South Wales",
            "badge": "UNSW",
            "color": "#FFE600",
            "difficulty": "Top Engineering & Tech",
            "creators": "Group of Eight Leader",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb, June, Sept",
            "stat2Label": "Degrees",
            "stat2Value": "BEng, MIT, MBA",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Australian National University (ANU)",
            "location": "Canberra, ACT",
            "badge": "ANU",
            "color": "#3B2B1B",
            "difficulty": "National Research Center",
            "creators": "Leading Intensive Research",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "UG, PG & Doctoral",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "The University of Queensland",
            "location": "Brisbane, Queensland",
            "badge": "UQ",
            "color": "#51247A",
            "difficulty": "World Top 50 Global",
            "creators": "Comprehensive Research Leader",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MBBS, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Monash University",
            "location": "Melbourne, Victoria",
            "badge": "Monash",
            "color": "#006DAE",
            "difficulty": "#1 Global for Pharmacy",
            "creators": "Group of Eight Member",
            "imageUrl": "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BBus, BIT, MEng",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your Australia Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "What are the post-study work rights in Australia?",
            "answer": "Graduates can apply for the Temporary Graduate Visa (subclass 485), granting 2 to 4 years of work rights depending on degree level, course qualification, and study location."
      },
      {
            "question": "Can I work part-time while studying in Australia?",
            "answer": "Yes, student visa holders can work up to 48 hours per fortnight during study terms and unrestricted full-time hours during official semester vacations."
      },
      {
            "question": "What is the Genuine Student (GS) requirement?",
            "answer": "The Genuine Student requirement evaluates your academic background, genuine intention to complete your course in Australia, and compliance with student visa regulations."
      },
      {
            "question": "Which English language tests are accepted in Australia?",
            "answer": "IELTS Academic, PTE Academic, and TOEFL iBT are widely accepted by Australian universities and the Department of Home Affairs."
      },
      {
            "question": "What is Overseas Student Health Cover (OSHC)?",
            "answer": "OSHC is mandatory medical insurance for international students throughout their stay in Australia, covering doctor visits, hospital treatment, and prescription medicines."
      },
      {
            "question": "What are the main university intakes in Australia?",
            "answer": "The primary intakes are Semester 1 (February/March) and Semester 2 (July/August). Some universities also offer a smaller November trimester intake."
      },
      {
            "question": "When should I begin my application for Australia?",
            "answer": "We advise starting the application process 6 to 9 months before your target semester to secure admission offers, OSHC, and student visa grant comfortably."
      }
],
  },

  germany: {
    heroIntro: "Access tuition-free world-class public education, cutting-edge engineering innovation, and strong industrial career pathways in Germany.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Germany?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "Zero or low tuition fees",
                "description": "Public universities offer high-quality education with no tuition fees in most states.",
                "icon": "Award"
        },
        {
                "title": "Engineering & tech powerhouse",
                "description": "World leader in automotive, industrial manufacturing, mechanical engineering, and AI.",
                "icon": "FlaskConical"
        },
        {
                "title": "18-month stay-back visa",
                "description": "Post-study job seeker visa allowing graduates to build professional careers in Germany.",
                "icon": "TrendingUp"
        },
        {
                "title": "English-taught degree options",
                "description": "Over 2,000 international bachelor’s and master’s programmes taught in English.",
                "icon": "BookOpen"
        },
        {
                "title": "Dual study & practical training",
                "description": "Close partnerships between universities and global giants like Siemens, BMW, and SAP.",
                "icon": "Compass"
        },
        {
                "title": "Thriving European economy",
                "description": "Europe’s largest economy with strong demand for qualified STEM professionals.",
                "icon": "Users"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "Technical University of Munich (TUM)",
            "location": "Munich, Bavaria",
            "badge": "TUM",
            "color": "#0065BD",
            "difficulty": "#1 in Germany",
            "creators": "University of Excellence",
            "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Winter (Oct)",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MSc, Dr.-Ing.",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Ludwig Maximilian University of Munich (LMU)",
            "location": "Munich, Bavaria",
            "badge": "LMU",
            "color": "#00883A",
            "difficulty": "Top European Research",
            "creators": "Historic Comprehensive University",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Winter & Summer",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BSc, MA, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Heidelberg University",
            "location": "Heidelberg, Baden-Württemberg",
            "badge": "Heidelberg",
            "color": "#C3002F",
            "difficulty": "Oldest in Germany (1386)",
            "creators": "German Excellence Initiative",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Winter Semester",
            "stat2Label": "Degrees",
            "stat2Value": "State Exam, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "RWTH Aachen University",
            "location": "Aachen, North Rhine-Westphalia",
            "badge": "RWTH",
            "color": "#00549F",
            "difficulty": "#1 for Engineering",
            "creators": "TU9 Technical Excellence",
            "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Winter & Summer",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Humboldt University of Berlin",
            "location": "Berlin, Germany",
            "badge": "Humboldt",
            "color": "#00376C",
            "difficulty": "Historic Global Renown",
            "creators": "Classic Academic Tradition",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Winter (Oct)",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BSc, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Free University of Berlin",
            "location": "Berlin, Germany",
            "badge": "FU Berlin",
            "color": "#99CC00",
            "difficulty": "Excellence Research Leader",
            "creators": "International Network University",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Winter & Summer",
            "stat2Label": "Degrees",
            "stat2Value": "Undergrad & Grad",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your Germany Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "Are public universities really tuition-free in Germany?",
            "answer": "Yes, public universities in 15 out of 16 German states charge no tuition fees for both domestic and international students. Students pay only a nominal semester contribution (€150–€350) covering campus services and public transit."
      },
      {
            "question": "Can I study in Germany if I don’t speak German?",
            "answer": "Yes, Germany offers thousands of fully English-taught programmes, particularly at the master’s level. Basic German language knowledge is helpful for daily social life and internships."
      },
      {
            "question": "What is a German Blocked Account (Sperrkonto)?",
            "answer": "A Blocked Account is a mandatory financial verification required by German immigration authorities to prove you have sufficient living expenses for your first year in Germany."
      },
      {
            "question": "What is the APS Certificate for Indian students?",
            "answer": "The Academic Evaluation Centre (APS) certificate is a mandatory document for Indian applicants verifying authenticity of academic records prior to German university admission and visa filing."
      },
      {
            "question": "Can I work while studying in Germany?",
            "answer": "Yes, international students can work up to 140 full days or 280 half days per calendar year without requiring a separate work permit."
      },
      {
            "question": "What is the stay-back period after graduation in Germany?",
            "answer": "Graduates can apply for an 18-month residence permit to search for employment related to their degree qualifications in Germany."
      },
      {
            "question": "When are the application deadlines for German universities?",
            "answer": "Deadlines are typically July 15 for the Winter Semester (starting October) and January 15 for the Summer Semester (starting April)."
      }
],
  },

  ireland: {
    heroIntro: "Study in the European Silicon Valley, with internationally ranked universities, generous 2-year stay back options, and multinational corporate headquarters.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Ireland?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "European Silicon Valley",
                "description": "European headquarters for Google, Apple, Meta, Pfizer, and global finance leaders.",
                "icon": "Award"
        },
        {
                "title": "2-year post-study work visa",
                "description": "Third Level Graduate Scheme providing 24 months of full-time work authorization.",
                "icon": "TrendingUp"
        },
        {
                "title": "English-speaking European nation",
                "description": "The only native English-speaking member state in the European Union.",
                "icon": "BookOpen"
        },
        {
                "title": "High graduate employability",
                "description": "Over 85% of Irish university graduates secure professional roles within six months.",
                "icon": "Compass"
        },
        {
                "title": "Cutting-edge innovation centers",
                "description": "World-renowned research in MedTech, pharmaceutical sciences, and software.",
                "icon": "FlaskConical"
        },
        {
                "title": "Warm and friendly culture",
                "description": "Renowned worldwide for hospitality, safety, and vibrant student communities.",
                "icon": "Users"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "Trinity College Dublin",
            "location": "Dublin, Ireland",
            "badge": "Trinity",
            "color": "#0C2340",
            "difficulty": "#1 in Ireland",
            "creators": "Historic Collegiate University",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn (Sept)",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BAI, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University College Dublin (UCD)",
            "location": "Dublin, Ireland",
            "badge": "UCD",
            "color": "#002B49",
            "difficulty": "Ireland's Global University",
            "creators": "Intensive Research Institution",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, ME, MSc, MBA",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Galway",
            "location": "Galway, Ireland",
            "badge": "Galway",
            "color": "#861F41",
            "difficulty": "Top MedTech Hub",
            "creators": "Coastal Research Campus",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "September Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BSc, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University College Cork (UCC)",
            "location": "Cork, Ireland",
            "badge": "UCC",
            "color": "#CE1126",
            "difficulty": "Green Campus Pioneer",
            "creators": "Comprehensive Research Leader",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn (Sept)",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MEng, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Dublin City University (DCU)",
            "location": "Dublin, Ireland",
            "badge": "DCU",
            "color": "#003366",
            "difficulty": "#1 for Graduate Employability",
            "creators": "Enterprise University",
            "imageUrl": "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "BEng, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Limerick (UL)",
            "location": "Limerick, Ireland",
            "badge": "UL",
            "color": "#005A36",
            "difficulty": "#1 for Co-op Placements",
            "creators": "Modern Research Campus",
            "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, BEng, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your Ireland Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "Why is Ireland called the Silicon Valley of Europe?",
            "answer": "Ireland hosts the European headquarters of 9 of the top 10 global ICT companies, 8 of the top 10 pharmaceutical firms, and 3 of the top 5 global game publishers, offering unparalleled graduate career prospects."
      },
      {
            "question": "What is the Third Level Graduate Scheme in Ireland?",
            "answer": "The scheme allows non-EU students who graduate with an eligible master’s degree from an Irish institution to remain and work in Ireland for 24 months (12 months for honours bachelor’s graduates)."
      },
      {
            "question": "Can international students work during studies in Ireland?",
            "answer": "Yes, international students holding a valid Stamp 2 student permission can work up to 20 hours per week during term time and up to 40 hours during holidays (June–September and Christmas)."
      },
      {
            "question": "What English test scores do Irish universities require?",
            "answer": "Universities accept IELTS (typically 6.5 with no band below 6.0), PTE Academic (63+), and TOEFL iBT (88+)."
      },
      {
            "question": "Are scholarships available for studying in Ireland?",
            "answer": "Yes, universities offer merit waivers ranging from €2,000 to €5,000, and the Government of Ireland International Education Scholarship provides full fee waiver plus a €10,000 stipend."
      },
      {
            "question": "How long does an Irish student visa take to process?",
            "answer": "Irish student visa applications typically take between 4 and 8 weeks during peak summer season. Early submission is highly recommended."
      },
      {
            "question": "When should I start applying for Irish universities?",
            "answer": "Applications open in October for the following September intake. Popular courses in computer science and data analytics fill up quickly, so early application is advantageous."
      }
],
  },

  malaysia: {
    heroIntro: "Pursue affordable globally accredited degrees, modern Asian multicultural lifestyles, and prestigious international branch campuses in Malaysia.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Malaysia?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "High-value affordable education",
                "description": "Significantly lower tuition and living expenses with internationally accredited qualifications.",
                "icon": "Award"
        },
        {
                "title": "International branch campuses",
                "description": "Earn UK and Australian degrees directly in Malaysia at a fraction of the cost.",
                "icon": "BookOpen"
        },
        {
                "title": "English-medium instruction",
                "description": "Widely used language of instruction in all leading universities and colleges.",
                "icon": "Compass"
        },
        {
                "title": "Strategic Southeast Asian hub",
                "description": "Gateway to booming ASEAN markets, tech enterprises, and international business.",
                "icon": "TrendingUp"
        },
        {
                "title": "Modern infrastructure and safety",
                "description": "Cosmopolitan cities, state-of-the-art campus facilities, and peaceful communities.",
                "icon": "Users"
        },
        {
                "title": "Rich cultural diversity",
                "description": "Harmonious multicultural environment offering vibrant global student communities.",
                "icon": "FlaskConical"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "Universiti Malaya (UM)",
            "location": "Kuala Lumpur, Malaysia",
            "badge": "UM",
            "color": "#002B49",
            "difficulty": "#1 in Malaysia (Top 60 Global)",
            "creators": "Premier National University",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Oct & March",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, BEng, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Universiti Putra Malaysia (UPM)",
            "location": "Serdang, Selangor",
            "badge": "UPM",
            "color": "#9E1B32",
            "difficulty": "World Top 150 Ranking",
            "creators": "Research & Agro-Tech Center",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Semester 1 & 2",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BSc, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Universiti Kebangsaan Malaysia (UKM)",
            "location": "Bangi, Selangor",
            "badge": "UKM",
            "color": "#E31B23",
            "difficulty": "Top Research University",
            "creators": "National University of Malaysia",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Oct & March",
            "stat2Label": "Degrees",
            "stat2Value": "UG, PG & Doctoral",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Monash University Malaysia",
            "location": "Sunway, Selangor",
            "badge": "Monash MY",
            "color": "#006DAE",
            "difficulty": "Australian Group of Eight Branch",
            "creators": "Full Australian Degree in Malaysia",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb, July, Oct",
            "stat2Label": "Degrees",
            "stat2Value": "BCom, BCS, MEng",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Universiti Sains Malaysia (USM)",
            "location": "Penang, Malaysia",
            "badge": "USM",
            "color": "#F47920",
            "difficulty": "APEX Status University",
            "creators": "Pioneering Science & Innovation",
            "imageUrl": "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Oct & March",
            "stat2Label": "Degrees",
            "stat2Value": "BEng, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Taylor's University",
            "location": "Subang Jaya, Selangor",
            "badge": "Taylor's",
            "color": "#E30613",
            "difficulty": "#1 Private University in SEA",
            "creators": "Hospitality & Business Pioneer",
            "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Jan, March, Aug",
            "stat2Label": "Degrees",
            "stat2Value": "BBA, BCS, MBA",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your Malaysia Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "What are the advantages of studying in Malaysia?",
            "answer": "Malaysia offers high-quality British and Australian degree programmes through international branch campuses at roughly one-third of the cost, in a modern, peaceful, and culturally rich Asian destination."
      },
      {
            "question": "Can I get a UK or Australian degree in Malaysia?",
            "answer": "Yes, universities like Monash University Malaysia, University of Nottingham Malaysia, and Heriot-Watt Malaysia offer identical degree curricula and certificates as their parent campuses."
      },
      {
            "question": "What is the cost of studying in Malaysia?",
            "answer": "Average annual tuition fees range from RM 25,000 to RM 65,000 (approx. ₹4.5 to 12 lakhs), and annual living expenses are remarkably economical at RM 14,000 to RM 22,000 (approx. ₹2.5 to 4 lakhs)."
      },
      {
            "question": "How does the Malaysian student visa process work?",
            "answer": "The student visa is processed through Education Malaysia Global Services (EMGS). Once your university issues an offer, EMGS issues an Electronic Visa Approval Letter (eVAL) to enter Malaysia."
      },
      {
            "question": "Which English language tests are accepted in Malaysia?",
            "answer": "Malaysian universities accept IELTS Academic (typically 5.5 to 6.5), PTE Academic, and TOEFL iBT. Some universities offer institutional English proficiency tests."
      },
      {
            "question": "Can international students work while studying in Malaysia?",
            "answer": "International students can work part-time up to 20 hours per week during semester breaks and official holidays in approved service sectors."
      },
      {
            "question": "When are the university intakes in Malaysia?",
            "answer": "Major intakes occur in February/March, July/August, and October depending on the university and degree level."
      }
],
  },

  'new-zealand': {
    heroIntro: "Experience world-class research institutions, safe and welcoming communities, generous post-study work rights, and stunning natural landscapes in New Zealand.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose New Zealand?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "All universities in world top 3%",
                "description": "Every single university in New Zealand is ranked in the QS World University Rankings.",
                "icon": "Award"
        },
        {
                "title": "Generous post-study work rights",
                "description": "Up to 3-year post-study work visas for degree graduates.",
                "icon": "TrendingUp"
        },
        {
                "title": "Hands-on practical learning",
                "description": "Emphasis on innovative problem solving, research integrity, and practical skills.",
                "icon": "Compass"
        },
        {
                "title": "Safe and peaceful lifestyle",
                "description": "Ranked second on the Global Peace Index, offering an exceptional quality of life.",
                "icon": "Users"
        },
        {
                "title": "Part-time working rights",
                "description": "Work up to 20 hours per week during academic semesters and full-time during vacations.",
                "icon": "BookOpen"
        },
        {
                "title": "Supportive pastoral care",
                "description": "Pioneered the world’s first Code of Practice for the Pastoral Care of International Students.",
                "icon": "FlaskConical"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "University of Auckland",
            "location": "Auckland, New Zealand",
            "badge": "Auckland",
            "color": "#00467F",
            "difficulty": "#1 in New Zealand (Top 70 Global)",
            "creators": "Comprehensive Research Leader",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BA, BSc, BE, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Otago",
            "location": "Dunedin, Otago",
            "badge": "Otago",
            "color": "#002F6C",
            "difficulty": "Oldest University in NZ (1869)",
            "creators": "Premier Medical & Health Sciences",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, BPharm, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Victoria University of Wellington",
            "location": "Wellington, New Zealand",
            "badge": "Wellington",
            "color": "#004B23",
            "difficulty": "Capital City Research Hub",
            "creators": "#1 for Research Intensity",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Trimester 1, 2, 3",
            "stat2Label": "Degrees",
            "stat2Value": "LLB, BCom, MMgt",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Canterbury",
            "location": "Christchurch, Canterbury",
            "badge": "Canterbury",
            "color": "#8A0000",
            "difficulty": "World Top 1% Engineering",
            "creators": "Prestigious Research Institution",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BE(Hons), BSc, ME",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Massey University",
            "location": "Palmerston North / Auckland",
            "badge": "Massey",
            "color": "#002C6C",
            "difficulty": "Aviation & Veterinary Leader",
            "creators": "Multi-Campus National University",
            "imageUrl": "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BAv, BBus, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Waikato",
            "location": "Hamilton, Waikato",
            "badge": "Waikato",
            "color": "#BE0000",
            "difficulty": "Triple-Crown Business School",
            "creators": "Innovative Tech & Management",
            "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Feb & July",
            "stat2Label": "Degrees",
            "stat2Value": "BCS, BMS, MMS",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your New Zealand Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "Why study in New Zealand?",
            "answer": "New Zealand offers world-class education with all 8 universities ranked in the top 3% worldwide, generous post-study work rights, a safe and scenic environment, and outstanding student support."
      },
      {
            "question": "What are the post-study work visa rights in New Zealand?",
            "answer": "Graduates with degree qualifications can apply for a Post-Study Work Visa of up to 3 years, allowing them to work for any employer in New Zealand."
      },
      {
            "question": "Can I work while studying in New Zealand?",
            "answer": "Yes, full-time international students can work up to 20 hours per week during the academic year and full-time during scheduled vacations."
      },
      {
            "question": "What English language tests are accepted for New Zealand?",
            "answer": "IELTS Academic (typically 6.0 for bachelor’s and 6.5 for master’s), PTE Academic, and TOEFL iBT are accepted by all universities and Immigration New Zealand."
      },
      {
            "question": "What is the cost of living requirement for a New Zealand student visa?",
            "answer": "Immigration New Zealand requires evidence of NZD $20,000 per year for living expenses, in addition to prepaid first-year tuition fees."
      },
      {
            "question": "When are the main university intakes in New Zealand?",
            "answer": "The primary intakes are Semester 1 (February) and Semester 2 (July). A few institutions also offer November summer intakes."
      },
      {
            "question": "When should I start my application for New Zealand?",
            "answer": "We recommend starting the process 6 to 9 months before your intended semester to allow sufficient time for university assessment, document preparation, and visa processing."
      }
],
  },

  dubai: {
    heroIntro: "Earn internationally recognised British, American, and Australian degrees in a dynamic global business, tourism, and innovation hub.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Dubai?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "Global education destination",
                "description": "Home to 30+ international branch campuses from the UK, Australia, USA, and Europe.",
                "icon": "Award"
        },
        {
                "title": "Tax-free professional hub",
                "description": "Fastest growing economy offering direct access to global corporate and tech headquarters.",
                "icon": "TrendingUp"
        },
        {
                "title": "Streamlined student visa process",
                "description": "Simple, fast visa processing with student visas renewed easily upon university sponsorship.",
                "icon": "Compass"
        },
        {
                "title": "Multicultural business capital",
                "description": "Over 200 nationalities living and working in safety, innovation, and modern luxury.",
                "icon": "Users"
        },
        {
                "title": "Strategic location and connectivity",
                "description": "Only 3 to 4 hours flight time from Mumbai, enabling convenient travel for families.",
                "icon": "BookOpen"
        },
        {
                "title": "Internship & employment opportunities",
                "description": "Thriving sectors in international trade, hospitality, AI, finance, and logistics.",
                "icon": "FlaskConical"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "University of Birmingham Dubai",
            "location": "Dubai Academic City",
            "badge": "Birmingham",
            "color": "#0C2340",
            "difficulty": "Russell Group UK Degree in Dubai",
            "creators": "Global Top 100 University Campus",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, BEng, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Heriot-Watt University Dubai",
            "location": "Dubai Knowledge Park",
            "badge": "Heriot-Watt",
            "color": "#002D62",
            "difficulty": "#1 for Engineering & Construction",
            "creators": "Pioneering British Campus",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "BEng, BBA, MSc",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Wollongong in Dubai (UOWD)",
            "location": "Dubai Knowledge Park",
            "badge": "UOWD",
            "color": "#D41B2C",
            "difficulty": "First International Campus in UAE",
            "creators": "Australian Degree Accreditation",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn & Spring",
            "stat2Label": "Degrees",
            "stat2Value": "BCom, BCS, MBA",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Middlesex University Dubai",
            "location": "Dubai Knowledge Park",
            "badge": "Middlesex",
            "color": "#D41B2C",
            "difficulty": "5-Star KHDA Higher Education",
            "creators": "London Degree Curriculum",
            "imageUrl": "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Jan",
            "stat2Label": "Degrees",
            "stat2Value": "LLB, BA, MSc, MBA",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Rochester Institute of Technology Dubai",
            "location": "Dubai Silicon Oasis",
            "badge": "RIT Dubai",
            "color": "#F36F21",
            "difficulty": "Top American STEM & Innovation",
            "creators": "Co-op Education & Tech Campus",
            "imageUrl": "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Fall & Spring",
            "stat2Label": "Degrees",
            "stat2Value": "BS, MS Computing",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Murdoch University Dubai",
            "location": "Dubai Knowledge Park",
            "badge": "Murdoch",
            "color": "#CC0000",
            "difficulty": "Leading Media & IT Programs",
            "creators": "Australian Accredited Branch",
            "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Jan, May, Sept",
            "stat2Label": "Degrees",
            "stat2Value": "BCS, BCreative, MBA",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your Dubai Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "Why choose Dubai for higher education?",
            "answer": "Dubai is an international hub with 30+ leading international branch campuses, offering globally recognized UK, Australian, and US degrees in a dynamic, tax-free business center only 3 hours from Mumbai."
      },
      {
            "question": "Do degrees earned in Dubai mention Dubai on the certificate?",
            "answer": "Degrees awarded by international branch campuses (such as Birmingham, Heriot-Watt, or Wollongong) are identical to the degrees awarded at their home campuses in the UK or Australia."
      },
      {
            "question": "Can I work while studying in Dubai?",
            "answer": "Yes, international students in Dubai can work part-time through university internships and university-approved student work permits in creative, tech, and service industries."
      },
      {
            "question": "What is the student visa process for Dubai?",
            "answer": "Universities in Dubai sponsor the student visa directly. The process is fast and efficient, typically taking only 2 to 4 weeks with minimal paperwork."
      },
      {
            "question": "Can students transfer to parent campuses in the UK or Australia?",
            "answer": "Yes, most international universities in Dubai provide seamless student mobility and transfer options to complete part of your degree at the home campus."
      },
      {
            "question": "What are the key intakes in Dubai universities?",
            "answer": "The main intakes are September/October (Fall) and January/February (Spring), with select programmes offering a May/June summer entry."
      },
      {
            "question": "What is the cost of studying in Dubai?",
            "answer": "Annual tuition ranges from AED 40,000 to AED 90,000 depending on the university and course. Living expenses average AED 25,000 to AED 45,000 annually."
      }
],
  },

  europe: {
    heroIntro: "Explore centuries of academic excellence, culturally rich heritage, English-taught degree options, and borderless Schengen travel across Europe.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'World-Class Universities', sub: 'Top-Ranked Research' },
      { icon: 'Briefcase', label: 'Diverse Career Opportunities', sub: 'Industry & Work Rights' },
      { icon: 'Users', label: 'Global Student Community', sub: 'Diverse & Welcoming' },
      { icon: 'Compass', label: 'Flexible Academic Pathways', sub: 'Specialised Curriculum' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Europe?',
      image: '/imagery/usa-campus-overview.jpg',
      imageBadge: 'A Hub of Innovation, Research & Global Opportunities',
      points: [
        {
                "title": "Centuries of academic prestige",
                "description": "Home to Europe’s most historic and scientifically celebrated research institutions.",
                "icon": "Award"
        },
        {
                "title": "Subsidised tuition opportunities",
                "description": "Numerous public universities offer free or heavily subsidised tuition for scholars.",
                "icon": "BookOpen"
        },
        {
                "title": "Schengen travel freedom",
                "description": "Travel across 29 European countries with a single student residence permit.",
                "icon": "Compass"
        },
        {
                "title": "Thousands of English programmes",
                "description": "Comprehensive English-taught bachelor’s, master’s, and doctoral programs.",
                "icon": "Users"
        },
        {
                "title": "Post-study career pathways",
                "description": "European stay-back permits enable graduates to seek employment across the EU.",
                "icon": "TrendingUp"
        },
        {
                "title": "Research excellence & innovation",
                "description": "Pioneering scientific discoveries funded by EU Horizon and national research councils.",
                "icon": "FlaskConical"
        }
],
    },
    popularCourses: [
      {
            "title": "Computer Science & Information Technology",
            "shortTitle": "Computer Science & IT",
            "description": "Build expertise in software engineering, cloud computing, and advanced computing technologies.",
            "icon": "Code2",
            "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Business Administration",
            "description": "Develop executive leadership, strategic management, and entrepreneurial acumen for global careers.",
            "icon": "Briefcase",
            "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Engineering",
            "description": "Gain practical, industry-aligned engineering education across mechanical, electrical, and civil disciplines.",
            "icon": "Cpu",
            "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Data Science & Artificial Intelligence",
            "shortTitle": "Data Science & AI",
            "description": "Master big data analytics, machine learning algorithms, and intelligent systems.",
            "icon": "Database",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Healthcare & Life Sciences",
            "description": "Pursue international careers in public health, biomedical sciences, and clinical research.",
            "icon": "HeartPulse",
            "image": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Finance & Economics",
            "description": "Build a rigorous quantitative foundation in corporate finance, investment analysis, and global markets.",
            "icon": "TrendingUp",
            "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      },
      {
            "title": "Media & Communication",
            "description": "Explore dynamic creative industries, multimedia production, digital journalism, and strategic communication.",
            "icon": "Video",
            "image": "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
            "href": "/services"
      }
],
    topUniversities: [
      {
            "name": "ETH Zurich",
            "location": "Zurich, Switzerland",
            "badge": "ETH",
            "color": "#1F407A",
            "difficulty": "#1 in Continental Europe",
            "creators": "World Top 10 STEM Elite",
            "imageUrl": "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn (Sept)",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "KU Leuven",
            "location": "Leuven, Belgium",
            "badge": "KU Leuven",
            "color": "#1D8DB0",
            "difficulty": "Most Innovative in Europe (Reuters)",
            "creators": "Historic Research Giant (1425)",
            "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "September Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "University of Amsterdam",
            "location": "Amsterdam, Netherlands",
            "badge": "UvA",
            "color": "#BC0031",
            "difficulty": "Top European Research Elite",
            "creators": "Leading Humanities & AI Campus",
            "imageUrl": "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "September Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MSc, Research MA",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Karolinska Institute",
            "location": "Stockholm, Sweden",
            "badge": "Karolinska",
            "color": "#870052",
            "difficulty": "Nobel Assembly for Medicine",
            "creators": "World-Leading Biomedical Center",
            "imageUrl": "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Autumn Intake",
            "stat2Label": "Degrees",
            "stat2Value": "BMed, MSc, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Politecnico di Milano",
            "location": "Milan, Italy",
            "badge": "PoliMi",
            "color": "#002B49",
            "difficulty": "#1 for Design & Architecture in Italy",
            "creators": "Top Engineering Powerhouse",
            "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "Sept & Feb",
            "stat2Label": "Degrees",
            "stat2Value": "BSc, MSc Design, PhD",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      },
      {
            "name": "Sorbonne University",
            "location": "Paris, France",
            "badge": "Sorbonne",
            "color": "#0C2340",
            "difficulty": "Historic French Excellence",
            "creators": "World-Renowned Multidisciplinary",
            "imageUrl": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
            "stat1Label": "Intakes",
            "stat1Value": "September Intake",
            "stat2Label": "Degrees",
            "stat2Value": "Licence, Master, Doctorat",
            "stat3Label": "Advisory",
            "stat3Value": "Full Support",
            "href": "/contact"
      }
],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply?',
      items: [
        'Academic transcripts and certificates',
        'English proficiency test scores (e.g. IELTS, TOEFL, PTE)',
        'Statement of Purpose (SOP)',
        'Letters of Recommendation (LOR), where required',
        'Resume or CV, where required',
        'Valid passport',
        'University-specific application documents',
      ],
      note: 'Requirements may vary by university and programme.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Get Ready for Your Europe Student Visa',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Visa documentation guidance',
        'Application filing and form support',
        'Immigration authority compliance guidance',
        'Interview preparation and rehearsal',
        'Financial documentation guidance',
        'Pre-departure orientation and student briefing',
      ],
      ctaText: 'Talk to Our Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Explore Scholarship Opportunities',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "University-specific scholarships",
        "Merit-based funding opportunities",
        "Need-based financial aid (where available)",
        "Scholarship application guidance",
        "Education cost planning"
],
      ctaText: 'Explore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
            "question": "Which European countries offer low or zero tuition fees?",
            "answer": "Germany, Norway, Iceland, and select regions in Austria, France, and Italy offer tuition-free or heavily subsidised education at public universities for qualifying international students."
      },
      {
            "question": "Can I study in Europe in the English language?",
            "answer": "Yes, thousands of bachelor’s and master’s degree programmes across Europe (including Germany, Netherlands, Sweden, France, and Italy) are taught entirely in English."
      },
      {
            "question": "Does a student visa in one European country allow travel to others?",
            "answer": "Yes, holding a student residence permit in any Schengen area country allows you visa-free travel across all 29 Schengen member states."
      },
      {
            "question": "What is the Erasmus Mundus scholarship?",
            "answer": "Erasmus Mundus is a prestigious EU-funded scholarship covering full tuition fees, travel expenses, living allowance, and insurance for top international students pursuing joint master’s degrees across multiple European universities."
      },
      {
            "question": "Can international students work during studies in Europe?",
            "answer": "Most European countries permit international students to work part-time (typically 15 to 20 hours per week) during semesters and full-time during vacations."
      },
      {
            "question": "What are the post-study work options in Europe?",
            "answer": "Countries like Germany (18 months), France (up to 2 years), Netherlands (1-year Orientation Year visa), and Ireland (2 years) offer dedicated post-study work search permits."
      },
      {
            "question": "When are university application deadlines in Europe?",
            "answer": "Deadlines generally range from January to April for September/October autumn intakes. We recommend beginning preparation 9 to 12 months in advance."
      }
],
  },

  singapore: {
    heroIntro: "Study in Asia's premier education and financial hub, home to world-renowned research universities and high-growth global industries.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'Top Asian Universities', sub: 'NUS & NTU in Global Top 30' },
      { icon: 'Briefcase', label: 'Global Tech & Finance Hub', sub: 'Thriving MNC Headquarters' },
      { icon: 'Users', label: 'Safe & Multicultural City', sub: 'High Quality of Living' },
      { icon: 'Compass', label: 'English-Taught Degrees', sub: 'Globally Recognized' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose Singapore?',
      image: '/destinations/singapore.jpg',
      imageBadge: 'Asia’s Global Gateway to Innovation, Research & Careers',
      points: [
        {
          title: "World-class academic standards",
          description: "Home to National University of Singapore (NUS) and Nanyang Technological University (NTU), consistently ranked in the global top 30.",
          icon: "Award"
        },
        {
          title: "Global financial and business capital",
          description: "Over 7,000 multinational corporations have regional headquarters in Singapore, offering exceptional internship and job pathways.",
          icon: "TrendingUp"
        },
        {
          title: "English-taught curriculums",
          description: "English is the primary language of instruction and administration, ensuring smooth transition for international students.",
          icon: "BookOpen"
        },
        {
          title: "Safe, clean, and vibrant lifestyle",
          description: "Ranked among the safest, greenest, and most technologically advanced cities in the world.",
          icon: "Users"
        },
        {
          title: "Tuition Grant Scheme",
          description: "Eligible international students can receive tuition subsidies from the Singapore Ministry of Education in exchange for working 3 years in Singapore.",
          icon: "Compass"
        },
        {
          title: "Proximity to India",
          description: "Just a 4.5 to 5-hour direct flight from Mumbai and other major Indian metros, enabling easy home visits.",
          icon: "FlaskConical"
        }
      ],
    },
    popularCourses: [
      {
        title: "Computer Science & Artificial Intelligence",
        shortTitle: "Computer Science & AI",
        description: "Study cutting-edge computing, machine learning, and fintech at Asia's premier tech research labs.",
        icon: "Code2",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Business & Management",
        description: "Develop global business leadership, supply chain management, and entrepreneurship in a top corporate hub.",
        icon: "Briefcase",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Finance & Quantitative Economics",
        description: "Access world-leading financial institutions, investment banking, and capital markets analytics.",
        icon: "TrendingUp",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Engineering (Mechanical, Electrical, Civil)",
        description: "Advanced engineering programs with world-class laboratory facilities and strong industry collaboration.",
        icon: "Cpu",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Biomedical Sciences & Biotechnology",
        description: "Leverage Singapore's massive Biopolis ecosystem for pharmaceutical, biomedical, and clinical research.",
        icon: "HeartPulse",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Data Science & Business Analytics",
        description: "Combine statistical modeling, machine learning, and decision sciences for digital business leadership.",
        icon: "Database",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      }
    ],
    topUniversities: [
      {
        name: "National University of Singapore (NUS)",
        location: "Kent Ridge, Singapore",
        badge: "NUS",
        color: "#EF7C00",
        difficulty: "#1 in Asia | Top 10 Globally",
        creators: "Flagship Comprehensive Research University",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "August & January",
        stat2Label: "Degrees",
        stat2Value: "BSc, BEng, MSc, MBA",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "Nanyang Technological University (NTU)",
        location: "Jurong West, Singapore",
        badge: "NTU",
        color: "#C1272D",
        difficulty: "Global Top 20 for Engineering & Tech",
        creators: "Renowned Smart Campus & Innovation",
        imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "August Intake",
        stat2Label: "Degrees",
        stat2Value: "BEng, BSc, MSc",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "Singapore Management University (SMU)",
        location: "City Centre, Singapore",
        badge: "SMU",
        color: "#002F6C",
        difficulty: "Premier Specialized Business School",
        creators: "Interactive Seminar-Style Pedagogy",
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "August & January",
        stat2Label: "Degrees",
        stat2Value: "BBA, BSc, MSc, MBA",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "Singapore University of Technology and Design (SUTD)",
        location: "Changi, Singapore",
        badge: "SUTD",
        color: "#008080",
        difficulty: "Established in Collaboration with MIT",
        creators: "Design-Centric Technology & AI",
        imageUrl: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "May & September",
        stat2Label: "Degrees",
        stat2Value: "BEng, BSc, MDes",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "James Cook University Singapore (JCU)",
        location: "Sims Drive, Singapore",
        badge: "JCU Singapore",
        color: "#004B87",
        difficulty: "Direct Australian Degree in Singapore",
        creators: "EduTrust Star Accredited Campus",
        imageUrl: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "March, July, Nov",
        stat2Label: "Degrees",
        stat2Value: "BBus, MIT, MBA",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      }
    ],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply to Singapore?',
      items: [
        'Class 12 academic transcripts / Bachelor’s degree degree transcripts',
        'English proficiency scores (IELTS / TOEFL / PTE)',
        'Standardized entrance test scores (SAT for UG / GRE or GMAT for PG, depending on university)',
        'Statement of Purpose (SOP) tailored to course focus',
        'Two Letters of Recommendation (LOR)',
        'Detailed resume or academic CV',
        'Valid passport',
      ],
      note: 'Requirements vary by university and level of study. Contact Shine Consultant for profile evaluation.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'Student’s Pass (STP) Application Guidance',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Solar+ / ICA student pass system filing',
        'In-Principle Approval (IPA) letter application',
        'Financial solvency and bank balance documentation',
        'Health check and medical examination coordination',
        'E-appointment and biometric booking at ICA Singapore',
        'Pre-departure orientation & accommodation guidance',
      ],
      ctaText: 'Talk to Our Singapore Visa Experts',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'Singapore Scholarships & Tuition Grants',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "Singapore MOE Tuition Grant (up to 50% tuition subsidy)",
        "NUS & NTU Global Merit Undergraduate Scholarships",
        "Singapore International Graduate Award (SINGA)",
        "ASEAN Undergraduate Scholarships",
        "University-specific postgraduate research scholarships"
      ],
      ctaText: 'Explore Singapore Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
        question: "Why should Indian students choose Singapore for higher education?",
        answer: "Singapore offers world-leading university rankings (NUS and NTU in global top 30), English-taught curriculums, proximity to India (only 4.5 hours flight), and unmatched career opportunities across Asia's largest MNC hub."
      },
      {
        question: "What is the Singapore MOE Tuition Grant Scheme?",
        answer: "The Tuition Grant Scheme is provided by the Singapore Government to help international students subsidize their tuition fees. In return, recipients sign a bond committing to work for a Singapore-registered company for 3 years upon graduation."
      },
      {
        question: "Can international students work part-time in Singapore?",
        answer: "Students registered with approved public institutions (like NUS, NTU, SMU, SUTD) can work part-time for up to 16 hours per week during term time and full-time during official vacation periods without a separate work permit."
      },
      {
        question: "What are the English requirements for Singapore universities?",
        answer: "Most undergraduate and graduate programmes require IELTS (typically 6.5 or higher), TOEFL (90+), or PTE Academic (62+). Some universities may waive test requirements for students with high English marks in Class 12."
      },
      {
        question: "How long does a Singapore Student's Pass take to process?",
        answer: "Once the university submits your application via the ICA SOLAR system, the In-Principle Approval (IPA) typically takes between 2 to 4 weeks to be issued."
      }
    ],
  },

  france: {
    heroIntro: "Experience academic prestige, affordable tuition, and rich European culture at France's world-leading public universities and Grande Écoles.",
    heroBenefits: [
      { icon: 'GraduationCap', label: 'Prestigious Grande Écoles', sub: 'World-Renowned Business & Engineering' },
      { icon: 'Briefcase', label: 'Up to 5-Yr Post-Study Work', sub: 'Dedicated Indian Alumni Visa' },
      { icon: 'Users', label: 'Low Public Tuition Fees', sub: 'Heavily Subsidized by State' },
      { icon: 'Compass', label: 'English-Taught Programs', sub: '1,500+ Fully in English' },
    ],
    overview: {
      eyebrow: 'OVERVIEW',
      title: 'Why Choose France?',
      image: '/destinations/france.jpg',
      imageBadge: 'European Excellence in Education, Research, Arts & Industry',
      points: [
        {
          title: "World-class business & engineering institutions",
          description: "France is home to globally top-ranked business schools (HEC Paris, INSEAD, ESSEC) and prestigious engineering Grande Écoles.",
          icon: "Award"
        },
        {
          title: "Special 5-year post-study work visa for Indians",
          description: "Indian students completing a master's degree in France are eligible for a 5-year short-stay Schengen visa to maintain business and career ties.",
          icon: "TrendingUp"
        },
        {
          title: "1,500+ programs taught entirely in English",
          description: "You do not need to be fluent in French to pursue degrees in business, management, computer science, and engineering.",
          icon: "BookOpen"
        },
        {
          title: "Government subsidized housing and healthcare",
          description: "International students receive CAF housing allowances (up to 30-40% rent refund) and free French national healthcare (Sécurité Sociale).",
          icon: "Compass"
        },
        {
          title: "Gateway to the European Union (Schengen)",
          description: "Travel freely across 29 Schengen member countries for study, internships, conferences, and leisure.",
          icon: "Users"
        },
        {
          title: "Generous post-study stay back permit (APS)",
          description: "Graduates are granted a 2-year post-study job seeker visa (Autorisation Provisoire de Séjour / RECE) to find qualified employment.",
          icon: "FlaskConical"
        }
      ],
    },
    popularCourses: [
      {
        title: "International Management & MBA",
        shortTitle: "Management & MBA",
        description: "Study at the world's most acclaimed business schools with elite corporate recruitment networks.",
        icon: "Briefcase",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Computer Science, Data Science & AI",
        description: "Leverage France's booming tech startup ecosystem, Station F in Paris, and leading research institutes.",
        icon: "Code2",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Luxury Brand Management & Fashion",
        description: "Learn in the fashion and luxury capital of the world, home to LVMH, Kering, Chanel, and Hermès.",
        icon: "Award",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Aerospace, Mechanical & Automotive Engineering",
        description: "France leads European aerospace (Airbus, Safran, Dassault) with cutting-edge engineering programs.",
        icon: "Cpu",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Culinary Arts & Hospitality Management",
        description: "Train at prestigious academies in gastronomy, wine tourism, and luxury hospitality.",
        icon: "HeartPulse",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      },
      {
        title: "Finance & Quantitative Economics",
        description: "Top-ranked master's in finance programs preparing students for international investment banking in Paris and London.",
        icon: "TrendingUp",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
        href: "/services"
      }
    ],
    topUniversities: [
      {
        name: "Sorbonne University",
        location: "Paris, France",
        badge: "Sorbonne",
        color: "#0F2042",
        difficulty: "Historic World-Ranked Public University",
        creators: "Pioneering Arts, Humanities & Sciences",
        imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "September Intake",
        stat2Label: "Degrees",
        stat2Value: "Licence, Master, PhD",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "HEC Paris",
        location: "Jouy-en-Josas, Paris",
        badge: "HEC Paris",
        color: "#C2002F",
        difficulty: "#1 Business School in Europe (FT)",
        creators: "Elite Global Corporate Network",
        imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "September & January",
        stat2Label: "Degrees",
        stat2Value: "MIM, MSc, MBA",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "École Polytechnique (Institut Polytechnique de Paris)",
        location: "Palaiseau, Paris",
        badge: "Polytechnique",
        color: "#002B49",
        difficulty: "France's Foremost Engineering Grande École",
        creators: "World-Class Science, Tech & Math",
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "September Intake",
        stat2Label: "Degrees",
        stat2Value: "BSc, Ingénieur, MSc",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "INSEAD",
        location: "Fontainebleau, France",
        badge: "INSEAD",
        color: "#006633",
        difficulty: "Top-Ranked Global Business School",
        creators: "The Business School for the World",
        imageUrl: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "Jan & Aug Intakes",
        stat2Label: "Degrees",
        stat2Value: "MIM, MBA, Executive MBA",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      },
      {
        name: "Sciences Po Paris",
        location: "Paris, France",
        badge: "Sciences Po",
        color: "#E2001A",
        difficulty: "World Leader in Social Sciences & Politics",
        creators: "International Public Policy & Law",
        imageUrl: "https://images.unsplash.com/photo-1583373834259-46cc92173cb7?auto=format&fit=crop&w=800&q=80",
        stat1Label: "Intakes",
        stat1Value: "September Intake",
        stat2Label: "Degrees",
        stat2Value: "BA, Master, MPA",
        stat3Label: "Advisory",
        stat3Value: "Full Support",
        href: "/contact"
      }
    ],
    admissionRequirements: {
      eyebrow: 'ADMISSION REQUIREMENTS',
      title: 'What Do You Need to Apply to France?',
      items: [
        'Academic mark sheets and transcripts (translated if required)',
        'English proficiency scores (IELTS / TOEFL / PTE) for English-taught programs',
        'Campus France dossier and Etudes en France registration',
        'Statement of Purpose (SOP) emphasizing career motivation',
        'Two Letters of Recommendation (LOR)',
        'Detailed curriculum vitae (CV)',
        'Valid passport',
      ],
      note: 'Campus France interview is mandatory for Indian applicants. Shine Consultant provides complete interview preparation.',
    },
    visaAssistance: {
      eyebrow: 'VISA SUPPORT',
      title: 'VLS-TS Long-Stay Student Visa & Campus France Support',
      image: '/imagery/usa-visa-passport.jpg',
      items: [
        'Etudes en France (Campus France) online portal completion',
        'Campus France interview coaching and prep',
        'VFS France appointment booking and file preparation',
        'Financial proof and blocked account guidance (minimum €615/month)',
        'Long-stay student visa (VLS-TS) validation support',
        'CAF housing subsidy registration guidance',
      ],
      ctaText: 'Talk to Our France Visa Specialists',
      ctaHref: '/services/visa-assistance',
    },
    scholarships: {
      eyebrow: 'SCHOLARSHIPS',
      title: 'France Scholarships for Indian Students',
      image: '/imagery/usa-student-scholarship.jpg',
      items: [
        "Charpak Scholarship Programme (Excellence & Master’s)",
        "Eiffel Excellence Scholarship Programme",
        "Erasmus+ European Union Scholarships",
        "Franco-Indian Education Trust Scholarships",
        "Institution-specific merit scholarships (HEC, ESSEC, EDHEC)"
      ],
      ctaText: 'Explore French Scholarships',
      ctaHref: '/contact',
    },
    faqs: [
      {
        question: "Do I need to speak French to study in France?",
        answer: "No. France offers more than 1,500 programs fully taught in English, especially at master's level in business, engineering, sciences, and hospitality. Basic French is helpful for everyday life and can be learned during your studies."
      },
      {
        question: "What is the 5-year post-study visa benefit for Indian students?",
        answer: "Under the bilateral agreement between France and India, Indian students who hold a master's degree or higher from a French institution are eligible for a 5-year short-stay Schengen circulation visa to travel, network, and maintain professional connections in France."
      },
      {
        question: "What is the Campus France process?",
        answer: "Campus France is the official agency for international students in France. Indian students must register on the 'Etudes en France' portal, upload their documents, and complete a short academic interview before applying for their student visa."
      },
      {
        question: "Can international students work while studying in France?",
        answer: "Yes. French law permits international students with a valid student visa to work up to 964 hours per year (approximately 60% of normal full-time working hours), earning at least the French minimum wage (SMIC)."
      },
      {
        question: "What is the CAF housing allowance?",
        answer: "CAF (Caisse d’Allocations Familiales) is a French government welfare program that provides financial assistance to all students, including international students, covering roughly 20% to 40% of monthly accommodation rent."
      }
    ],
  },

};

/**
 * Returns destination-specific data for the detail page.
 * Falls back to a structured default if slug is not found.
 */
export function getDestinationPageData(slug) {
  return DESTINATION_DATA[slug] || DESTINATION_DATA.usa;
}
