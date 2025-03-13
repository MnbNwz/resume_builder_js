import { APP_CONSTANTS } from "../../../constants/app-constants";
import { WorkExperienceForm } from "../../organisms";
import { AccordionTemplate } from "../../templates";

export const WorkExperience = () => {
  return (
    <AccordionTemplate title={APP_CONSTANTS.workExperience}>
      <WorkExperienceForm />
    </AccordionTemplate>
  );
};
