import { ChartColumn, Languages, Scale } from 'lucide-react';

export const GEMINI_MODEL = 'gemini-3-flash-preview';

export const STAGES_CONFIG = [
  {
    id: 'anatomy',
    title: 'Etapa 1: Anatomía',
    subtitle: '¿Qué son los Tokens?',
    icon: Scale
  },
  {
    id: 'inequity',
    title: 'Etapa 2: Inequidad',
    subtitle: 'El Costo del Idioma',
    icon: Languages
  },
  {
    id: 'asymmetry',
    title: 'Etapa 3: Asimetría',
    subtitle: 'Entrada vs. Salida',
    icon: ChartColumn
  }
];
