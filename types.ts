export enum AppStage {
  ANATOMY = 'anatomy',
  INEQUITY = 'inequity',
  ASYMMETRY = 'asymmetry'
}

export interface TokenSimulationResult {
  segments: string[];
  count: number;
  description: string;
}

export interface LanguageCostData {
  language: string;
  tokens: number;
  ratio: number;
  costRelative: number; // 1.0 is baseline
}

export interface TranslationResult {
  en: string;
  es: string;
  fr: string;
  zh: string;
}
