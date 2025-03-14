import React, { useEffect } from "react";
import { AccordionTemplate } from "../../templates";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { MiniWorkExperienceForm } from "../../organisms";

export const AllExperiencePage = ({ workExperienceForms }) => {
  // useEffect(() => {}, [workExperienceForms]);

  return workExperienceForms.map((value, key) => (
    <AccordionTemplate
      key={key}
      defaultAccordionOff={true}
      title={`${APP_CONSTANTS.workExperience} ${Number(key) + 1}`}
    >
      <MiniWorkExperienceForm defaultValues={value} />
    </AccordionTemplate>
  ));
};
