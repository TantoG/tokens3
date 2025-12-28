import React, { useState } from 'react';
import { Cpu, Database, Video, Box, ArrowRight } from 'lucide-react';

const Stage3Asymmetry: React.FC = () => {
  const [inputTokens, setInputTokens] = useState(1000);
  const [outputTokens, setOutputTokens] = useState(200);

  // Simulation: Output is 3x more expensive than Input (Conservative estimate, can be up to 8x)
  const INPUT_PRICE_PER_1K = 0.0025; // Dummy unit currency
  const OUTPUT_PRICE_PER_1K = 0.0100; // 4x input

  const inputCost = (inputTokens / 1000) * INPUT_PRICE_PER_1K;
  const outputCost = (outputTokens / 1000) * OUTPUT_PRICE_PER_1K;
  const totalCost = inputCost + outputCost;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <header className="mb-8 border-b border-slate-800 pb-4">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">3. Entrada vs. Salida</h2>
        <p className="text-lg text-slate-400">
          La economía de la generación: Por qué generar una respuesta es más caro que leer tu pregunta.
        </p>
      </header>

      {/* The Metaphor Section */}
      <div className="bg-indigo-950 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden border border-indigo-900/50">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Video className="w-6 h-6 mr-3 text-indigo-400" />
              Metáfora del Artista
            </h3>
            <p className="text-indigo-100 leading-relaxed mb-4">
              Piensa en la relación entre los tokens de entrada y salida como la creación de un archivo de video.
            </p>
            <ul className="space-y-3 text-sm text-indigo-200">
              <li className="flex items-start">
                <span className="font-bold text-white min-w-[80px]">Entrada:</span>
                <span>Tu prompt es el <strong>tiempo de renderizado inicial</strong>. Requiere mucha potencia de cálculo (GPU) en paralelo.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-white min-w-[80px]">Salida:</span>
                <span>La respuesta es el <strong>tamaño del archivo de video</strong>. Se genera fotograma a fotograma (token a token), llenando la memoria.</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-lg backdrop-blur-sm border border-indigo-500/30">
            <h4 className="font-bold text-indigo-300 mb-4 uppercase text-xs tracking-wider">Arquitectura Transformer</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-900/80 rounded-lg border border-slate-700">
                <Cpu className="w-8 h-8 mx-auto mb-2 text-sky-400" />
                <div className="font-bold text-white">Entrada (Pre-fill)</div>
                <div className="text-xs text-indigo-300 mt-1">Paralelo</div>
                <div className="text-xs font-mono bg-slate-950 inline-block px-1 mt-1 rounded text-orange-400 border border-slate-800">O(N²)</div>
              </div>
              <div className="text-center p-4 bg-slate-900/80 rounded-lg border-2 border-indigo-500/50">
                <Database className="w-8 h-8 mx-auto mb-2 text-rose-400" />
                <div className="font-bold text-white">Salida (Decode)</div>
                <div className="text-xs text-indigo-300 mt-1">Secuencial</div>
                <div className="text-xs font-mono bg-slate-950 inline-block px-1 mt-1 rounded text-green-400 border border-slate-800">O(1)* KV Cache</div>
              </div>
            </div>
            <p className="text-xs text-center mt-4 text-indigo-400/70">
              *La salida está limitada por el ancho de banda de la memoria, lo que la hace más cara.
            </p>
          </div>
        </div>
        {/* Abstract shapes for background */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-950 to-transparent opacity-60"></div>
      </div>

      {/* Interactive Calculator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-8">
        <h3 className="text-xl font-bold text-slate-200 mb-6">Calculadora de Proyecto: ¿Cuánto cuesta tu idea?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Tokens de Entrada (Contexto)</span>
                <span className="font-bold text-indigo-400">{inputTokens.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={inputTokens}
                onChange={(e) => setInputTokens(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <p className="text-xs text-slate-500 mt-2">Prompts largos, documentos, ejemplos (Más barato).</p>
            </div>

            <div>
              <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Tokens de Salida (Respuesta)</span>
                <span className="font-bold text-rose-400">{outputTokens.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={outputTokens}
                onChange={(e) => setOutputTokens(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <p className="text-xs text-slate-500 mt-2">Texto generado por la IA (4x - 8x más caro).</p>
            </div>
          </div>

          {/* Results Visual */}
          <div className="flex flex-col justify-center items-center bg-slate-800/50 rounded-xl p-6 relative border border-slate-800">
            <div className="w-full max-w-xs space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-400">
                  <Box className="w-4 h-4 mr-2" /> Entrada
                </div>
                <div className="font-mono font-bold text-indigo-400">${inputCost.toFixed(4)}</div>
              </div>
              <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${(inputCost / totalCost) * 100}%` }}></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-400">
                  <Box className="w-4 h-4 mr-2" /> Salida
                </div>
                <div className="font-mono font-bold text-rose-400">${outputCost.toFixed(4)}</div>
              </div>
              <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500" style={{ width: `${(outputCost / totalCost) * 100}%` }}></div>
              </div>

              <div className="border-t border-slate-700 pt-4 mt-4 flex items-center justify-between">
                <span className="font-bold text-slate-200">Costo Total</span>
                <span className="text-2xl font-bold text-white">${totalCost.toFixed(4)}</span>
              </div>
            </div>

            {outputCost > inputCost && (
               <div className="absolute top-2 right-2 bg-yellow-900/40 border border-yellow-700 text-yellow-200 text-xs px-2 py-1 rounded font-bold animate-pulse shadow-sm">
                 ¡Alerta de Costo!
               </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-green-900/20 p-4 rounded-lg border border-green-800 flex items-start">
          <ArrowRight className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h5 className="font-bold text-green-200 text-sm">Conclusión Estratégica</h5>
            <p className="text-green-300 text-sm mt-1">
              Para optimizar costos en proyectos largos (ej. documentales), utiliza el <strong>Context Caching</strong>. 
              Pagas por procesar la entrada masiva una sola vez y la reutilizas. Sé verboso en el contexto (barato) y conciso en la salida solicitada (cara).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage3Asymmetry;