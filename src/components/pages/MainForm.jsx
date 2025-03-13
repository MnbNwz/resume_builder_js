import React from "react";

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
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const MainForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(combinedSchema),
    defaultValues,
  });

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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          append={append}
          remove={remove}
          getValues={getValues}
          trigger={trigger}
          watch={watch}
          setValue={setValue}
          handleChange={handleChange}
        />
      </AccordionTemplate>
    </form>
  );
};

export default MainForm;
