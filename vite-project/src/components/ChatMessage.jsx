import ChatBotIcon from "./ChatBotIcon";

function ChatMessage({ chat, theme }) {
  const isBot = chat.role === "model";

  const messageAlignment = isBot ? "self-start" : "self-end";
  const messageContainerFlexDirection = isBot
    ? "flex-row"
    : "flex-row-reverse";

  const botMessageClasses = `
    rounded-2xl rounded-bl-none p-3 max-w-xs md:max-w-md break-words transition-colors duration-300
    ${theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"}
  `;

  const userMessageClasses = `
    rounded-2xl rounded-br-none p-3 max-w-xs md:max-w-md break-words transition-colors duration-300
    ${theme === "dark" ? "bg-indigo-700 text-white" : "bg-indigo-600 text-white"}
  `;

  return (
    <div
      className={`message flex items-end gap-3 ${messageAlignment} ${messageContainerFlexDirection}`}
    >
      {isBot && <ChatBotIcon theme={theme} />}
      <p className={`message-text ${isBot ? botMessageClasses : userMessageClasses}`}>
        {chat.text}
      </p>
    </div>
  );
}

export default ChatMessage;
