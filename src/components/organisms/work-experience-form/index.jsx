import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField, Button } from "../../atoms/index";
import { DateRange } from "../../molecules";
import { workExperienceSchema } from "../../../utils/types/formTypes";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { memo } from "react";

// Default values for the form fields
const defaultValues = {
  companyName: "",
  jobTitle: "",
  startDate: "mm/dd/yyyy",
  endDate: "mm/dd/yyyy",
  location: "",
  contributions: [{ value: "" }], // Initial contribution field
};

// Main WorkExperienceForm component
export const WorkExperienceForm = () => {
  // Initializing react-hook-form with validation and default values
  const {
    register,
    handleSubmit,
    formState: { errors }, // To handle field errors
    watch, // Watches field values for dynamic behavior
    control, // Used for field arrays
  } = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues,
  });

  // Managing dynamic contribution fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contributions",
  });

  // Watching for whether end date is disabled
  const isEndDateDisabled = watch("disabledEndDate");

  // Submit handler — logs form data to console
  const onSubmit = () => console.log(data);

  // Get value of the last contribution field
  // const lastFieldValue = watch(`contributions.${fields.length - 1}.value`);
  const lastFieldValue = useWatch({
    control,
    name: `contributions.${fields.length - 1}.value`,
  });

  const ContributionField = memo(({ index, isLast }) => {
    return (
      <div>
        <div className="flex items-center w-full">
          <div className="flex-1">
            <InputField
              disabled={!isLast}
              important={false}
              label=""
              // name={`contributions.${index}.value` as const}
              name={`contributions.${index}.value`}
              register={register}
              error={errors.contributions?.[index]?.value}
              placeholder="Describe a contribution..."
            />
          </div>

          {/* Remove button for contributions (except the last one) */}
          {!isLast && (
            <Button
              type="button"
              onClick={() => remove(index)}
              className="!bg-transparent !text-black  h-10 w-10 flex items-center justify-center"
            >
              <span className="flex items-center justify-center">
                <FaRegTrashAlt size={18} className="text-black" />
              </span>
            </Button>
          )}
        </div>

        {/* Validation message for empty contribution field */}
        {isLast && lastFieldValue?.length < 8 && (
          <p className="text-red-500 text-xs">Contributions cannot be empty</p>
        )}
      </div>
    );
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 rounded-md border border-gray-300"
    >
      {/* Company Name input */}
      <InputField
        important={true}
        label="Company Name"
        name="companyName"
        register={register}
        error={errors.companyName}
        placeholder="e.g., Acme Corporation"
      />

      {/* Job Title input */}
      <InputField
        important={true}
        label="Job Title"
        name="jobTitle"
        register={register}
        error={errors.jobTitle}
        placeholder="e.g., Senior Software Engineer"
      />

      {/* Date range picker for start and end dates */}
      <DateRange
        register={register}
        errors={errors}
        isEndDateDisabled={isEndDateDisabled}
      />

      {/* Location input */}
      <InputField
        important={false}
        label="Location"
        name="location"
        register={register}
        error={errors.location}
        placeholder="e.g., San Francisco CA or remote"
      />

      {/* Contributions dynamic field array */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {APP_CONSTANTS.contributions}
        </label>
        {fields.map((_, index) => (
          <ContributionField
            key={index}
            isLast={fields.length - 1 === index}
            index={index}
          />
        ))}

        {/* Add Contribution button — appends a new contribution field */}
        <Button
          type="button"
          onClick={() => {
            if (lastFieldValue && lastFieldValue.length > 8) {
              append({ value: "" });
            }
          }}
          styleDate="!bg-white !text-black rounded-md !border !border-gray-300 w-50"
        >
          <span className="flex items-center justify-center gap-2">
            <FaPlus size={15} /> Add Contribution
          </span>
        </Button>
      </div>

      {/* Submit button */}
      <div className="flex justify-between items-center gap-4">
        <Button
          styleDate="w-full !bg-white !text-black rounded-md py-2 px-4 !border !border-gray-300"
          type="submit"
        >
          <span className="flex items-center justify-center gap-2">
            <FaPlus size={15} />
            {APP_CONSTANTS.addWorkExperience}
          </span>
        </Button>
      </div>
    </form>
  );
};
