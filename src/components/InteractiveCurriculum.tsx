/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Lock, Eye, Download, Play, Pause, RefreshCw, Star, Info, X, DollarSign, Award, Grid3X3, BookOpen } from 'lucide-react';
import { CURRICULUM_MODULES } from '../data';
import { CurriculumModule } from '../types';
import useFocusTrap from './useFocusTrap';

export default function InteractiveCurriculum() {
  const [unlocked, setUnlocked] = useState(false);
  const [selectedModule, setSelectedModule] = useState<CurriculumModule | null>(null);
  const [checkoutMo, setCheckoutMo] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Video mockup playing status
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(35);

  // Checkout inputs
  const [emailInput, setEmailInput] = useState('');
  const [cardNumInput, setCardNumInput] = useState('');
  const [showSandbox, setShowSandbox] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  useFocusTrap(!!selectedModule, drawerRef, () => setSelectedModule(null));
  useFocusTrap(checkoutMo, checkoutRef, () => setCheckoutMo(false));

  const stripePaymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || 'https://buy.stripe.com/test_6oE5mcb4W33i61q5kk';

  const purchaseCompleteSystem = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      setUnlocked(true);
      setTimeout(() => {
        setCheckoutMo(false);
        setPaymentSuccess(false);
      }, 2000);
    }, 1500);
  };

  const handleDownload = (artifactName: string) => {
    if (!unlocked && selectedModule?.id !== '01') {
      setCheckoutMo(true);
      return;
    }
    // Simulate high-fidelity file generation & download
    const element = document.createElement("a");
    const file = new Blob([
      `INCLUSIVE PRACTICE LAB - OFFICIAL CURRICULUM TEMPLATE\n` +
      `======================================================\n\n` +
      `Artifact: ${artifactName}\n` +
      `Module Reference: Module ${selectedModule?.id} - ${selectedModule?.title}\n` +
      `Authorized User: Lifetime Lab Member\n\n` +
      `This operational sheet serves to help designers, researchers, product managers,\n` +
      `and engineers turn inclusive design values into concrete tactical metrics.\n\n` +
      `[INSTRUCTIONS]\n` +
      `1. Distribute this template within your collaborative tools.\n` +
      `2. Set up a bi-weekly review checkpoint with your cross-functional leads.\n` +
      `3. Incorporate these checklist items into your final QA handoff files.\n\n` +
      `(C) Inclusive Tech Club. All Rights Reserved.`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${artifactName.replace(/\s+/g, '_')}_Template.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-16">
      {/* Upper Pitch and Stack Blueprint Illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-[#006a61] bg-[#89f5e7]/20 px-3 py-1 rounded font-semibold">
            The Inclusive Tech Practice System
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Turn inclusive design values into product decisions, audits, and workflows.
          </h1>
          <p className="font-sans text-base text-on-surface-variant leading-relaxed">
            A rigorous, self-paced curriculum designed for practitioners who want to move beyond theory. Equip yourself with the exact frameworks, checklists, and audit worksheets needed to build strategic clarity and equitable products.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {!unlocked ? (
              <button
                onClick={() => setCheckoutMo(true)}
                className="bg-black text-white font-sans text-sm font-semibold px-8 py-4 rounded-xl hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:ring-offset-2 transition-all cursor-pointer flex items-center gap-2"
              >
                Get the Complete System
              </button>
            ) : (
              <div className="bg-emerald-600/10 border border-emerald-500/20 text-emerald-800 px-6 py-4 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                <span className="font-sans text-sm font-semibold">Lifetime Access Unlocked ✓</span>
              </div>
            )}
            <a
              href="#curriculum-and-outputs"
              className="bg-white text-black border border-black font-sans text-sm font-semibold px-8 py-4 rounded-xl hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:ring-offset-2 transition-all text-center"
            >
              View Curriculum
            </a>
          </div>
        </div>

        {/* Isometric stacked blueprint diagram in HTML */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="aspect-square bg-slate-100 border border-muted-border rounded-xl flex items-center justify-center p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-surface-container-low to-surface-container-highest opacity-70"></div>
            
            {/* High fidelity interactive layered illustration */}
            <div className="relative w-full h-full flex flex-col justify-center items-center">
              {/* Layer 3 - Top */}
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -24, rotate: -2 }}
                className="w-4/5 bg-white border-2 border-black p-4 rounded-lg shadow-sm z-30 transition-transform duration-300 transform -translate-y-4"
              >
                <div className="flex justify-between items-center border-b border-muted-border pb-2 mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#006a61]">Maturity Path</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                </div>
                <div className="h-3 w-3/4 bg-neutral-200 rounded mb-2"></div>
                <div className="h-2 w-1/2 bg-neutral-150 rounded"></div>
              </motion.div>

              {/* Layer 2 - Middle */}
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ scale: 1.02 }}
                className="w-4/5 bg-neutral-50 border border-neutral-300 p-4 rounded-lg shadow-xs z-20 absolute transform translate-y-10 scale-95"
              >
                <div className="h-3 w-1/2 bg-neutral-200 rounded mb-2"></div>
                <div className="h-2 w-2/3 bg-neutral-150 rounded"></div>
              </motion.div>

              {/* Layer 1 - Bottom */}
              <motion.div
                className="w-4/5 bg-neutral-100 border border-neutral-300 p-4 rounded-lg shadow-xs z-10 absolute transform translate-y-20 scale-90"
              >
                <div className="h-3 w-1/3 bg-neutral-200 rounded mb-2"></div>
                <div className="h-2 w-1/2 bg-neutral-150 rounded"></div>
              </motion.div>

              {/* Center Icon */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <BookOpen className="w-5 h-5 text-black" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-black font-extrabold">Active Practice System</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum & Outputs grid section */}
      <div id="curriculum-and-outputs" className="space-y-12">
        <div className="text-center md:text-left">
          <h2 className="font-display text-3xl font-extrabold text-black mb-4">
            Curriculum &amp; Outputs
          </h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            10 foundational modules designed to operationalize inclusion. Every module delivers concrete artifacts to integrate directly into your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CURRICULUM_MODULES.map((mod, index) => {
            const isFirst = index === 0;
            const isLocked = !unlocked && !isFirst;

            return (
              <div
                key={mod.id}
                onClick={() => {
                  setSelectedModule(mod);
                  setIsVideoPlaying(false);
                }}
                className={`relative bg-white p-8 rounded-xl border border-muted-border transition-all duration-300 cursor-pointer hover:border-black flex flex-col justify-between group ${
                  selectedModule?.id === mod.id ? 'ring-2 ring-black' : ''
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-mono text-sm uppercase bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {mod.id}
                    </span>
                    {isLocked ? (
                      <span className="font-mono text-[10px] uppercase flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-bold">
                        <Lock className="w-3 h-3" aria-hidden="true" />
                        Premium
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] uppercase flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                        <Eye className="w-3 h-3" aria-hidden="true" />
                        Explore
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-bold text-black mb-3 group-hover:text-[#006a61] transition-colors">
                    {mod.title}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-3 mb-6">
                    {mod.shortDescription}
                  </p>
                </div>

                <div className="border-t border-muted-border pt-4">
                  <span className="font-mono text-[10px] font-bold text-neutral-400 block mb-2 uppercase tracking-wider">
                    Output Artifacts:
                  </span>
                  <ul className="space-y-1">
                    {mod.outputs.slice(0, 2).map((out, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-mono text-[11px] text-black">
                        <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" aria-hidden="true"></span>
                        <span className="truncate">{out}</span>
                      </li>
                    ))}
                    {mod.outputs.length > 2 && (
                      <li className="font-mono text-[10px] text-neutral-400 italic pl-3">
                        + {mod.outputs.length - 2} more outputs...
                      </li>
                    )}
                  </ul>

                  {isFirst || !isLocked ? (
                    <button className="font-sans text-xs font-bold text-black flex items-center gap-1 mt-6 group-hover:translate-x-1 transition-transform">
                      Unlock Module &amp; Materials <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCheckoutMo(true);
                      }}
                      className="font-sans text-xs font-bold text-neutral-400 hover:text-black flex items-center gap-1 mt-6"
                    >
                      Unlock Premium <Lock className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Module Overview Drawer/Modal */}
      <AnimatePresence>
        {selectedModule && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              ref={drawerRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="w-full max-w-2xl bg-white h-screen overflow-y-auto p-8 md:p-12 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-8">
                {/* Close & Title */}
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase bg-black text-white px-3 py-1 rounded font-bold">
                      Module {selectedModule.id} Overview
                    </span>
                    <h3 id="drawer-title" className="font-display text-2xl font-bold text-black mt-2">
                      {selectedModule.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedModule(null)}
                    aria-label="Close module overview dialog"
                    className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-500 hover:text-black transition cursor-pointer"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Status alert */}
                {!unlocked && selectedModule.id !== '01' ? (
                  <div className="bg-amber-50 border border-amber-300 p-4 rounded-lg flex items-start gap-3">
                    <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <h4 className="font-sans text-sm font-bold text-amber-950">Premium Locked</h4>
                      <p className="font-sans text-xs text-amber-900 leading-relaxed">
                        To access this module&apos;s lectures, exercises, and official checklists, checkout "The Complete System".
                      </p>
                      <button
                        onClick={() => {
                          setSelectedModule(null);
                          setCheckoutMo(true);
                        }}
                        className="font-sans text-xs font-bold text-amber-950 underline hover:text-black block"
                      >
                        Enroll Now for Lifetime Access
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <h4 className="font-sans text-sm font-bold text-emerald-950">Lab Verified</h4>
                      <p className="font-sans text-xs text-emerald-900 leading-relaxed">
                        You have unlocked all files. Review full checklist items below and download raw templates.
                      </p>
                    </div>
                  </div>
                )}

                {/* Short narrative */}
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  {selectedModule.longDescription}
                </p>

                {/* Educational Video mockup block */}
                <div className="relative aspect-video bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 flex flex-col justify-between p-4 shadow-inner group">
                  <div className="flex justify-between items-center z-10">
                    <span className="font-mono text-[9px] uppercase font-semibold text-white bg-black/60 px-2 py-1 rounded">
                      Practice Lecture: Module {selectedModule.id}
                    </span>
                    <span className="font-mono text-[9px] uppercase font-semibold text-neutral-400">
                      Duration: {selectedModule.duration}
                    </span>
                  </div>

                  {/* Play representation */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-all">
                    {(!unlocked && selectedModule.id !== '01') ? (
                      <div className="text-center space-y-2">
                        <Lock className="w-10 h-10 text-white/50 mx-auto" aria-hidden="true" />
                        <span className="font-mono text-[10px] font-bold uppercase text-white/80 tracking-wider">Premium Lock</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                        aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                        className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition shadow-lg cursor-pointer"
                      >
                        {isVideoPlaying ? <Pause className="w-6 h-6 ml-0" aria-hidden="true" /> : <Play className="w-6 h-6 ml-1" aria-hidden="true" />}
                      </button>
                    )}
                  </div>

                  {/* Play video timelines */}
                  <div className="space-y-2 z-10 w-full bg-gradient-to-t from-black/80 to-transparent p-2 rounded-b">
                    <div className="h-1.5 w-full bg-neutral-700 rounded-full overflow-hidden cursor-pointer" aria-label="Video timeline slider" role="progressbar" aria-valuenow={videoProgress}>
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${videoProgress}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center text-white/70 text-[95px] font-mono select-none">
                      <span className="text-[10px]">03:15 / 12:40</span>
                      <span className="text-[10px]">HD Quality</span>
                    </div>
                  </div>
                </div>

                {/* Checklists */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-black font-semibold">Course Checklist:</h4>
                  <ul className="space-y-2">
                    {selectedModule.checklist.map((item, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-xs font-sans text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables lists & Download */}
                <div className="space-y-3 pt-4 border-t border-muted-border">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-black font-semibold">Included Resource Materials:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedModule.outputs.map((out, idx) => {
                      const isDisabled = !unlocked && selectedModule.id !== '01';

                      return (
                        <div
                          key={idx}
                          className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 flex justify-between items-center group/item hover:border-black transition"
                        >
                          <div className="truncate pr-2">
                            <span className="font-mono text-[9px] uppercase text-neutral-400 block font-bold">Artifact Template:</span>
                            <span className="font-sans text-xs font-bold text-black truncate block">{out}</span>
                          </div>
                          <button
                            onClick={() => handleDownload(out)}
                            disabled={isDisabled}
                            aria-label={`Download ${out} template`}
                            className={`p-2 rounded-md transition ${
                              isDisabled
                                ? 'bg-neutral-200/50 text-neutral-400 cursor-not-allowed'
                                : 'bg-black text-white hover:bg-neutral-800'
                            }`}
                          >
                            <Download className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Close Bottom element */}
              <button
                onClick={() => setSelectedModule(null)}
                className="w-full bg-black text-white h-11 rounded-lg font-sans text-xs font-bold mt-8"
              >
                Return to Syllabus Directory
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Invest in Your Practice Block styling */}
      <div className="bg-neutral-100 py-16 px-6 md:px-12 rounded-3xl border border-muted-border flex flex-col items-center text-center space-y-8">
        <div className="space-y-2">
          <h2 className="font-display text-3xl font-extrabold text-black">
            Invest in Your Practice
          </h2>
          <p className="font-sans text-sm text-on-surface-variant max-w-2xl leading-relaxed">
            One-time payment. Lifetime access. Immediate impact on your product decisions.
          </p>
        </div>

        {/* Pricing card */}
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border-2 border-black text-left space-y-6 shadow-md">
          <div className="flex justify-between items-start border-b border-muted-border pb-6">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-[#006a61] tracking-widest block mb-1">
                LIFETIME ACCESS
              </span>
              <h3 className="font-display text-2xl font-bold text-black leading-tight">
                The Complete System
              </h3>
            </div>
            <div className="text-right">
              <span className="font-display text-4xl font-extrabold text-black block leading-tight">
                $249
              </span>
              <span className="font-mono text-[9px] uppercase text-neutral-400 block tracking-widest mt-1">
                USD / One-time
              </span>
            </div>
          </div>

          <ul className="space-y-4">
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Access to all 10 self-paced modules and checklists</span>
            </li>
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Downloadable audit worksheets &amp; core templates</span>
            </li>
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Private community forum access for peer reviews</span>
            </li>
            <li className="flex gap-3 items-start text-xs font-sans text-neutral-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Future content updates included securely</span>
            </li>
          </ul>

          {!unlocked ? (
            <button
              onClick={() => setCheckoutMo(true)}
              className="w-full h-12 rounded-xl bg-black hover:bg-neutral-800 text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              Get the Complete System
            </button>
          ) : (
            <div className="w-full h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-800 font-sans text-sm font-semibold flex items-center justify-center gap-2">
              Unlocked &amp; Ready ✓
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal Overlay simulation */}
      <AnimatePresence>
        {checkoutMo && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4"
            onClick={() => setCheckoutMo(false)}
          >
            <motion.div
              ref={checkoutRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-2xl border-2 border-black p-6 md:p-8 space-y-6 relative overflow-hidden shadow-2xl"
            >
              {paymentSuccess && (
                <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center animate-bounce mb-2 shadow-md">
                    <Award className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-black">Enrollment Complete!</h3>
                  <p className="font-sans text-xs text-on-surface-variant max-w-sm leading-relaxed">
                    Welcome to the Academy Lab. You have successfully unlocked lifetime premium access. Returning to curriculum overview.
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center border-b border-muted-border pb-4">
                <div className="flex items-center gap-2">
                  <Grid3X3 className="w-5 h-5 text-black" aria-hidden="true" />
                  <span id="checkout-title" className="font-mono text-xs uppercase font-extrabold tracking-wider text-black">Practice Checkout</span>
                </div>
                <button
                  onClick={() => setCheckoutMo(false)}
                  aria-label="Close checkout modal"
                  className="p-1 hover:bg-neutral-100 rounded text-neutral-500 hover:text-black transition cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-2 border-b border-muted-border pb-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 block font-bold">Billing Details:</span>
                <div className="flex justify-between items-center">
                  <span className="font-sans text-sm font-bold text-black">System Enrollment License</span>
                  <span className="font-display text-sm font-extrabold text-black">$249.00</span>
                </div>
              </div>

              {/* Option A: Stripe Payment Link (Hosted Checkout) */}
              <div className="space-y-3">
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 block font-bold">Option 1: Live Payment</span>
                <a
                  href={stripePaymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-xl bg-[#006a61] hover:bg-[#00524b] text-white font-sans text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm cursor-pointer text-center"
                >
                  <DollarSign className="w-4 h-4" aria-hidden="true" />
                  Proceed to Secure Checkout (Stripe)
                </a>
                <span className="font-sans text-[10px] text-neutral-500 block text-center">
                  Checkout securely in a new tab via Stripe hosted checkout page.
                </span>
              </div>

              {/* Option B: Sandbox Simulation */}
              <div className="border-t border-muted-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Option 2: Offline Sandbox Test</span>
                  <button
                    type="button"
                    onClick={() => setShowSandbox(!showSandbox)}
                    aria-expanded={showSandbox}
                    aria-controls="sandbox-form-container"
                    className="font-sans text-[11px] text-black font-semibold hover:underline"
                  >
                    {showSandbox ? 'Hide Simulator' : 'Show Simulator'}
                  </button>
                </div>

                <AnimatePresence>
                  {showSandbox && (
                    <motion.div
                      id="sandbox-form-container"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <form onSubmit={purchaseCompleteSystem} className="space-y-4 pt-1">
                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-black font-semibold mb-1" htmlFor="checkout-email">
                            Primary Account Email
                          </label>
                          <input
                            id="checkout-email"
                            type="email"
                            required
                            placeholder="account@company.com"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            className="w-full h-11 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-[10px] uppercase tracking-wider text-black font-semibold mb-1" htmlFor="checkout-card">
                            Mock Card Credentials
                          </label>
                          <input
                            id="checkout-card"
                            type="text"
                            required
                            placeholder="4000 1234 5678 9010"
                            maxLength={19}
                            value={cardNumInput}
                            onChange={(e) => setCardNumInput(e.target.value)}
                            className="w-full h-11 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-xs font-semibold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-wider text-black font-semibold mb-1">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="MM/YY"
                              maxLength={5}
                              className="w-full h-11 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block font-mono text-[10px] uppercase tracking-wider text-black font-semibold mb-1">
                              Secure CVV
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="***"
                              maxLength={4}
                              className="w-full h-11 px-4 border border-outline/30 rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-focus-indicator focus:border-transparent font-sans text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <div className="flex items-start gap-2 bg-neutral-50 p-3 rounded border border-neutral-200">
                          <Info className="w-4 h-4 text-neutral-655 shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="font-sans text-[10px] text-neutral-600 leading-relaxed">
                            No real funds are charged during this sandbox test.
                          </span>
                        </div>

                        <button
                          type="submit"
                          disabled={isPaying}
                          className="w-full h-11 bg-black hover:bg-neutral-800 text-white font-sans text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition"
                        >
                          {isPaying ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                              Authorizing Secured Transaction...
                            </>
                          ) : (
                            <>
                              <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
                              Authorize &amp; Purchase (Sandbox)
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
