import React, { useEffect, useRef, useState } from 'react';
import { callGemini } from './api';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
import './ChatPage.css';

const SYSTEM_MESSAGE = `Eres un asistente cordial. Solo puedes responder sobre la información contenida\nen este documento. Si la pregunta no está relacionada, responde:\n"Lo siento, solo puedo hablar sobre el documento provisto."`;
const TEMAS_PROHIBIDOS = [
  'hola', 'gracias', 'buenos días', 'buenas tardes', 'buenas noches',
  'cómo estás', 'adiós', 'hasta luego', 'saludos', 'qué tal', 'hello', 'thanks'
];

export default function ChatPage() {
  const [docText, setDocText] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument('/docs/doc.pdf');
      const pdf = await loadingTask.promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      }
      setDocText(text);
    };
    loadPdf();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(msgs => [...msgs, userMsg]);
    setInput('');
    setLoading(true);

    // Verifica temas prohibidos
    const lower = input.toLowerCase();
    if (TEMAS_PROHIBIDOS.some(t => lower.includes(t))) {
      setMessages(msgs => [
        ...msgs,
        { role: 'assistant', content: '¡Gracias por tu mensaje! Recuerda que solo puedo hablar sobre el documento provisto.' }
      ]);
      setLoading(false);
      return;
    }

    // Construye el prompt
    let doc = docText.slice(0, 100000);
    const contents = [
      { role: 'system', parts: [SYSTEM_MESSAGE + '\n\n' + doc] },
      { role: 'user', parts: [input] }
    ];
    try {
      const response = await callGemini(contents);
      setMessages(msgs => [
        ...msgs,
        { role: 'assistant', content: response }
      ]);
    } catch (e) {
      setMessages(msgs => [
        ...msgs,
        { role: 'assistant', content: 'Error al contactar la IA.' }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`bubble ${msg.role}`}>{msg.content}</div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); handleSend(); }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu pregunta sobre el documento..."
          disabled={loading || !docText}
        />
        <button type="submit" disabled={loading || !docText}>Enviar</button>
      </form>
    </div>
  );
} 