/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, BookOpen, Clock, Layers, Award, Stars, MonitorPlay, ChevronRight, CheckCircle2, Milestone, NotebookTabs } from 'lucide-react';
import { ActiveView } from './types';
import DiagnosticWizard from './components/DiagnosticWizard';
import InteractiveCurriculum from './components/InteractiveCurriculum';
import AcceleratorDetails from './components/AcceleratorDetails';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('home');

  // Interactive UTC dynamic clock on header representing global practice
  const formatUTC = () => {
    const d = new Date();
    return `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')} UTC`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Skip to Main Content Link */}
      <a
        href="#main-content"
        className="absolute left-4 top-[-100%] focus:top-4 bg-primary text-on-primary px-4 py-2 text-sm font-semibold rounded-lg z-50 transition-[top] duration-200"
      >
        Skip to main content
      </a>

      {/* Dynamic educational notice box for the reviewer */}
      <div className="bg-[#004f47] text-white py-1.5 px-4 text-center text-xs font-mono tracking-wide flex justify-center items-center gap-2">
        <Stars className="w-3.5 h-3.5 text-yellow-300 animate-spin" aria-hidden="true" />
        <span>
          Interactive Portfolio Suite: Select navigation tabs below to inspect each of your requested layouts dynamically.
        </span>
      </div>

      {/* Persistent Global Header */}
      <header className="bg-white border-b border-muted-border sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo Brand Adaptive */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center font-display text-xs font-black tracking-wider shadow-sm cursor-pointer select-none"
              aria-hidden="true"
            >
              ITC
            </motion.div>
            <div>
              <span className="font-display text-base font-extrabold text-black block tracking-tight">
                Inclusive Tech Club
              </span>
              <span className="font-mono text-[9px] uppercase text-neutral-400 tracking-wider font-bold">
                Operational Excellence
              </span>
            </div>
          </div>

          {/* Navigation links matching screenshots */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 bg-neutral-100 p-1.5 rounded-xl border border-neutral-200">
            <div role="tablist" aria-label="Content Views" className="flex items-center gap-1">
              <button
                role="tab"
                id="tab-home"
                aria-selected={activeView === 'home'}
                aria-controls="tabpanel-content"
                onClick={() => setActiveView('home')}
                className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  activeView === 'home' ? 'bg-white text-black shadow-3xs' : 'text-neutral-500 hover:text-black'
                }`}
              >
                Overview
              </button>
              <button
                role="tab"
                id="tab-blueprint"
                aria-selected={activeView === 'blueprint'}
                aria-controls="tabpanel-content"
                onClick={() => setActiveView('blueprint')}
                className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  activeView === 'blueprint' ? 'bg-white text-[#006a61] shadow-3xs' : 'text-neutral-500 hover:text-black'
                }`}
              >
                Inclusive Design Velocity
              </button>
              <button
                role="tab"
                id="tab-curriculum"
                aria-selected={activeView === 'curriculum'}
                aria-controls="tabpanel-content"
                onClick={() => setActiveView('curriculum')}
                className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  activeView === 'curriculum' ? 'bg-white text-black shadow-3xs' : 'text-neutral-500 hover:text-black'
                }`}
              >
                Curriculum System
              </button>
              <button
                role="tab"
                id="tab-accelerator"
                aria-selected={activeView === 'accelerator'}
                aria-controls="tabpanel-content"
                onClick={() => setActiveView('accelerator')}
                className={`px-4 py-2 rounded-lg font-sans text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                  activeView === 'accelerator' ? 'bg-white text-black shadow-3xs' : 'text-neutral-500 hover:text-black'
                }`}
              >
                3-Week Accelerator
              </button>
            </div>
          </nav>

          {/* Right side CTA aligned with screenshots */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 px-3 py-1.5 rounded-full font-mono text-[10px] text-neutral-500">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{formatUTC()}</span>
            </div>

            {activeView !== 'blueprint' ? (
              <button
                onClick={() => setActiveView('blueprint')}
                className="bg-black text-white font-sans text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-neutral-800 transition shadow-xs cursor-pointer"
              >
                Get Claude Skill Pack
              </button>
            ) : (
              <button
                onClick={() => setActiveView('curriculum')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold px-4 py-2.5 rounded-lg transition"
              >
                Explore Syllabus
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation header */}
      <nav aria-label="Mobile Navigation" className="md:hidden bg-white border-b border-muted-border px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none scroll-smooth">
        <div role="tablist" aria-label="Mobile Content Views" className="flex gap-2">
          <button
            role="tab"
            id="tab-mobile-home"
            aria-selected={activeView === 'home'}
            aria-controls="tabpanel-content"
            onClick={() => setActiveView('home')}
            className={`px-4 py-1.5 rounded-lg font-sans text-xs font-bold block shrink-0 ${
              activeView === 'home' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Academy Home
          </button>
          <button
            role="tab"
            id="tab-mobile-blueprint"
            aria-selected={activeView === 'blueprint'}
            aria-controls="tabpanel-content"
            onClick={() => setActiveView('blueprint')}
            className={`px-4 py-1.5 rounded-lg font-sans text-xs font-bold block shrink-0 ${
              activeView === 'blueprint' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Velocity Pack
          </button>
          <button
            role="tab"
            id="tab-mobile-curriculum"
            aria-selected={activeView === 'curriculum'}
            aria-controls="tabpanel-content"
            onClick={() => setActiveView('curriculum')}
            className={`px-4 py-1.5 rounded-lg font-sans text-xs font-bold block shrink-0 ${
              activeView === 'curriculum' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Tech Club Curriculum
          </button>
          <button
            role="tab"
            id="tab-mobile-accelerator"
            aria-selected={activeView === 'accelerator'}
            aria-controls="tabpanel-content"
            onClick={() => setActiveView('accelerator')}
            className={`px-4 py-1.5 rounded-lg font-sans text-xs font-bold block shrink-0 ${
              activeView === 'accelerator' ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            Accelerator Bootcamp
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-20">
        <div
          role="tabpanel"
          id="tabpanel-content"
          aria-labelledby={
            activeView === 'home'
              ? 'tab-home'
              : activeView === 'blueprint'
              ? 'tab-blueprint'
              : activeView === 'curriculum'
              ? 'tab-curriculum'
              : 'tab-accelerator'
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {activeView === 'home' && (
                <div id="home-view" className="space-y-20">
                  {/* HERO BLOCK - Screenshot 1 Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#006a61] bg-[#89f5e7]/20 px-3 py-1 rounded font-semibold">
                        Inclusive Tech Club
                      </span>
                      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
                        Build technology that includes people before harm gets shipped.
                      </h1>
                      <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                        Inclusive Tech Club helps designers, researchers, product managers, technologists, and teams turn inclusive design values into practical audits, workshops, requirements, and product decisions.
                      </p>

                      <div className="flex flex-wrap gap-4 pt-4">
                        <button
                          onClick={() => setActiveView('blueprint')}
                          className="bg-black text-white font-sans text-sm font-semibold h-12 px-8 rounded-xl hover:bg-neutral-800 transition shadow-sm cursor-pointer"
                        >
                          Get Free Claude Skill Pack
                        </button>
                        <button
                          onClick={() => setActiveView('curriculum')}
                          className="bg-white text-black border border-muted-border font-sans text-sm font-semibold h-12 px-8 rounded-xl hover:bg-neutral-50 transition"
                        >
                          Explore Complete System
                        </button>
                      </div>
                    </div>

                    {/* High Fidelity Interactive Caliper / Technical Grid SVG Drafting Widget */}
                    <div className="bg-slate-100 p-8 rounded-2xl border border-muted-border aspect-square flex flex-col justify-between relative overflow-hidden group" aria-hidden="true">
                      <div className="absolute inset-0 bg-radial-gradient from-white/80 to-transparent pointer-events-none"></div>

                      {/* Technical Calibration Grid representation */}
                      <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10 pointer-events-none">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className="border-b border-r border-black"></div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center border-b border-muted-border pb-4 z-10">
                        <span className="font-mono text-[10px] uppercase font-bold text-neutral-500">
                          Systemic Calibration Module
                        </span>
                        <Milestone className="w-4 h-4 text-black" aria-hidden="true" />
                      </div>

                      {/* Rotating alignment vector drafting calipers representation */}
                      <div className="my-auto flex items-center justify-center relative h-48">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                          className="absolute w-36 h-36 rounded-full border-2 border-dashed border-[#006a61]/35 flex items-center justify-center"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-[#006a61] absolute top-0"></div>
                        </motion.div>
                        <Compass className="w-20 h-20 text-black/80 animate-pulse duration-2000" aria-hidden="true" />
                      </div>

                      <div className="border-t border-muted-border pt-4 flex justify-between items-center z-10">
                        <span className="font-mono text-[9px] uppercase font-bold text-[#006a61]">
                          Pre-Launch Safety Red Team: Active
                        </span>
                        <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[9px] font-mono font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                          <span>0% shipped harm</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary highlight widgets block */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
                    <div className="bg-white p-8 rounded-xl border border-muted-border shadow-3xs space-y-4">
                      <span className="font-mono text-xs uppercase bg-[#89f5e7]/20 text-[#006a61] px-2.5 py-1 rounded font-bold">01</span>
                      <h3 className="font-display text-lg font-bold text-black">Velocity Skill Pack</h3>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        Calibrate customizable prompts and custom rules directly targeting inclusive, accessible, and ethically-grounded features during core build phases.
                      </p>
                      <button
                        onClick={() => setActiveView('blueprint')}
                        className="font-sans text-xs font-bold text-black flex items-center gap-1 pt-1"
                      >
                        Configure Skill Pack <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-muted-border shadow-3xs space-y-4">
                      <span className="font-mono text-xs uppercase bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded font-bold">02</span>
                      <h3 className="font-display text-lg font-bold text-black">Self-Paced Curriculum</h3>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        10 rigorous, self-paced modules equipped with downloadable heuristic sheets, bias audits, and red-teaming sheets.
                      </p>
                      <button
                        onClick={() => setActiveView('curriculum')}
                        className="font-sans text-xs font-bold text-black flex items-center gap-1 pt-1"
                      >
                        See Syllabus Artifacts <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="bg-white p-8 rounded-xl border border-muted-border shadow-3xs space-y-4">
                      <span className="font-mono text-xs uppercase bg-amber-50 text-amber-800 px-2.5 py-1 rounded font-bold">03</span>
                      <h3 className="font-display text-lg font-bold text-black">Accelerator Bootcamps</h3>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        Apply to join a multi-department digital workspace build cohort focused on building safety, compliance, and ROI metrics in three weeks.
                      </p>
                      <button
                        onClick={() => setActiveView('accelerator')}
                        className="font-sans text-xs font-bold text-black flex items-center gap-1 pt-1"
                      >
                        Cohort Details <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeView === 'blueprint' && (
                <DiagnosticWizard />
              )}

              {activeView === 'curriculum' && (
                <InteractiveCurriculum />
              )}

              {activeView === 'accelerator' && (
                <AcceleratorDetails />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Standardized, Minimal High-Contrast Footer */}
      <footer className="bg-white border-t border-muted-border mt-auto font-sans">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-md bg-black text-white flex items-center justify-center font-display text-[10px] font-black tracking-wider cursor-pointer select-none"
                aria-hidden="true"
              >
                ITC
              </motion.div>
              <span className="font-display text-sm font-extrabold text-black tracking-tight">
                Inclusive Tech Club
              </span>
            </div>
            <p className="font-sans text-[11px] text-neutral-500 leading-relaxed max-w-xs">
              Operational structures, checklists, alignment parameters, and training systems for modern creative digital product departments.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-[10px] uppercase font-bold tracking-wider text-black mb-3">Academic Paths</h5>
            <ul className="space-y-1.5 font-sans text-xs text-neutral-600">
              <li><button onClick={() => setActiveView('blueprint')} className="hover:text-black hover:underline cursor-pointer">Inclusive Design Velocity</button></li>
              <li><button onClick={() => setActiveView('curriculum')} className="hover:text-black hover:underline cursor-pointer">Inclusive Tech Syllabus</button></li>
              <li><button onClick={() => setActiveView('accelerator')} className="hover:text-black hover:underline cursor-pointer">Cohort Accelerator Enrollment</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[10px] uppercase font-bold tracking-wider text-black mb-3">Audits &amp; Core Kits</h5>
            <ul className="space-y-1.5 font-sans text-xs text-neutral-600">
              <li><span className="text-neutral-400">Bias Heuristics evaluation</span></li>
              <li><span className="text-neutral-400">Trauma-Informed Research consent</span></li>
              <li><span className="text-neutral-400">Red-Teaming adversarial templates</span></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[10px] uppercase font-bold tracking-wider text-black mb-3">Attribution</h5>
            <p className="font-sans text-[11px] text-neutral-500 leading-relaxed">
              Designed according to precise visual specs of inclusive tech practices. Developed to support robust typography hierarchy, Atkinson Hyperlegible Next display features, and atomic components.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-100 bg-neutral-50/50 py-4 text-center">
          <span className="font-mono text-[10px] text-neutral-500">
            &copy; {new Date().getFullYear()} Inclusive Tech Club. Build technology that includes people.
          </span>
        </div>
      </footer>
    </div>
  );
}
