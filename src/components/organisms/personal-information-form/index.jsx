import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, InputField } from "../../atoms";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { FaPlus } from "react-icons/fa";
import { PersonalInformationSchema } from "../../../utils/types/formTypes";

const defaultValues = {
  fullName: "",
  email: "",
  headline: "",
  location: "",
  linkedIn: "",
  website: "",
};

export const PersonalInformationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PersonalInformationSchema),
    defaultValues,
  });

  const onSubmit = () => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 rounded-md border border-gray-300"
    >
      {/* Grid for Full Name and Email fields */}
      <div className="grid grid-cols-2 gap-4">
        <InputField
          important={true}
          label="Full Name"
          name="fullName"
          register={register}
          error={errors.fullName}
          placeholder={"eg,. John"}
        />
        <InputField
          important={true}
          label="Email"
          name="email"
          register={register}
          error={errors.email}
          placeholder={"abc@domain.com"}
        />
      </div>

      <InputField
        label="Headline"
        name="headline"
        register={register}
        error={errors.headline}
        placeholder={"eg,. some famous headline about you"}
      />

      <InputField
        label="Location"
        name="location"
        register={register}
        error={errors.location}
        placeholder="e.g., San Francisco CA or LA"
      />

      <InputField
        countryFlag={true}
        label="Phone Number"
        name="number"
        register={register}
        error={errors.number}
        placeholder="000 000 0000"
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="LinkedIn"
          name="linkedIn"
          register={register}
          error={errors.linkedIn}
          placeholder={"www.linkedin.com"}
        />
        <InputField
          label="Website"
          name="website"
          register={register}
          error={errors.website}
          placeholder={"www.google.com"}
        />
      </div>

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
