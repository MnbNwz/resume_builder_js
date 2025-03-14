import "./App.css";
import { createContext, useState } from "react";

import MainForm from "./components/pages/MainForm";

function App() {
  return (
    <ResumeProvider>
      <div
        style={{ height: "100%" }}
        className="w-screen  overflow-x-hidden space-y-4 p-4"
      >
        <MainForm />
      </div>
    </ResumeProvider>
  );
}

export default App;

export const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState([]);

  console.log(resumeData);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
