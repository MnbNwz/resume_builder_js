import "./App.css";
import { createContext, useState } from "react";

import MainForm from "./components/pages/MainForm";

function App() {
  return (
    <ResumeProvider>
      <div className="w-screen h-screen overflow-x-hidden space-y-4 p-4">
        <MainForm />
      </div>
    </ResumeProvider>
  );
}

export default App;

const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState([]);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
