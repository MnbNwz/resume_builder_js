import React, { useContext } from "react";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { AccordionTemplate } from "../../templates";

import {
  ProfessionalSummaryForm,
  PersonalInformationForm,
  WorkExperienceForm,
  MiniWorkExperienceForm,
} from "../../organisms";

import { useFieldArray, useFormContext } from "react-hook-form";

import { ResumeContext } from "../../../App";
import { AllExperiencePage } from "..";
import { workExperienceSchema } from "../../../utils/types/formTypes";

export const MainForm = () => {
  const {
    resumeData,
    setResumeData,
    workExperienceForms,
    setWorkExperienceForms,
    setSpecificWorkExperience,
  } = useContext(ResumeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
    trigger,
    reset,
  } = useFormContext();

  const isEndDateDisabled = watch("disabledEndDate");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contributions",
  });

  const handleChange = (value, index) => {
    setValue(`contributions.${index}.value`, value, {
      shouldValidate: true,
    });
    // console.log(getValues("contributions"));
  };

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    setResumeData((prev) => [...prev, data]);
    reset();
  };

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  };
  const validateContributionInput = async () => {
    const result = await trigger("contributionInput");
    if (result) {
      const contributionText = getValues("contributionInput");
      append({ value: contributionText });
      setValue("contributionInput", "");
    } else {
      console.log("Contribution Input validation failed");
    }
  };

  const pushingWorkExperience = async () => {
    const result = await trigger([
      "companyName",
      "jobTitle",
      "startDate",
      "endDate",
      "officeLocation",
      ...(getValues("contributions")?.length === 0
        ? ["contributionInput"]
        : ["contributions"]),
    ]);
    if (result) {
      // Get the values directly using the field names
      const companyName = getValues("companyName");
      const jobTitle = getValues("jobTitle");
      const startDate = getValues("startDate");
      const endDate = getValues("endDate");
      const officeLocation = getValues("officeLocation");
      const contributions = getValues("contributions");

      // Create the object with the values
      const obj = {
        companyName,
        jobTitle,
        startDate,
        endDate,
        officeLocation,
        contributions,
      };

      // Push the object to the state
      setWorkExperienceForms((prev) => [...prev, obj]);
    } else {
      console.log("Contribution Input validation failed");
    }
  };
  return (
    <>
      {workExperienceForms && workExperienceForms.length > 0 && (
        <AllExperiencePage
          setSpecificWorkExperience={setSpecificWorkExperience}
          workExperienceForms={workExperienceForms}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <AccordionTemplate title={APP_CONSTANTS.personalInformation}>
          <PersonalInformationForm register={register} errors={errors} />
        </AccordionTemplate>
        <AccordionTemplate title={APP_CONSTANTS.professionalSummary}>
          <ProfessionalSummaryForm register={register} errors={errors} />
        </AccordionTemplate>
        <AccordionTemplate title={APP_CONSTANTS.workExperience}>
          <WorkExperienceForm
            register={register}
            errors={errors}
            control={control}
            fields={fields}
            remove={remove}
            handleChange={handleChange}
            isEndDateDisabled={isEndDateDisabled}
            validateContributionInput={validateContributionInput}
            pushingWorkExperience={pushingWorkExperience}
          />
        </AccordionTemplate>

        <div className="w-full flex  justify-center ">
          <button className="w-2xl" type="submit">
            {APP_CONSTANTS.submit}
          </button>
        </div>
      </form>
    </>
  );
};
