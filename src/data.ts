/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CurriculumModule, AcceleratorWeek, PracticeStage } from './types';

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: '01',
    title: 'Foundations of Inclusion',
    shortDescription: 'Establish the core principles and shared vocabulary required to drive organizational change.',
    longDescription: 'This module sets the groundwork for your inclusive tech journey. You will master standard vocabulary, learn the psychological principles of cognitive exclusion, and discover how to align disparate stakeholders on a single shared mission of equitable production.',
    outputs: ['Terminology Handbook', 'Stakeholder Alignment Deck'],
    duration: '2.5 hours of guided content',
    checklist: [
      'Understand systemic barriers in product workflows',
      'Establish organizational vocabulary benchmarks',
      'Create standard stakeholder alignment frameworks'
    ]
  },
  {
    id: '02',
    title: 'Auditing for Bias',
    shortDescription: 'Systematic approaches to uncovering hidden biases in existing product flows and feature sets.',
    longDescription: 'Dive deep into structural audits. Learn how to reconstruct consumer journeys from multiple diverse personas, trace data-flow biases, and use quantitative matrices to score and evaluate structural exclusion within your UI controls.',
    outputs: ['Heuristic Evaluation Checklist', 'Bias Audit Worksheet'],
    duration: '3.0 hours of practical labs',
    checklist: [
      'Design comprehensive heuristic surveys',
      'Track identity-based user pathways',
      'Identify critical bias vectors in intake flows'
    ]
  },
  {
    id: '03',
    title: 'Trauma-Informed Research',
    shortDescription: 'Conduct user research that respects boundaries, ensures psychological safety, and yields deeper insights.',
    longDescription: 'Equip your research team to manage extreme sensitivity. Discover trauma-informed onboarding protocols, consent standards that respect human dignity, and methodologies that generate authentic insights from vulnerable communities without prompting cognitive re-traumatization.',
    outputs: ['Interview Protocol Template', 'Consent & Debrief Forms'],
    duration: '4.0 hours of deep methods',
    checklist: [
      'Review boundaries & emotional checkpoints',
      'Draft ethical protocol architectures',
      'Synthesize safe, anonymous data logs'
    ]
  },
  {
    id: '04',
    title: 'AI Harm Mitigation',
    shortDescription: 'Frameworks for anticipating, documenting, and mitigating algorithmic harm and exclusionary data sets.',
    longDescription: 'Address generative AI and large language models with precision. Learn how to craft adversarial red-teaming prompts to evaluate language biases, create safety scorecards, and implement architectural guardrails designed to minimize toxic outputs.',
    outputs: ['Algorithmic Impact Matrix', 'Red-Teaming Prompts'],
    duration: '3.5 hours of AI labs',
    checklist: [
      'Construct a localized risk taxonomy',
      'Author adversarial prompt structures',
      'Deploy continuous feedback matrices'
    ]
  },
  {
    id: '05',
    title: 'Accessible By Default',
    shortDescription: 'Integrate WCAG standards into the design process early, treating accessibility as architecture, not compliance.',
    longDescription: 'Learn how to embed accessibility parameters directly into Figma components, developer specifications, and automated test environments. No more post-launch retrofits—discover architecture that inherently supports readers, tab navigators, and motor assisting devices.',
    outputs: ['Component A11y Specs', 'QA Handoff Checklist'],
    duration: '4.5 hours of code & design',
    checklist: [
      'Translate WCAG 2.2 criteria to atomic components',
      'Produce custom keyboard navigation maps',
      'Automate linting and semantic layout inspections'
    ]
  },
  {
    id: '06',
    title: 'Modules 06 — 10',
    shortDescription: 'Global Localization, Inclusive Copywriting, Metrics & Measurement, Systems Thinking, and Organizational Change Management.',
    longDescription: 'The comprehensive syllabus covers global scale considerations, language tone-of-voice diagnostics, quantitative inclusion metrics, and behavioral change loops to integrate values across departments.',
    outputs: ['Localization Metrics Framework', 'Tone Audit Guidelines', 'Change Playbook'],
    duration: '12 hours of advanced strategies',
    checklist: [
      'Address language localization differences',
      'Measure quantitative inclusion scores over time',
      'Drive behavior change loops within engineering cores'
    ]
  }
];

export const ACCELERATOR_WEEKS: AcceleratorWeek[] = [
  {
    week: 1,
    title: 'Foundations & AI Risk Mitigation',
    description: 'Establishing baseline definitions, operational language, and analyzing algorithms and datasets for bias.',
    deliverable: 'Inclusion Blueprint & Risk Matrix',
    focusArea: 'Baseline architecture & risk auditing'
  },
  {
    week: 2,
    title: 'Edge Cases & Accessible Service Design',
    description: 'Designing for extreme usability scenarios and mapping the end-to-end journey to ensure inclusive touchpoints.',
    deliverable: 'Edge Personas & Service Blueprint',
    focusArea: 'Usability profiles & systems auditing'
  },
  {
    week: 3,
    title: 'Metrics, Alignment & Integration',
    description: 'Developing inclusion KPIs, securing executive buy-in, and mapping out the 90-day implementation roadmap.',
    deliverable: 'ROI Dashboard & 90-Day Plan',
    focusArea: 'Executive reporting & transformation'
  }
];

export const PRACTICE_STAGES: PracticeStage[] = [
  {
    id: 'stage-1',
    title: 'Velocity Profile: Reactive Guardrails & Multi-tier Accessibility Checks',
    description: 'Calibrated to treat inclusive fixes as quick, automated codebase enhancements. Integrates lightweight, high-velocity checks directly into the Claude Code CLI workspace for fast hotfixes, feedback loops, and rapid alignment across sprint items.',
    keySignals: [
      'Automate text color contrast remediation patterns inline',
      'Audit newly staged files for missing descriptive aria-labels before commit',
      'Inject accessibility-related qa checkpoints on newly-added interactive elements'
    ],
    remediationSystems: [
      'Deploy localized `.claudecode/react-a11y-hotfix` instructions',
      'Integrate quick automated heuristic checklists within file saving triggers'
    ]
  },
  {
    id: 'stage-2',
    title: 'Velocity Profile: Systemic Design Heuristics & Continuous UI Specs',
    description: 'Calibrated to embed structural inclusion principles into standard Figma component translation, design patterns, and continuous testing. Provides specific instructions to cross-reference WCAG 2.2 criteria iteratively inside your React components.',
    keySignals: [
      'Check customized components for logical keyboard tab order and focus-visible states',
      'Verify aria-describedby associations in nested form controls',
      'Enforce trauma-informed boundary protocols in local patient or intake database APIs'
    ],
    remediationSystems: [
      'Deploy continuous component spec guides inside `.claudecode/component-specs`',
      'Implement layout heuristic evaluations and verification flags within standard git workflows'
    ]
  },
  {
    id: 'stage-3',
    title: 'Velocity Profile: Ethical Red-Teaming & Algorithmic Guardrails',
    description: 'Empowers Claude Code to act as an active, adversarial ethical red-teamer. Calibrated to help senior leadership assess algorithmic risk taxonomies, formulate adversarial prompts, verify model bias, and implement system guardrails into API layers.',
    keySignals: [
      'Diagnose potential training-data or bias skew within database schemas',
      'Conduct conversational bias evaluations on generative agent helper components',
      'Audit product architecture for potential demographic data leakages and privacy violations'
    ],
    remediationSystems: [
      'Deploy adversarial red-teaming guidelines inside `.claudecode/ethical-redteaming`',
      'Produce automated AI bias scorecards tracking data-flow inputs'
    ]
  }
];
