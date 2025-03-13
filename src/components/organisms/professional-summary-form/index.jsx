import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, InputField, TextAreaField } from "../../atoms";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { FaPlus } from "react-icons/fa";
import { professionalSummarySchema } from "../../../utils/types/formTypes";

const defaultValues = { summary: "" };

export const ProfessionalSummaryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(professionalSummarySchema),
    defaultValues,
  });

  const onSubmit = () => console.log("data");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 rounded-md border border-gray-300"
    >
      <TextAreaField
        important={true}
        label="Summary"
        name="summary"
        register={register}
        error={errors.summary}
        placeholder="Write a professional summary"
      />
      <Button
        styleDate="!bg-white !text-black rounded-md py-2 px-4 !border !border-gray-300"
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
