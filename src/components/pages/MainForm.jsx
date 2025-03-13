import React from "react";

import { APP_CONSTANTS } from "../../constants/app-constants";
import { AccordionTemplate } from "../templates";
import {
  ProfessionalSummaryForm,
  WorkExperienceForm,
  PersonalInformationForm,
} from "../organisms";

const MainForm = () => {
  return (
    <>
      <AccordionTemplate title={APP_CONSTANTS.personalInformation}>
        <PersonalInformationForm />
      </AccordionTemplate>
      <AccordionTemplate title={APP_CONSTANTS.professionalSummary}>
        <ProfessionalSummaryForm />
      </AccordionTemplate>
      <AccordionTemplate title={APP_CONSTANTS.workExperience}>
        <WorkExperienceForm />
      </AccordionTemplate>
    </>
  );
};

export default MainForm;
