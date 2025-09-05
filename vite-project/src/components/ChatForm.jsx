import React, { useRef } from "react";

function ChatForm({ setChatHistory, chatBotResponse, chatHistory, theme }) {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Update chat history with the user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Add a "Thinking..." placeholder
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      // Generate bot response
      chatBotResponse([...chatHistory, { role: "user", text: userMessage }]);
    }, 600);

    console.log(userMessage);
  };

  return (
    <form
      action="#"
      onSubmit={handleSubmit}
      className="chat-form flex items-center gap-2 sm:gap-3"
    >
      <input
        type="text"
        name="message"
        ref={inputRef}
        placeholder="Message..."
        className={`message-input w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-full transition-all duration-300 text-sm sm:text-base
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${
            theme === "dark"
              ? "bg-gray-800 text-gray-200 placeholder-gray-400"
              : "bg-gray-100 text-gray-800 placeholder-gray-500"
          }
        `}
        required
      />
      <button
        className={`material-symbols-rounded rounded-full flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${
            theme === "dark"
              ? "bg-indigo-700 text-white hover:bg-indigo-600"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }
        `}
      >
        arrow_upward
      </button>
    </form>
  );
}

export default ChatForm;
