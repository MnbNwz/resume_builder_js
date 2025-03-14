import "./App.css";
import { createContext, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PersonalInformationSchema,
  professionalSummarySchema,
  workExperienceSchema,
} from "./utils/types/formTypes";
import { LivePreview, MainForm } from "./components/pages";

export const ResumeContext = createContext();

const ResumeProvider = ({ children }) => {
  const dummyWorkExperienceData = [
    {
      companyName: "Tech Solutions Inc.",
      jobTitle: "Software Engineer",
      startDate: "01/15/2020",
      endDate: "12/30/2022",
      contributions: [
        "Developed and maintained front-end features using React.js.",
        "Collaborated with the team to optimize application performance.",
        "Implemented CI/CD pipeline for continuous integration.",
      ],
      officeLocation: "San Francisco, CA",
    },
    {
      companyName: "Innovative Apps Ltd.",
      jobTitle: "Full Stack Developer",
      startDate: "06/01/2018",
      endDate: "11/20/2019",
      contributions: [
        "Built REST APIs using Node.js and Express.",
        "Worked on a cross-functional team to build a mobile app using React Native.",
        "Led the integration of third-party payment services.",
      ],
      officeLocation: "New York, NY",
    },
    {
      companyName: "Creative Tech Hub",
      jobTitle: "Junior Developer",
      startDate: "08/10/2016",
      endDate: "05/20/2018",
      contributions: [
        "Assisted in the development of a SaaS product using Angular.",
        "Performed unit testing and bug fixes for various features.",
        "Collaborated with senior developers to improve product functionality.",
      ],
      officeLocation: "Los Angeles, CA",
    },
  ];

  const [resumeData, setResumeData] = useState([]);
  const [workExperienceForms, setWorkExperienceForms] = useState(
    []
    // dummyWorkExperienceData
  );

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        workExperienceForms,
        setWorkExperienceForms,
      }}
    >
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
    startDate: "dd/mm/yyyy",
    endDate: "dd/mm/yyyy",
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
      </div>
    </div>
  );
}

export default App;
