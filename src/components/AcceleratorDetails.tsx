/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, AlertTriangle, ShieldAlert, FileText, Calendar, CheckSquare, Sparkles, X, ChevronDown, Award, Send, RefreshCw, UsersRound, Compass } from 'lucide-react';
import { ACCELERATOR_WEEKS } from '../data';
import { AcceleratorWeek } from '../types';
import useFocusTrap from './useFocusTrap';

export default function AcceleratorDetails() {
  const [activeWeek, setActiveWeek] = useState<number | null>(1);
  const [isApplying, setIsApplying] = useState(false);
  const [appSubmitted, setAppSubmitted] = useState(false);

  // Application fields
  const [roleInput, setRoleInput] = useState('');
  const [challengeInput, setChallengeInput] = useState('');
  const [cohortInput, setCohortInput] = useState('Fall 2026 Cohort (Starts Oct 5)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyModalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isApplying, applyModalRef, () => setIsApplying(false));

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleInput || !challengeInput) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setAppSubmitted(true);
    }, 1200);
  };

  const handleResetApp = () => {
    setRoleInput('');
    setChallengeInput('');
    setAppSubmitted(false);
    setIsApplying(false);
  };

  return (
    <div id="accelerator-section" className="space-y-16">
      {/* Editorial Hero Pitch and Side Collaboration Graphics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#006a61] bg-[#89f5e7]/20 px-3 py-1 rounded font-semibold">
              Bootcamp &amp; Intense Cohorts
            </span>
            <span className="font-mono text-[10px] uppercase font-bold text-black border border-black/30 px-2 py-0.5 rounded-full">
              $1,499 per seat
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Build your first inclusive product, service, or AI audit in three weeks.
          </h1>
          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            Join a cohort of dedicated practitioners to systematically embed inclusion into your core technical and strategic workflows.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setIsApplying(true)}
              className="bg-black text-white font-sans text-sm font-semibold h-12 px-8 rounded-xl hover:bg-neutral-800 transition shadow-sm cursor-pointer"
            >
              Apply for the Accelerator
            </button>
            <div className="flex items-center gap-2 text-on-surface-variant font-mono text-xs font-semibold pl-1">
              <Calendar className="w-4 h-4 text-black" />
              <span>Next cohort begins: Oct 5, 2026</span>
            </div>
          </div>
        </div>

        {/* Side illustration of collaboration board */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="aspect-square bg-slate-100 border border-muted-border rounded-xl flex items-center justify-center p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-surface-container-low to-surface-container-highest opacity-70"></div>
            
            {/* Interactive representation of team collaboration */}
            <div className="relative w-full h-full flex flex-col justify-between p-4">
              <div className="flex justify-between items-center border-b border-muted-border pb-3">
                <span className="font-mono text-[10px] uppercase font-extrabold text-black">Workspace Audit Whiteboard</span>
                <Users className="w-4 h-4 text-black" aria-hidden="true" />
              </div>

              {/* Dynamic whiteboard layout elements */}
              <div className="grid grid-cols-2 gap-4 my-auto">
                <div className="bg-amber-100/80 border border-amber-300 p-4 rounded-lg transform -rotate-2 hover:rotate-0 transition-transform shadow-xs">
                  <span className="font-mono text-[9px] text-amber-800 uppercase font-black block">Challenge</span>
                  <p className="font-sans text-[11px] text-amber-950 font-bold mt-1">Algorithmic risk evaluation</p>
                </div>
                <div className="bg-emerald-100/80 border border-emerald-300 p-4 rounded-lg transform rotate-2 hover:rotate-0 transition-transform shadow-xs">
                  <span className="font-mono text-[9px] text-emerald-800 uppercase font-black block">Deliverable</span>
                  <p className="font-sans text-[11px] text-emerald-950 font-bold mt-1">Custom ROI Dashboard</p>
                </div>
              </div>

              <div className="border-t border-muted-border pt-3 flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase font-bold text-[#006a61]">3 interactive weeks</span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "Who this is for" bento blocks */}
      <div className="space-y-8">
        <h2 className="font-display text-2xl font-extrabold text-black text-center md:text-left">
          Is This Accelerator Right For You?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-muted-border hover:border-black transition-colors duration-300 space-y-4 shadow-3xs">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-black" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-black">
              Practitioners
            </h3>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Designers, engineers, and researchers looking to operationalize inclusive frameworks directly into daily deliverables and code bases.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-muted-border hover:border-black transition-colors duration-300 space-y-4 shadow-3xs">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-black" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-black">
              Advocates
            </h3>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Internal champions who need structured methodologies to prove return on investment and scale inclusive practices across departments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-muted-border hover:border-black transition-colors duration-300 space-y-4 shadow-3xs">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
              <Compass className="w-5 h-5 text-black" aria-hidden="true" />
            </div>
            <h3 className="font-display text-lg font-bold text-black">
              Product Managers
            </h3>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Strategic leaders responsible for mitigating generative AI risk, assessing legal compliance guidelines, and finding authentic market fit.
            </p>
          </div>
        </div>
      </div>

      {/* Three-Week Interactive Curriculum Accordions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
        {/* Accordion column */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-display text-2xl font-bold text-black mb-6">
            The Three-Week Curriculum
          </h3>

          <div className="space-y-4">
            {ACCELERATOR_WEEKS.map((item) => {
              const isOpen = activeWeek === item.week;

              return (
                <div
                  key={item.week}
                  className="bg-white rounded-xl border border-muted-border overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveWeek(isOpen ? null : item.week)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 flex justify-between items-center cursor-pointer hover:bg-neutral-50/50"
                  >
                    <div className="flex gap-4 items-center pr-4">
                      <span className="font-mono text-sm font-bold text-neutral-400 bg-neutral-100 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                        {item.week}
                      </span>
                      <span className="font-display text-base font-bold text-black leading-tight">
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 border-t border-muted-border space-y-4">
                          <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-4">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap gap-4 pt-2">
                            <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-lg flex items-center gap-2 shrink-0">
                              <FileText className="w-4 h-4 text-neutral-600" aria-hidden="true" />
                              <div className="font-sans text-[10px]">
                                <span className="text-neutral-400 block font-mono font-bold uppercase">Weekly Deliverable</span>
                                <span className="text-black font-semibold">{item.deliverable}</span>
                              </div>
                            </div>

                            <div className="bg-neutral-50 border border-neutral-200 p-3 rounded-lg flex items-center gap-2 shrink-0">
                              <CheckSquare className="w-4 h-4 text-neutral-600" aria-hidden="true" />
                              <div className="font-sans text-[10px]">
                                <span className="text-neutral-400 block font-mono font-bold uppercase">Focus Area</span>
                                <span className="text-black font-semibold">{item.focusArea}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Informational Callout Column */}
        <div className="lg:col-span-5 bg-white p-8 rounded-xl border border-muted-border space-y-6">
          <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-lg flex gap-3">
            <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" aria-hidden="true" />
            <div className="font-sans text-xs">
              <span className="font-bold text-black block mb-1">Official Lab Credentials</span>
              <p className="text-neutral-600 leading-relaxed">
                Successful graduates of the Accelerator program receive an Accredited Inclusive Systems Architect credential, searchable globally.
              </p>
            </div>
          </div>

          <h4 className="font-display text-lg font-bold text-black">
            What is Included?
          </h4>

          <ul className="space-y-4">
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
              <span><strong>3 x 90-Minute Lectures</strong> with expert practitioners</span>
            </li>
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
              <span><strong>Weekly peer-review squads</strong> of &lt;4 individuals</span>
            </li>
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
              <span><strong>1-on-1 Office Hours</strong> with the primary instructors</span>
            </li>
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></span>
              <span><strong>Lifetime community access</strong> post-graduation</span>
            </li>
          </ul>

          <button
            onClick={() => setIsApplying(true)}
            className="w-full h-11 bg-black text-white hover:bg-neutral-800 font-sans text-xs font-bold rounded-lg transition mt-4"
          >
            Apply for Accelerator Enrollment
          </button>
        </div>
      </div>

      {/* Cohort Application Wizard Overlay */}
      <AnimatePresence>
        {isApplying && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setIsApplying(false)}
          >
            <motion.div
              ref={applyModalRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-cohort-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-2xl border-2 border-black p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl"
            >
              {appSubmitted ? (
                <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#006a61] text-white flex items-center justify-center animate-bounce shadow-md">
                    <Send className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 id="modal-cohort-title" className="font-display text-xl font-bold text-black">Application Received!</h3>
                  <div className="font-sans text-xs text-on-surface-variant max-w-sm leading-relaxed space-y-2">
                    <p>
                      Thank you for applying to the Inclusive Tech Accelerator. Your details have been queued for intake evaluation.
                    </p>
                    <div className="bg-neutral-50 border border-neutral-300 p-3 rounded text-left font-mono text-[10px] space-y-1">
                      <div><strong className="text-black">Cohort:</strong> {cohortInput}</div>
                      <div><strong className="text-black">Dossier ID:</strong> LAB-ACC-{Math.floor(100000 + Math.random() * 900000)}</div>
                      <div><strong className="text-black">Decision Target:</strong> Within 3 Business Days</div>
                    </div>
                  </div>
                  <button
                    onClick={handleResetApp}
                    className="h-10 px-6 rounded-lg bg-black hover:bg-neutral-800 text-white font-sans text-xs font-bold transition mt-4"
                  >
                    Finish &amp; Close Workspace
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center border-b border-muted-border pb-4">
                    <div className="flex items-center gap-2">
                      <UsersRound className="w-5 h-5 text-black" aria-hidden="true" />
                      <span id="modal-cohort-title" className="font-mono text-xs uppercase font-extrabold tracking-wider text-black font-semibold">
                        Cohort Dossier Form
                      </span>
                    </div>
                    <button
                      onClick={() => setIsApplying(false)}
                      aria-label="Close application modal"
                      className="p-1 hover:bg-neutral-100 rounded text-neutral-500 hover:text-black transition cursor-pointer"
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-black font-semibold mb-1" htmlFor="cohort">
                        Select Target Attendance
                      </label>
                      <select
                        id="cohort"
                        required
                        value={cohortInput}
                        onChange={(e) => setCohortInput(e.target.value)}
                        className="w-full h-11 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-xs font-semibold cursor-pointer"
                      >
                        <option value="Fall 2026 Cohort (Starts Oct 5)">Fall 2026 Cohort (Starts Oct 5) — Limited seats</option>
                        <option value="Winter 2027 Cohort (Starts Jan 25)">Winter 2027 Cohort (Starts Jan 25) — Open</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-black font-semibold mb-1" htmlFor="app-role">
                        What is your specific role or department?
                      </label>
                      <input
                        id="app-role"
                        type="text"
                        required
                        placeholder="e.g. Senior UX Architect / Lead QA Engineer"
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        className="w-full h-11 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-black font-semibold mb-1" htmlFor="app-challenge">
                        Describe one major product exclusion or audit difficulty you are currently facing:
                      </label>
                      <textarea
                        id="app-challenge"
                        required
                        rows={3}
                        placeholder="e.g. Assessing bias in machine learning datasets used for recruiting, or lack of structured testing guidelines during design..."
                        value={challengeInput}
                        onChange={(e) => setChallengeInput(e.target.value)}
                        className="w-full p-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-xs font-semibold resize-none"
                      />
                    </div>

                    <p className="font-sans text-[10px] text-neutral-500 leading-relaxed bg-[#89f5e7]/10 p-3 rounded border border-emerald-500/10">
                      Our review process ensures cohort diversity. Applicants are selected to balance corporate roles, geographical contexts, and design challenges.
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 bg-black hover:bg-neutral-800 text-white font-sans text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                          Submitting Application Review...
                        </>
                      ) : (
                        <>
                          Submit Cohort Application
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
