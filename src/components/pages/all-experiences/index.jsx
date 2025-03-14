import React, { useEffect } from "react";
import { AccordionTemplate } from "../../templates";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { MiniWorkExperienceForm } from "../../organisms";

export const AllExperiencePage = ({
  workExperienceForms,
  setSpecificWorkExperience,
}) => {
  // useEffect(() => {}, [workExperienceForms]);

  return workExperienceForms.map((value, key) => (
    <AccordionTemplate
      key={key}
      formId={key}
      defaultAccordionOff={true}
      title={`${APP_CONSTANTS.addWorkExperience} ${Number(key) + 1}`}
    >
      <MiniWorkExperienceForm
        setSpecificWorkExperience={setSpecificWorkExperience}
        defaultValues={value}
      />
    </AccordionTemplate>
  ));
};
