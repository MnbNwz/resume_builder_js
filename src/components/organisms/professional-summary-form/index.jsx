import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, InputField } from "../../atoms";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { FaPlus } from "react-icons/fa";
import { professionalSummarySchema } from "../../../utils/types/formTypes";

// Default values for the form
const defaultValues = {
  summary: "",
};

export const ProfessionalSummaryForm = () => {
  const {
    register, // Register form fields
    handleSubmit, // Handles form submission
    formState: { errors }, // Form validation errors
  } = useForm({
    resolver: zodResolver(professionalSummarySchema), // Schema validation
    defaultValues,
  });

  const onSubmit = () => console.log(data); // Form submit handler

  return (
    <form
      onSubmit={handleSubmit(onSubmit)} // Submit handler
      className="space-y-4 p-4 rounded-md border border-gray-300"
    >
      {/* Input field for the professional summary */}
      <InputField
        important={true}
        label="Summary"
        name="summary"
        register={register}
        error={errors.summary}
        placeholder={"Write a professional summary"}
        multiple={true}
      />

      {/* Submit button */}
      <Button
        styleDate={
          "!bg-white !text-black rounded-md py-2 px-4 !border !border-gray-300"
        }
        type="submit"
      >
        <span className="flex items-center justify-center gap-2">
          <FaPlus size={15} />
          {APP_CONSTANTS.submit}
        </span>
      </Button>
    </form>
  );
};
