import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
    const [messages, setMessages] = useState([
        { role: 'ai', text: "Hello! I'm JARVIS, your AI Shopping Assistant for Nikhil Store. What are you looking for today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    // Auto-scroll to the bottom when a new message appears
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput("");
        setIsLoading(true);

        try {
            // Call the Node.js bridge we just built
            const response = await fetch(`http://localhost:8080/api/ai-chat?q=${encodeURIComponent(userMsg)}`);
            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'ai',
                text: data.success ? data.answer : data.message || "I encountered an error."
            }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'ai', text: "I'm having trouble connecting right now. Please ensure the servers are running." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-[75vh]">

                {/* Chat Header */}
                <div className="bg-blue-600 text-white p-4 font-bold text-lg flex items-center justify-between shadow-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center text-xl shadow-inner">
                            🤖
                        </div>
                        <div>
                            <h2 className="leading-tight">JARVIS AI</h2>
                            <p className="text-xs text-blue-200 font-normal">Powered by Llama 3 & RAG</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-normal">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        Online
                    </div>
                </div>

                {/* Chat History Area */}
                <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-4 rounded-2xl max-w-[85%] md:max-w-[75%] shadow-sm ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-sm'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                                }`}>
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="p-4 rounded-2xl bg-white border border-gray-200 rounded-bl-sm shadow-sm flex gap-2 items-center">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input Box */}
                <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-3 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask JARVIS about our products..."
                        className="flex-1 px-5 py-3 bg-slate-100 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300 shadow-md"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIAssistant;