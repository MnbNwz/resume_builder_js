import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { workExperienceSchema } from "../../../utils/types/formTypes";
import { useFieldArray, useForm } from "react-hook-form";
import { InputField } from "../../atoms";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { FaRegTrashAlt } from "react-icons/fa";

export const MiniWorkExperienceForm = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,

    resolver: zodResolver(workExperienceSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const fieldArrayFields = getValues("contributions");

  const FormDate = ({ label, name }) => (
    <div className="flex-1 relative">
      <label className="block text-sm font-medium text-gray-700 mt-1 mb-1">
        {label} <span className="text-red-500"> *</span>{" "}
      </label>
      <div className="relative">
        <div className="flex gap-2">
          <input
            {...register(name)}
            placeholder={label}
            type={"date"}
            className={`border border-gray-300 p-2 w-full text-black text-sm placeholder-gray-400 pr-10 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150 }`}
          />
        </div>
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors?.name}</p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 px-4"
    >
      <InputField
        important={true}
        label="Company Name"
        name="companyName"
        register={register}
        error={errors?.workExperience?.[0]?.companyName}
        placeholder="e.g., Acme Corporation"
      />

      <InputField
        important={true}
        label="Job Title"
        name="jobTitle"
        register={register}
        error={errors?.workExperience?.[0]?.jobTitle}
        placeholder="e.g., Senior Software Engineer"
      />

      <div className="grid grid-cols-2 gap-4">
        <FormDate label="Start Date" name="startDate" />
        <FormDate label="End Date" name="endDate" />
      </div>

      <InputField
        important={false}
        label="Office Location"
        name="officeLocation"
        register={register}
        error={errors?.workExperience?.[0]?.officeLocation}
        placeholder="e.g., San Francisco CA or remote"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          {APP_CONSTANTS.contributions}
        </label>

        {fieldArrayFields.length > 0 &&
          fieldArrayFields.map((_, index) => (
            <div key={index}>
              <div className="flex items-center w-full">
                <div className="flex-1">
                  <input
                    {...register(`contributions.${index}.value`)}
                    name={`contributions.${index}.value`}
                    placeholder="Describe a contribution..."
                    className="border border-gray-300 p-2 w-full text-black text-sm placeholder-gray-400 pr-10 rounded-md focus:border-black focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150"
                    disabled={false}
                    onChange={(e) => handleChange(e.target.value, index)}
                  />
                  {errors?.contributions?.[index]?.value && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contributions[index].value.message}
                    </p>
                  )}
                </div>

                <div
                  onClick={() => remove(index)}
                  className="!bg-transparent !text-black h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-full"
                >
                  <FaRegTrashAlt
                    size={18}
                    className="text-black mx-auto my-auto"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 mt-10 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};
