import "./App.css";
import { createContext, useState } from "react";
import MainForm from "./components/pages/MainForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PersonalInformationSchema,
  professionalSummarySchema,
  workExperienceSchema,
} from "./utils/types/formTypes";
import LivePreview from "./components/pages/LivePreview";

export const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState([]);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

function App() {
  const defaultValues = {
    // Personal Information section
    fullName: "",
    email: "",
    headline: "",
    location: "",
    linkedIn: "",
    website: "",
    // Professional Summary section
    summary: "",
    // Work Experience section
    companyName: "",
    jobTitle: "",
    startDate: "mm/dd/yyyy",
    endDate: "mm/dd/yyyy",
    contributions: [],
    disabledEndDate: false,
  };

  const combinedSchema = PersonalInformationSchema.merge(
    professionalSummarySchema
  ).merge(workExperienceSchema);
  const methods = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues,
    mode: "onChange",
  });
  // const formValues = methods.watch();

  return (
    <div className="flex h-screen w-full">
      <div className="p-4 overflow-x-hidden">
        <FormProvider {...methods}>
          <ResumeProvider>
            <MainForm />
          </ResumeProvider>
        </FormProvider>
      </div>

      <div className=" p-4 overflow-x-hidden">
        <LivePreview methods={methods} />
        {/* <h2>Live Preview or Submitted Data</h2> */}
      </div>
    </div>
  );
}

export default App;
