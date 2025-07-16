import * as React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const bubbleStyles = "rounded-2xl px-5 py-3 text-base max-w-[80%] transition-all duration-300 bg-white text-[#1f2937]";

const Chatbot: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte con IA para tu negocio?' }
  ]);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const [threadId, setThreadId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const body: { message: string; thread_id?: string | null } = { message: input };
      if (threadId) {
        body.thread_id = threadId;
      }

      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      if (data.assistant_message) {
        const botMessage = { from: 'bot', text: data.assistant_message };
        setMessages(prev => [...prev, botMessage]);
      }

      if (data.thread_id) {
        setThreadId(data.thread_id);
      }

    } catch (error) {
      console.error("Error al contactar al backend:", error);
      const errorMessage = { from: 'bot', text: 'Lo siento, no pude conectarme. Intenta de nuevo más tarde.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {open && (
        <div
          className="w-[370px] max-w-[90vw] min-h-[480px] h-[540px] flex flex-col overflow-hidden mb-4 animate-fadeInUp rounded-3xl border border-white/30"
          style={{
            background: 'linear-gradient(135deg, #fff 60%, #F5F1EA 100%)'
          }}
        >
          {/* Header minimalista */}
          <div className="flex items-center justify-between px-7 py-4 border-b border-white/20 bg-white">
            <span className="font-semibold tracking-wide text-lg text-[#1f2937]">Luca Studio Bot</span>
            <button onClick={() => setOpen(false)} aria-label="Cerrar chat" className="text-[#1f2937]/40 hover:text-[#1f2937] text-2xl transition-colors px-2">×</button>
          </div>
          {/* Mensajes tipo burbuja */}
          <div className="flex-1 flex flex-col gap-2 px-5 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex w-full ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`rounded-2xl px-5 py-3 text-base max-w-[80%] transition-all duration-300 break-words ${msg.from === 'user'
                      ? 'bg-brandBlack text-white ml-8'
                      : 'bg-[#F3F4F6] text-[#1f2937] mr-8 border border-white/30'
                    }`}
                  style={{ minWidth: '64px', wordBreak: 'break-word' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="rounded-2xl px-5 py-3 text-base bg-[#F3F4F6] text-[#1f2937] mr-8 border border-white/30">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center border-t border-white/20 px-4 py-3 bg-white">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-2xl border border-white/30 ring-2 ring-gray-200 outline-none text-base bg-white text-[#1f2937] placeholder:text-gray-400 transition-all duration-200 disabled:opacity-50"
              placeholder={isLoading ? "Escribiendo..." : "Escribe tu mensaje..."}
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
              disabled={isLoading}
            />
            <button
              type="submit"
              className="ml-3 p-0 w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-[#374151] bg-white hover:bg-[#F5F1EA] transition-all duration-200 shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
      {/* Botón flotante minimalista con icono de chat moderno */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-16 h-16 rounded-full bg-white border border-white/40 flex items-center justify-center hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
        style={{}}
      >
        <ChatIcon />
      </button>
      {/* Animaciones */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s cubic-bezier(0.4,0,0.2,1) both; }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Chatbot; 