/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Compass, TrendingUp, CheckCircle, FileText, ArrowRight, Sparkles, RefreshCcw, Coffee } from 'lucide-react';
import { UserData, PracticeStage } from '../types';
import { PRACTICE_STAGES } from '../data';

export default function DiagnosticWizard() {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    email: '',
    focusArea: '',
    updates: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultStage, setResultStage] = useState<PracticeStage | null>(null);
  const [dynamicPromptContent, setDynamicPromptContent] = useState<string>('');
  const [isDownloaded, setIsDownloaded] = useState(false);

  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (resultStage) {
      resultHeadingRef.current?.focus();
    }
  }, [resultStage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.focusArea) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/generate-skill-pack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate skill pack');
      }

      const data = await response.json();
      
      setResultStage({
        id: `dynamic-${Date.now()}`,
        title: data.title,
        description: data.description,
        keySignals: data.keySignals,
        remediationSystems: data.remediationSystems,
      });
      setDynamicPromptContent(data.promptContent);
    } catch (error) {
      console.error('Error calibrating skill pack:', error);
      // Fallback to simulation/mock data in case of error
      let assignedStage: PracticeStage;
      if (formData.focusArea === 'strategy') {
        assignedStage = PRACTICE_STAGES[2]; // Systems-Oriented / Scaled
      } else if (formData.focusArea === 'operations') {
        assignedStage = PRACTICE_STAGES[1]; // Tactical Integration
      } else {
        assignedStage = PRACTICE_STAGES[0]; // Ad-Hoc / Reactive
      }

      setResultStage(assignedStage);
      setDynamicPromptContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      email: '',
      focusArea: '',
      updates: true,
    });
    setResultStage(null);
    setDynamicPromptContent('');
    setIsDownloaded(false);
  };

  const triggerDownload = () => {
    setIsDownloaded(true);
    const element = document.createElement("a");

    // Use dynamically generated prompts if available, otherwise fall back to static prompts based on focusArea
    let promptContent = dynamicPromptContent;
    if (!promptContent) {
      if (formData.focusArea === 'strategy') {
        promptContent = `
## Custom Claude Code Instructions (\`.claudecode/ethical-redteaming\`)
\`\`\`markdown
# SYSTEM: ADV-ETHICAL-RED-TEAMER
- Act as an adversarial red-teamer evaluating inclusive designs.
- Whenever a database query or schema configuration is added, check if demographic fields or high-privilege user classifications could leak sensitive telemetry.
- Scan logic for hidden generative biases inside any agent helper utilities. Recommend explicit adversarial prompt guards.
- Print out an Algorithmic Risk Rating (Scale 1-5) and prompt remediation score when database structures are altered.
\`\`\`
`;
      } else if (formData.focusArea === 'operations') {
        promptContent = `
## Custom Claude Code Instructions (\`.claudecode/component-specs\`)
\`\`\`markdown
# SYSTEM: A11Y-COMPONENT-CHECKER
- Enforce accessibility-by-fault guidelines inside newly created React components.
- Confirm keyboard navigation maps: any custom toggle key elements must listen to \`onKeyDown\` representing Spacebar or Enter.
- Check standard HTML elements for semantic markup. Recommend focus-visible styles whenever state modifications change focus pointer.
- For nested layouts, output a custom tree mapping logical tabIndex flow index.
\`\`\`
`;
      } else {
        promptContent = `
## Custom Claude Code Instructions (\`.claudecode/react-a11y-hotfix\`)
\`\`\`markdown
# SYSTEM: RESPONSIVE-HOTFIX-rem
- Prioritize high-velocity, practical user validations inside hotfix pull requests.
- Verify that forms elements contain appropriate aria-labels and placeholder descriptive text.
- Inspect button and click targets to ensure interactive padding sizes measure at least 44px on mobile screens.
- Append a quick cognitive bias compliance notice to any newly introduced alert or notification layout models.
\`\`\`
`;
      }
    }

    const file = new Blob([
      `# CLAUDE CODE SKILL PACK - INCLUSIVE DESIGN VELOCITY\n` +
      `====================================================\n\n` +
      `Prepared for: ${formData.firstName} (${formData.email})\n` +
      `Focus Area: ${formData.focusArea ? formData.focusArea.toUpperCase() : 'GENERAL'}\n` +
      `Calibrated Profile: ${resultStage?.title || 'GENERAL'}\n` +
      `Generated on: ${new Date().toLocaleDateString()}\n\n` +
      `## Overview\n` +
      `${resultStage?.description || ''}\n\n` +
      `## Calibrated Rules & Signals\n` +
      `While developing in Claude Code, ensure the model respects the following rules mapped to your codebase:\n` +
      (resultStage?.keySignals ? resultStage.keySignals.map(sig => ` - ${sig}`).join('\n') : '') + `\n\n` +
      `## Active Skill Integration Actions\n` +
      (resultStage?.remediationSystems ? resultStage.remediationSystems.map(rem => ` - ${rem}`).join('\n') : '') + `\n\n` +
      `----------------------------------------------------\n` +
      `${promptContent}\n` +
      `----------------------------------------------------\n\n` +
      `Thank you for using Inclusive Tech Club tools. Run "claude" with these rules active to accelerate inclusive design velocity.\n`
    ], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${formData.firstName}_Inclusive_Design_Velocity_Skill_Pack.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="diagnostic-section" className="space-y-16">
      {/* Upper section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#006a61] bg-[#89f5e7]/20 px-3 py-1 rounded font-semibold">
            Interactive Developer Workspace
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-black mt-4 mb-6 leading-tight">
            Tailor Your Claude Code Skill Pack.
          </h1>
          <p className="font-sans text-lg text-on-surface-variant mb-8 leading-relaxed">
            Get the free <strong>Inclusive Design Velocity</strong> pack: a custom-calibrated Claude Code skill pack for product teams building inclusive, accessible, and ethically grounded products.
          </p>

          <AnimatePresence mode="wait">
            {!resultStage ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-muted-border shadow-xs space-y-6">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-black font-semibold mb-2" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full h-12 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-sm font-medium transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-black font-semibold mb-2" htmlFor="email">
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-sm font-medium transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-black font-semibold mb-2" htmlFor="role">
                      Primary Focus Area
                    </label>
                    <select
                      id="role"
                      required
                      value={formData.focusArea}
                      onChange={(e) => setFormData({ ...formData, focusArea: e.target.value as any })}
                      className="w-full h-12 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-sm font-medium transition-all cursor-pointer"
                    >
                      <option value="">Select an area...</option>
                      <option value="strategy">Strategic Planning (Aiming for Scaled Growth)</option>
                      <option value="operations">Operations &amp; Systems (Looking to integrate templates)</option>
                      <option value="growth">Growth &amp; Marketing (Focusing on reactive challenges)</option>
                    </select>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      id="updates"
                      type="checkbox"
                      checked={formData.updates}
                      onChange={(e) => setFormData({ ...formData, updates: e.target.checked })}
                      className="mt-1 h-5 w-5 rounded border-outline/30 text-black focus:ring-focus-indicator cursor-pointer"
                    />
                    <label className="font-sans text-xs text-on-surface-variant leading-relaxed select-none cursor-pointer" htmlFor="updates">
                      Send me occasional updates and strategic insights from the Inclusive Tech Club.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white font-sans text-sm font-semibold h-12 rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:ring-offset-2 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCcw className="w-4 h-4 animate-spin" aria-hidden="true" />
                        Calibrating Your Claude Skill Pack...
                      </>
                    ) : (
                      <>
                        Get Your Claude Skill Pack
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="result-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 rounded-xl border-2 border-black shadow-sm space-y-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      ref={resultHeadingRef}
                      tabIndex={-1}
                      className="font-mono text-xs uppercase tracking-widest text-[#006a61] bg-[#89f5e7]/20 px-3 py-1 rounded inline-block font-bold focus:outline-none"
                    >
                      Skill Pack Calibrated
                    </h3>
                    <h4 className="font-display text-xl font-bold text-black mt-3 leading-snug">
                      {resultStage.title}
                    </h4>
                  </div>
                  <Sparkles className="w-6 h-6 text-yellow-500 animate-bounce" aria-hidden="true" />
                </div>

                <p className="font-sans text-sm text-on-surface-variant leading-relaxed border-b border-muted-border pb-4">
                  {resultStage.description}
                </p>

                <div className="space-y-3">
                  <h5 className="font-mono text-xs uppercase tracking-wider text-black font-semibold">Programmatic Triggers &amp; Focus Area:</h5>
                  <ul className="space-y-2">
                    {resultStage.keySignals.map((sig, i) => (
                      <li key={i} className="flex gap-2 items-start text-xs font-sans text-neutral-700">
                        <CheckCircle className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{sig}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 border-t border-muted-border pt-4">
                  <h5 className="font-mono text-xs uppercase tracking-wider text-black font-semibold">Active Claude Instruction Rules:</h5>
                  <ul className="space-y-2">
                    {resultStage.remediationSystems.map((rem, i) => (
                      <li key={i} className="flex gap-2 items-start text-xs font-sans text-neutral-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="font-medium text-black">{rem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-muted-border pt-4">
                  <button
                    onClick={triggerDownload}
                    className="h-11 rounded-lg bg-emerald-600 text-white font-sans text-xs font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    {isDownloaded ? 'Skill Pack Saved ✓' : 'Download Skill Pack (.md)'}
                  </button>
                  <button
                    onClick={handleReset}
                    className="h-11 rounded-lg border border-black hover:bg-neutral-50 text-black font-sans text-xs font-semibold flex items-center justify-center gap-2 transition"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    Calibrate New Pack
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side graphic: Interactive Digital Strategic Notebook Component */}
        <div id="strategic-notebook-container" aria-hidden="true" className="relative h-full min-h-[480px] bg-slate-100 rounded-xl overflow-hidden border border-muted-border flex flex-col justify-between p-6 shadow-xs select-none">
          {/* Technical Calibration Grid representation */}
          <div id="notebook-grid-overlay" className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-[0.06] pointer-events-none">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border-b border-r border-black"></div>
            ))}
          </div>

          {/* Radial subtle ambient lighting */}
          <div id="notebook-ambient-lighting" className="absolute inset-0 bg-radial-gradient from-white/70 via-transparent to-transparent pointer-events-none" />          {/* Top telemetry bar */}
          <div id="notebook-telemetry-hdr" className="flex justify-between items-center border-b border-neutral-200/60 pb-3 z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="font-mono text-[9px] uppercase font-bold text-neutral-500 tracking-wider">
                System: Skill Calibration Active
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase font-bold text-neutral-400">
              Ref: {formData.focusArea ? `SKILL-${formData.focusArea.toUpperCase()}` : 'CALIBRATING'}
            </span>
          </div>

          {/* Center Graphic: Digital Notebook Binder */}
          <div id="notebook-notebook-layout" className="my-auto py-6 flex items-center justify-center z-10 w-full">
            <div id="notebook-inner-binder" className="w-full max-w-[440px] bg-white rounded-xl shadow-md border border-neutral-200/80 overflow-hidden flex flex-col">
              {/* Notebook Header Tab */}
              <div className="bg-neutral-50 px-4 py-2 border-b border-neutral-100 flex items-center justify-between">
                <span className="font-mono text-[10px] text-neutral-500 max-w-[190px] truncate">
                  {formData.firstName ? `OWNER: ${formData.firstName.toUpperCase()}'S SKILL PACK` : 'PROJECT: SKILL CALIBRATION'}
                </span>
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                </div>
              </div>

              {/* The Double-Page Spreads */}
              <div className="relative flex min-h-[220px]">
                {/* Spiral Ring Binder spine in absolute center of the sheets */}
                <div id="spiral-spine-elements" className="absolute inset-y-0 left-1/2 -ml-2 w-4 flex flex-col justify-evenly items-center py-4 z-20 pointer-events-none">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="w-4 h-2 rounded-full bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 border border-neutral-300 shadow-sm"></div>
                  ))}
                </div>

                {/* Left Page: Interactive Maturity Path Graphic */}
                <div id="notebook-left-page" className="w-1/2 p-4 pr-5 border-r border-neutral-100 flex flex-col justify-between bg-neutral-50/20">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-[#006a61] block mb-2 font-bold">
                      I. VELOCITY CURVE
                    </span>
                    
                    {/* Rising SVG Path representing the Maturity Curve */}
                    <div className="relative h-24 my-2 flex items-center justify-center">
                      <svg id="notebook-maturity-svg" className="w-full h-full overflow-visible" viewBox="0 0 120 70">
                        {/* Shaded area under the curve */}
                        <defs>
                          <linearGradient id="curveGrad" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#89f5e7" stopOpacity="0"/>
                            <stop offset="100%" stopColor="#89f5e7" stopOpacity="0.25"/>
                          </linearGradient>
                        </defs>
                        <path
                          d="M 10,60 Q 50,55 70,35 T 110,12"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />
                        <motion.path
                          d="M 10,60 Q 50,55 70,35 T 110,12"
                          fill="url(#curveGrad)"
                          stroke="#006a61"
                          strokeWidth="2.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />

                        {/* Interactive Nodes along the curve */}
                        {/* Node 1: Reactive / Growth */}
                        <g>
                          <circle
                            cx="20"
                            cy="59"
                            r="4"
                            className={`transition-colors duration-300 ${(formData.focusArea === 'growth' || (!formData.focusArea && !resultStage)) ? 'fill-[#006a61]' : 'fill-white'} stroke-[#006a61] stroke-2 cursor-pointer`}
                          />
                          {(formData.focusArea === 'growth' || (!formData.focusArea && !resultStage)) && (
                            <circle cx="20" cy="59" r="8" fill="none" stroke="#89f5e7" strokeWidth="2" className="animate-ping" />
                          )}
                        </g>

                        {/* Node 2: Operations / Tactical */}
                        <g>
                          <circle
                            cx="60"
                            cy="45"
                            r="4"
                            className={`transition-colors duration-300 ${formData.focusArea === 'operations' ? 'fill-[#006a61]' : 'fill-white'} stroke-[#006a61] stroke-2 cursor-pointer`}
                          />
                          {formData.focusArea === 'operations' && (
                            <circle cx="60" cy="45" r="8" fill="none" stroke="#89f5e7" strokeWidth="2" className="animate-ping" />
                          )}
                        </g>

                        {/* Node 3: Strategy / Scaled */}
                        <g>
                          <circle
                            cx="100"
                            cy="19"
                            r="4"
                            className={`transition-colors duration-300 ${formData.focusArea === 'strategy' ? 'fill-[#006a61]' : 'fill-white'} stroke-[#006a61] stroke-2 cursor-pointer`}
                          />
                          {formData.focusArea === 'strategy' && (
                            <circle cx="100" cy="19" r="8" fill="none" stroke="#89f5e7" strokeWidth="2" className="animate-ping" />
                          )}
                        </g>
                      </svg>

                      {/* Floating Indicator Labels */}
                      <div className="absolute bottom-1 left-1.5 font-mono text-[7px] text-neutral-400 font-bold uppercase select-none pointer-events-none">Reactive</div>
                      <div className="absolute top-[52px] left-[38px] font-mono text-[7px] text-neutral-400 font-bold uppercase select-none pointer-events-none">Systemic</div>
                      <div className="absolute top-2 right-1 font-mono text-[7px] text-neutral-400 font-bold uppercase select-none pointer-events-none">Ethical</div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-2">
                    <span className="font-mono text-[7px] text-neutral-400 block uppercase">Calibrated Skill Pack</span>
                    <span className="font-sans text-[10px] font-bold text-black block truncate">
                      {formData.focusArea === 'strategy' && 'Ethical Red-Teaming (Strategic)'}
                      {formData.focusArea === 'operations' && 'Systemic Design Heuristics'}
                      {formData.focusArea === 'growth' && 'Reactive Guardrails & UI Checks'}
                      {!formData.focusArea && 'Awaiting Selection...'}
                    </span>
                  </div>
                </div>

                {/* Right Page: Checklists & Status Bars */}
                <div id="notebook-right-page" className="w-1/2 p-4 pl-5 flex flex-col justify-between bg-neutral-50/10">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-black block mb-2 font-bold">
                      II. SKY-CHECKS
                    </span>

                    <div className="space-y-2 mt-2">
                      {/* Check 1 */}
                      <div className="flex items-center gap-1.5">
                        <motion.div
                          animate={{ scale: formData.firstName ? 1 : [0.95, 1.05, 0.95] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all duration-300 ${formData.firstName ? 'border-emerald-500 bg-emerald-50' : 'border-neutral-300 bg-white'}`}
                        >
                          {formData.firstName ? (
                            <svg className="w-2.5 h-2.5 text-emerald-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 animate-pulse"></div>
                          )}
                        </motion.div>
                        <span className="font-sans text-[9px] text-neutral-600 font-medium tracking-tight">Claude Prompts Set</span>
                      </div>

                      {/* Check 2 */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all duration-300 ${formData.focusArea ? 'border-emerald-500 bg-emerald-50' : 'border-neutral-300 bg-white'}`}
                        >
                          {formData.focusArea ? (
                            <svg className="w-2.5 h-2.5 text-emerald-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                          )}
                        </div>
                        <span className="font-sans text-[9px] text-neutral-600 font-medium tracking-tight">Guidelines Mapped</span>
                      </div>

                      {/* Check 3 */}
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-all duration-300 ${resultStage ? 'border-emerald-500 bg-emerald-50' : 'border-neutral-300 bg-white'}`}
                        >
                          {resultStage ? (
                            <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                          )}
                        </div>
                        <span className="font-sans text-[9px] text-neutral-600 font-medium tracking-tight">Files Packaged</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational risk or progress index */}
                  <div className="border-t border-neutral-100 pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-[7px] text-neutral-400 uppercase">Process Status</span>
                      <span id="notebook-status-percentage" className="font-mono text-[7px] text-black font-bold uppercase">
                        {resultStage ? '100% READY' : formData.focusArea ? '66% COMPILED' : '33% INITIAL'}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <motion.div
                        id="notebook-progress-fill"
                        className="bg-black h-full rounded-full"
                        animate={{
                          width: resultStage ? '100%' : formData.focusArea ? '66%' : '33%'
                        }}
                        transition={{ type: "spring", stiffness: 80 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Elegant active control status bar & interactive floating coffee cup */}
          <div id="notebook-footer" className="flex justify-between items-end border-t border-neutral-200/60 pt-4 z-10 w-full">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#006a61] font-bold block">
                Inclusive Tech Club
              </span>
              <span className="font-sans text-[10px] text-neutral-500 block leading-tight">
                Embed inclusive design directly into development cycles.
              </span>
            </div>

            {/* Interactive Floating / Steaming Coffee Cup Widget */}
            <motion.div
              id="coffee-cup-interactive-widget"
              whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 bg-white rounded-xl border border-neutral-200/80 shadow-3xs cursor-pointer group flex items-center gap-1.5"
            >
              <div className="relative">
                {/* Steam Vectors */}
                <div id="coffee-steam-vectors" className="absolute -top-3.5 left-1/2 -ml-1 flex gap-0.5 h-3.5 pointer-events-none">
                  <motion.span
                    animate={{ y: [2, -4, 2], opacity: [0.3, 0.9, 0.3], scaleX: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-[1.5px] bg-neutral-400 rounded-full"
                  />
                  <motion.span
                    animate={{ y: [0, -6, 0], opacity: [0.1, 0.8, 0.1], scaleX: [1.2, 0.9, 1.2] }}
                    transition={{ repeat: Infinity, duration: 1.6, delay: 0.3, ease: "easeInOut" }}
                    className="w-[1.5px] bg-neutral-400 rounded-full"
                  />
                  <motion.span
                    animate={{ y: [3, -3, 3], opacity: [0.2, 0.7, 0.2], scaleX: [0.9, 1.1, 0.9] }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: 0.1, ease: "easeInOut" }}
                    className="w-[1.5px] bg-neutral-400 rounded-full"
                  />
                </div>
                <Coffee className="w-4 h-4 text-neutral-850" aria-hidden="true" />
              </div>
              <span className="font-mono text-[8.5px] uppercase text-neutral-500 font-bold tracking-tight">
                Fresh Brew
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Strategic Clarity, Delivered Section */}
      <div className="bg-surface-container-low p-8 md:p-12 rounded-2xl border border-muted-border">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-black mb-12">
          Inclusive Design Velocity, Integrated.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-muted-border shadow-xs hover:border-black transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
              <Search className="w-6 h-6 text-black group-hover:text-white transition-all" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-black mb-3">
              Calibrate Guidelines
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Select your development team's primary focus node, whether optimizing raw code-level hotfixes, continuous component specs, or high-value algorithmic pathways.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-muted-border shadow-xs hover:border-black transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
              <Compass className="w-6 h-6 text-black group-hover:text-white transition-all" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-black mb-3">
              Targeted Prompting
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Tailor customized programmatic instruction directives that seamlessly feed into your active Claude Code CLI workspace rulesets.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-muted-border shadow-xs hover:border-black transition-colors duration-300 group">
            <div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all">
              <TrendingUp className="w-6 h-6 text-black group-hover:text-white transition-all" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-black mb-3">
              Accelerate Velocity
            </h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Unleash automated multi-tier audits, trauma-informed assessments, and WCAG-aligned checks directly during live coding, reducing launch remodel time to zero.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
