import "./App.css";
import Chatbot, {
  FloatingActionButtonTrigger,
  InputBarTrigger,
  ModalView,
} from "mongodb-chatbot-ui";

function MyApp() {
  const suggestedPrompts = [
    "What are the features of Digital Maps?",
    "How does KTern support your S/4HANA transformation journey",
    "What types of assessments does KTern AI provide?",
  ];
  const initialMessageText =
    "Good day and welcome to KIA! How can I assist you today?";
  return (
    <div className="main">
      <header className="main-header">
        <h1>KTern RAG Chatbot</h1>
        <p>
      
        </p>
      </header>
      <Chatbot
        serverBaseUrl={import.meta.env.VITE_SERVER_BASE_URL}
        isExperimental={false}
      >
        <>
          <InputBarTrigger
            suggestedPrompts={suggestedPrompts}
            placeholder="What would you like to ask?"
            className="input-bar"
          />
          <FloatingActionButtonTrigger text="KTern Intelligent Bot Version 0.1" />
          <ModalView
            initialMessageText={initialMessageText}
            initialMessageSuggestedPrompts={suggestedPrompts}
          />
        </>
      </Chatbot>
    </div>
  );
}

export default MyApp;
