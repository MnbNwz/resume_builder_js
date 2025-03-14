import React, { useContext } from "react";

import { APP_CONSTANTS } from "../../constants/app-constants";
import { AccordionTemplate } from "../templates";

import {
  ProfessionalSummaryForm,
  PersonalInformationForm,
  WorkExperienceForm,
} from "./../organisms";
import {
  PersonalInformationSchema,
  professionalSummarySchema,
  workExperienceSchema,
} from "../../utils/types/formTypes";
import { useFieldArray, useFormContext } from "react-hook-form";

import { ResumeContext } from "../../App";

const combinedSchema = PersonalInformationSchema.merge(
  professionalSummarySchema
).merge(workExperienceSchema);

const MainForm = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

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
  return (
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
        />
      </AccordionTemplate>

      <div className="w-full flex  justify-center ">
        <button className="w-2xl" type="submit">
          {APP_CONSTANTS.submit}
        </button>
      </div>
    </form>
  );
};

export default MainForm;
