import { useEffect, useRef, useState } from "react";
import ChatBotIcon from "./components/ChatBotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/Chatmessage";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [theme, setTheme] = useState("light");
  const chatBodyRef = useRef();

  const chatBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);

  return (
    <div
      className={`w-screen min-h-screen flex items-center justify-center p-2 sm:p-4 font-['Inter',_sans-serif] transition-colors duration-300
        ${theme === "dark" ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-slate-100 to-sky-100"}
      `}
    >
      {/* Chatbot popup */}
      <div
        className={`chatbot-popup rounded-2xl shadow-2xl flex flex-col w-full sm:max-w-lg h-[90vh] sm:h-[80vh] max-h-[750px] overflow-hidden transition-colors duration-300
          ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
        `}
      >
        {/* Header */}
        <div
          className={`chat-header p-4 flex items-center justify-between shrink-0 
            ${theme === "dark" ? "bg-indigo-700" : "bg-indigo-600 text-white"}
          `}
        >
          <div className="header-info flex items-center gap-4">
            <ChatBotIcon theme={theme} />
            <h2 className="logo-text font-bold text-lg sm:text-xl tracking-wide">
              Chatbot
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="material-symbols-rounded hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </button>
           
          </div>
        </div>

        {/* Body */}
        <div
          ref={chatBodyRef}
          className="chat-body p-3 sm:p-4 flex-1 overflow-y-auto flex flex-col gap-4 scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-indigo-400 hover:scrollbar-thumb-indigo-500"
        >
          {/* Default bot greeting */}
          <div className="message bot-message flex items-end gap-3 self-start animate-fadeIn">
            <ChatBotIcon theme={theme} />
            <p
              className={`message-text rounded-2xl rounded-bl-none p-3 max-w-xs md:max-w-md break-words
                ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"}
              `}
            >
              Hey there 👋 <br />
              How can I help you today?
            </p>
          </div>

          {/* User + Bot messages */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} theme={theme} />
          ))}
        </div>

        {/* Footer */}
        <div
          className={`footer p-3 sm:p-4 border-t shrink-0 transition-colors duration-300
            ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}
          `}
        >
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            chatBotResponse={chatBotResponse}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
