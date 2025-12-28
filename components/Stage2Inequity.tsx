import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRightLeft, Loader2, Coins } from 'lucide-react';
import { countTokens, translateForSimulation } from '../services/geminiService';
import { LanguageCostData } from '../types';

const Stage2Inequity: React.FC = () => {
  const [inputText, setInputText] = useState("La inteligencia artificial generativa transforma la creatividad humana.");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<LanguageCostData[]>([]);
  const [translations, setTranslations] = useState<{ [key: string]: string } | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // 1. Get translations
      const trans = await translateForSimulation(inputText);
      setTranslations(trans);

      // 2. Get Baseline English Tokens (N)
      const englishTokens = await countTokens(trans.en);

      // 3. Simulate other languages based on PDF ratios
      const data: LanguageCostData[] = [
        { 
          language: 'Inglés (Base)', 
          tokens: englishTokens, 
          ratio: 1.0, 
          costRelative: 1.0 
        },
        { 
          language: 'Español', 
          tokens: Math.ceil(englishTokens * 1.25), 
          ratio: 1.25, 
          costRelative: 1.25 
        },
        { 
          language: 'Francés', 
          tokens: Math.ceil(englishTokens * 1.05), 
          ratio: 1.05, 
          costRelative: 1.05 
        },
        { 
          language: 'Chino', 
          tokens: Math.ceil(englishTokens * 0.85), 
          ratio: 0.85, 
          costRelative: 0.85 
        },
      ];
      setChartData(data);

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">2. El Sesgo del Tokenizador</h2>
        <p className="text-lg text-slate-400">
          La inequidad lingüística: ¿Por qué hablar en español le cuesta más a la IA?
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input and Explanation */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800">
            <h3 className="font-bold text-slate-200 mb-4 flex items-center">
              <ArrowRightLeft className="w-5 h-5 mr-2 text-indigo-400" />
              Simulador de Costo Multilingüe
            </h3>
            <label className="block text-sm text-slate-400 mb-2">
              Ingresa una frase técnica o creativa:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-3 border border-slate-700 bg-slate-950 rounded-lg h-32 mb-4 focus:ring-2 focus:ring-indigo-500 text-slate-200 placeholder-slate-600"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 transition flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Coins className="w-5 h-5 mr-2" />}
              {loading ? "Analizando con Gemini..." : "Calcular Costo en Tokens"}
            </button>
          </div>

          <div className="bg-orange-900/20 p-5 rounded-lg border-l-4 border-orange-500 text-sm text-orange-200">
            <strong>Nota del Instructor:</strong> El español suele requerir un <strong>25% más de tokens</strong> que el inglés para expresar la misma idea. Esto se traduce directamente en un mayor costo monetario y menor memoria disponible.
          </div>
        </div>

        {/* Right Column: Visualization */}
        <div className="space-y-6">
          {chartData.length > 0 ? (
            <div className="bg-slate-900 p-6 rounded-xl shadow-md border border-slate-800 min-h-[400px]">
              <h4 className="font-bold text-center text-slate-300 mb-6">Comparativa de Tokens por Idioma</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="language" 
                      type="category" 
                      width={80} 
                      style={{ fontSize: '12px', fontWeight: 'bold' }} 
                      tick={{fill: '#94a3b8'}}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value} Tokens`, 'Costo Simulado']}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        borderRadius: '8px', 
                        border: '1px solid #334155', 
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)',
                        color: '#f1f5f9'
                      }}
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    />
                    <Bar dataKey="tokens" radius={[0, 4, 4, 0]} barSize={30}>
                       {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.language.includes('Inglés') ? '#6366f1' : entry.language.includes('Español') ? '#f43f5e' : '#475569'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-800 rounded text-center border border-slate-700">
                  <div className="text-xs text-slate-400 uppercase">Español vs Inglés</div>
                  <div className="text-2xl font-bold text-red-400">+{((chartData[1].ratio - 1) * 100).toFixed(0)}%</div>
                  <div className="text-xs text-slate-500">Impuesto Lingüístico</div>
                </div>
                <div className="p-3 bg-slate-800 rounded text-center border border-slate-700">
                  <div className="text-xs text-slate-400 uppercase">Chino vs Inglés</div>
                  <div className="text-2xl font-bold text-green-400">-{((1 - chartData[3].ratio) * 100).toFixed(0)}%</div>
                  <div className="text-xs text-slate-500">Más Eficiente</div>
                </div>
              </div>

              {translations && (
                <div className="mt-6 text-xs text-slate-400 border-t border-slate-700 pt-4">
                  <p className="font-semibold mb-1 text-slate-300">Traducciones Generadas:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><span className="font-bold text-slate-200">EN:</span> {translations.en}</li>
                    <li><span className="font-bold text-slate-200">ZH:</span> {translations.zh}</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 min-h-[300px]">
              <Coins className="w-12 h-12 text-slate-700 mb-3" />
              <p className="text-slate-500 font-medium">Ejecuta el análisis para ver los costos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stage2Inequity;