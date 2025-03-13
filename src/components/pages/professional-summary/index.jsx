import { APP_CONSTANTS } from "../../../constants/app-constants";
import { ProfessionalSummaryForm } from "../../organisms";
import { AccordionTemplate } from "../../templates";

export const ProfessionalSummary = () => {
  return (
    <AccordionTemplate title={APP_CONSTANTS.professionalSummary}>
      <ProfessionalSummaryForm />
    </AccordionTemplate>
  );
};
