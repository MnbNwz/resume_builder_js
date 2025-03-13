import { APP_CONSTANTS } from "../../../constants/app-constants";
import { PersonalInformationForm } from "../../organisms";
import { AccordionTemplate } from "../../templates";

export const PersonalInformation = () => {
  return (
    <AccordionTemplate title={APP_CONSTANTS.personalInformation}>
      <PersonalInformationForm />
    </AccordionTemplate>
  );
};
