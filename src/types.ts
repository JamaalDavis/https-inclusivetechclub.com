/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveView = 'home' | 'blueprint' | 'curriculum' | 'accelerator';

export type FocusArea = 'strategy' | 'operations' | 'growth' | '';

export interface UserData {
  firstName: string;
  email: string;
  focusArea: FocusArea;
  updates: boolean;
}

export interface CurriculumModule {
  id: string; // "01", "02", etc.
  title: string;
  shortDescription: string;
  longDescription: string;
  outputs: string[];
  duration: string;
  videoUrl?: string;
  checklist: string[];
}

export interface AcceleratorWeek {
  week: number;
  title: string;
  description: string;
  deliverable: string;
  focusArea: string;
}

export interface PracticeStage {
  id: string;
  title: string;
  description: string;
  keySignals: string[];
  remediationSystems: string[];
}
