import React, { useState, useEffect } from 'react';
import { RefreshCw, Info } from 'lucide-react';
import { TokenSimulationResult } from '../types';

// Simulation logic based on the PDF guide descriptions
const simulateWordTokenizer = (text: string): TokenSimulationResult => {
  const segments = text.split(/(\s+|[.,;!?])/).filter(Boolean);
  return {
    segments,
    count: segments.length,
    description: "Por Palabra: Divide por espacios o puntuación. Ineficiente para palabras raras."
  };
};

const simulateFixedCharTokenizer = (text: string, n: number = 4): TokenSimulationResult => {
  const segments = [];
  for (let i = 0; i < text.length; i += n) {
    segments.push(text.substring(i, i + n));
  }
  return {
    segments,
    count: segments.length,
    description: "Por Carácter Fijo (ej. cada 4 letras): Ignora significado, granularidad pequeña."
  };
};

// Simulated BPE: Splits long complex words, keeps short ones whole
const simulateSubWordTokenizer = (text: string): TokenSimulationResult => {
  const words = text.split(/(\s+)/);
  const segments: string[] = [];
  
  words.forEach(word => {
    if (word.length > 5 && !word.match(/^\s+$/)) {
      // Simple heuristic simulation of BPE: split common roots/suffixes
      const mid = Math.floor(word.length / 2);
      segments.push(word.slice(0, mid));
      segments.push(word.slice(mid));
    } else if (word.length > 0) {
      segments.push(word);
    }
  });

  return {
    segments,
    count: segments.length,
    description: "Por Subpalabra (Simulación BPE): Eficiencia semántica. Palabras comunes enteras, raras divididas."
  };
};

const Stage1Anatomy: React.FC = () => {
  const [inputText, setInputText] = useState("El arte digital requiere una tokenización eficiente");
  const [wordData, setWordData] = useState<TokenSimulationResult | null>(null);
  const [charData, setCharData] = useState<TokenSimulationResult | null>(null);
  const [bpeData, setBpeData] = useState<TokenSimulationResult | null>(null);

  useEffect(() => {
    setWordData(simulateWordTokenizer(inputText));
    setCharData(simulateFixedCharTokenizer(inputText));
    setBpeData(simulateSubWordTokenizer(inputText));
  }, [inputText]);

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">1. La Anatomía del Texto</h2>
        <p className="text-lg text-slate-400">
          Descubre cómo las máquinas leen: de texto humano a <strong>tokens</strong> discretos.
        </p>
      </header>

      {/* Educational Context */}
      <div className="bg-blue-950/30 border-l-4 border-blue-500 p-4 rounded shadow-sm">
        <div className="flex items-start">
          <Info className="w-6 h-6 text-blue-400 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-200">Concepto Fundamental</h3>
            <p className="text-blue-300 text-sm mt-1">
              Un <strong>token</strong> no siempre es una palabra. Es la unidad atómica de procesamiento.
              El estándar de la industria es <strong>BPE (Byte Pair Encoding)</strong>, que busca el equilibrio
              entre vocabulario y flexibilidad.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Input */}
      <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Escribe una frase para tokenizar:
        </label>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 pr-12 border border-slate-700 bg-slate-950 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-24 text-lg font-mono text-slate-200 placeholder-slate-600"
            placeholder="Escribe algo aquí..."
          />
          <RefreshCw className="absolute top-4 right-4 w-5 h-5 text-slate-500" />
        </div>
      </div>

      {/* Tokenizers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Word Tokenizer */}
        <TokenizerCard 
          title="Por Palabra (Espacios)" 
          data={wordData} 
          colorClass="bg-red-900/30 text-red-200 border-red-800" 
        />

        {/* Fixed Char Tokenizer */}
        <TokenizerCard 
          title="Por Carácter Fijo (4 chars)" 
          data={charData} 
          colorClass="bg-yellow-900/30 text-yellow-200 border-yellow-800" 
        />

        {/* Subword Tokenizer */}
        <TokenizerCard 
          title="Por Subpalabra (BPE/LLM)" 
          data={bpeData} 
          colorClass="bg-green-900/30 text-green-200 border-green-800"
          isRecommended
        />

      </div>
    </div>
  );
};

const TokenizerCard: React.FC<{ 
  title: string; 
  data: TokenSimulationResult | null; 
  colorClass: string;
  isRecommended?: boolean;
}> = ({ title, data, colorClass, isRecommended }) => {
  if (!data) return null;

  return (
    <div className={`relative flex flex-col h-full bg-slate-900 rounded-xl border-2 ${isRecommended ? 'border-green-500/50 ring-4 ring-green-900/20' : 'border-slate-800'} shadow-sm transition-all hover:shadow-md hover:border-slate-700`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ESTÁNDAR INDUSTRIA
        </div>
      )}
      <div className="p-4 border-b border-slate-800 bg-slate-800/50 rounded-t-xl">
        <h4 className="font-bold text-slate-200">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 h-10">{data.description}</p>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex flex-wrap gap-1.5">
          {data.segments.map((seg, idx) => (
            <span 
              key={idx} 
              className={`inline-block px-2 py-1 rounded text-sm font-mono border ${colorClass}`}
            >
              {seg.replace(/\s/g, '␣')}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 bg-slate-800/50 border-t border-slate-800 rounded-b-xl flex justify-between items-center">
        <span className="text-xs text-slate-500 uppercase font-semibold">Total Tokens</span>
        <span className="text-xl font-bold text-slate-100">{data.count}</span>
      </div>
    </div>
  );
};

export default Stage1Anatomy;