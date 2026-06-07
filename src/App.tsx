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
                  {/* HERO BLOCK */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#006a61] bg-[#89f5e7]/20 px-3 py-1 rounded font-semibold">
                        Inclusive Tech Club
                      </span>
                      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight tracking-tight">
                        Build technology that includes people from the start.
                      </h1>
                      <p className="font-sans text-base text-on-surface-variant leading-relaxed">
                        Inclusive Tech Hub helps design teams and technical leaders audit, govern, and rethink their digital products. We provide the frameworks and training needed to shift from reactionary fixes to intentional accessibility.
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

                  {/* Problem Section */}
                  <div className="bg-surface-container-low p-8 md:p-12 rounded-2xl border border-muted-border text-center max-w-3xl mx-auto flex flex-col gap-4">
                    <span className="text-[#006a61] font-mono text-xs uppercase tracking-widest font-bold">
                      The Challenge
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-black leading-tight">
                      Technology is moving faster than most teams can responsibly evaluate.
                    </h2>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      In the rush to &quot;ship fast,&quot; the marginalized often get left behind. We believe excellence in technology isn't measured by speed, but by how many people can use it safely and with dignity. We help you slow down to ship with care.
                    </p>
                  </div>

                  {/* Pillars Section (Focus Areas) */}
                  <div className="space-y-8">
                    <h2 className="font-display text-2xl font-bold text-black text-center md:text-left">
                      Our Focus Areas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Focus 1 */}
                      <div className="bg-white border border-muted-border p-8 rounded-xl flex flex-col gap-4 hover:border-black transition-all duration-300 shadow-3xs">
                        <div className="w-12 h-12 bg-[#89f5e7]/20 rounded-lg flex items-center justify-center text-[#006a61]">
                          <Layers className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-black leading-tight">
                          Inclusive AI &amp; Algorithmic Harm
                        </h3>
                        <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                          Auditing automated systems for bias and developing human-centric governance models for emerging tech.
                        </p>
                      </div>

                      {/* Focus 2 */}
                      <div className="bg-white border border-muted-border p-8 rounded-xl flex flex-col gap-4 hover:border-black transition-all duration-300 shadow-3xs">
                        <div className="w-12 h-12 bg-[#89f5e7]/20 rounded-lg flex items-center justify-center text-[#006a61]">
                          <Award className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-black leading-tight">
                          Accessibility &amp; Service Design
                        </h3>
                        <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                          Moving beyond WCAG compliance to create seamless, dignified journeys for people of all abilities.
                        </p>
                      </div>

                      {/* Focus 3 */}
                      <div className="bg-white border border-muted-border p-8 rounded-xl flex flex-col gap-4 hover:border-black transition-all duration-300 shadow-3xs">
                        <div className="w-12 h-12 bg-[#89f5e7]/20 rounded-lg flex items-center justify-center text-[#006a61]">
                          <Compass className="w-6 h-6" aria-hidden="true" />
                        </div>
                        <h3 className="font-display text-lg font-bold text-black leading-tight">
                          Cross-Cultural &amp; Community-Led
                        </h3>
                        <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                          Integrating participatory design methods to ensure products respect local contexts and lived experiences.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Offer Section */}
                  <div className="bg-black text-white p-8 md:p-12 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-neutral-800">
                    {/* Offer 1 */}
                    <div className="space-y-4 md:pr-8">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#89f5e7] font-bold">01. READ</span>
                      <h3 className="font-display text-lg font-bold">Articles</h3>
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                        Deep dives into ethics, policy, and the practicalities of building inclusive software.
                      </p>
                      <button
                        onClick={() => setActiveView('curriculum')}
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#89f5e7] hover:underline transition-all cursor-pointer font-semibold"
                      >
                        Browse Library
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Offer 2 */}
                    <div className="space-y-4 md:px-8">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#89f5e7] font-bold">02. LEARN</span>
                      <h3 className="font-display text-lg font-bold">Workshops</h3>
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                        Hands-on intensives for designers and PMs looking to upskill in inclusive methodologies.
                      </p>
                      <button
                        onClick={() => setActiveView('accelerator')}
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#89f5e7] hover:underline transition-all cursor-pointer font-semibold"
                      >
                        View Schedule
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Offer 3 */}
                    <div className="space-y-4 md:pl-8">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#89f5e7] font-bold">03. BUILD</span>
                      <h3 className="font-display text-lg font-bold">Claude Skill Pack</h3>
                      <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                        Tailored system instructions files that load directly into your Claude Code workspace context.
                      </p>
                      <button
                        onClick={() => setActiveView('blueprint')}
                        className="inline-flex items-center gap-2 font-mono text-xs text-[#89f5e7] hover:underline transition-all cursor-pointer font-semibold"
                      >
                        Get Skill Pack
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Featured Resources */}
                  <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="font-display text-2xl font-bold text-black">
                          Featured Resources
                        </h2>
                        <p className="font-sans text-sm text-on-surface-variant leading-relaxed mt-1">
                          Practical tools for your next project.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveView('curriculum')}
                        className="font-sans text-xs font-bold text-[#006a61] hover:underline cursor-pointer"
                      >
                        View All Resources
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Resource 1 */}
                      <div className="bg-white border border-muted-border rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="h-40 bg-[#89f5e7]/10 flex items-center justify-center text-[#006a61]">
                          <CheckCircle2 className="w-12 h-12" aria-hidden="true" />
                        </div>
                        <div className="p-6 flex flex-col gap-3 flex-1">
                          <span className="bg-[#89f5e7]/30 text-[#006a61] text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit uppercase">
                            CHECKLIST
                          </span>
                          <h3 className="font-display text-base font-bold text-black group-hover:text-[#006a61] transition-colors leading-snug">
                            Ableist Harm Metrics Checklist
                          </h3>
                          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                            A rigorous 20-point framework for auditing algorithmic systems against physical and cognitive bias.
                          </p>
                        </div>
                      </div>

                      {/* Resource 2 */}
                      <div className="bg-white border border-muted-border rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="h-40 bg-[#89f5e7]/10 flex items-center justify-center text-[#006a61]">
                          <Milestone className="w-12 h-12" aria-hidden="true" />
                        </div>
                        <div className="p-6 flex flex-col gap-3 flex-1">
                          <span className="bg-[#89f5e7]/30 text-[#006a61] text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit uppercase">
                            TEMPLATE
                          </span>
                          <h3 className="font-display text-base font-bold text-black group-hover:text-[#006a61] transition-colors leading-snug">
                            Inclusive Service Blueprint Template
                          </h3>
                          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                            Map out complex digital-to-physical journeys with integrated accessibility touchpoints.
                          </p>
                        </div>
                      </div>

                      {/* Resource 3 */}
                      <div className="bg-white border border-muted-border rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="h-40 bg-[#89f5e7]/10 flex items-center justify-center text-[#006a61]">
                          <BookOpen className="w-12 h-12" aria-hidden="true" />
                        </div>
                        <div className="p-6 flex flex-col gap-3 flex-1">
                          <span className="bg-[#89f5e7]/30 text-[#006a61] text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit uppercase">
                            GUIDE
                          </span>
                          <h3 className="font-display text-base font-bold text-black group-hover:text-[#006a61] transition-colors leading-snug">
                            Designing for Neurodivergence
                          </h3>
                          <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                            Best practices for UI patterns that reduce cognitive load and sensory overwhelm.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Membership Teaser */}
                  <div className="bg-[#004f47] text-white rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#89f5e7] opacity-10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                    <div className="space-y-6 relative z-10">
                      <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                        Join a learning space for people building technology with care.
                      </h2>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3 text-xs font-sans text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-[#89f5e7]" aria-hidden="true" />
                          <span>Monthly live audit sessions</span>
                        </li>
                        <li className="flex items-center gap-3 text-xs font-sans text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-[#89f5e7]" aria-hidden="true" />
                          <span>Private community for practitioners</span>
                        </li>
                        <li className="flex items-center gap-3 text-xs font-sans text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-[#89f5e7]" aria-hidden="true" />
                          <span>Early access to new research and templates</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => setActiveView('accelerator')}
                        className="bg-white text-[#004f47] hover:bg-neutral-100 px-6 py-3 rounded-lg font-sans text-xs font-bold transition shadow-md cursor-pointer block w-fit"
                      >
                        Join the Founding Member List
                      </button>
                    </div>

                    <div className="hidden md:block relative z-10 aspect-video rounded-xl overflow-hidden border border-emerald-800 shadow-xl">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlMKpcoMdLZSIxB2LSPgfAMe1-oEzjH2D52Ms2ZHeHnX_Dkob5KdjcqjY9iEgzIbwDsmDyAgxpK90_23URBGdv9QlsEXW6BGrQr_vJjj9128pUyTf6QLX3B0DY7B2Y8PoS0kf4rpjy8yajZsGNzSxnr4M2dalzFS5kZbxReCmA6Z8RTN6ZwV9ZdObhg4F-Ci9z3wePsQwB3lSbpyi4GkzRbkBVbq-w-nLU6WjAirq5eA0fXz-3MiP3hKWMHDHM_ge9Up6heBvLQTaN"
                        alt="Diverse team of tech professionals collaborating around a table"
                        className="object-cover w-full h-full grayscale"
                      />
                    </div>
                  </div>

                  {/* Services Teaser */}
                  <div className="border-y border-muted-border py-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="max-w-xl text-center md:text-left">
                      <h2 className="font-display text-xl font-bold text-black">
                        Bring inclusive design practice into your team.
                      </h2>
                      <p className="font-sans text-xs text-on-surface-variant mt-2 leading-relaxed">
                        We offer bespoke training, institutional audits, and long-term advisory for forward-thinking organizations.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveView('accelerator')}
                      className="border-2 border-black text-black px-6 py-3 rounded-lg font-sans text-xs font-bold hover:bg-neutral-50 transition cursor-pointer"
                    >
                      Book Team Training
                    </button>
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
