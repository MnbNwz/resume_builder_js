import { TextAreaField } from "../../atoms";

export const ProfessionalSummaryForm = ({ register, errors }) => (
  <TextAreaField
    important={true}
    label="Summary"
    name="summary"
    register={register}
    error={errors?.summary}
    placeholder="Write a professional summary"
  />
);
