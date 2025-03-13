import { InputField, Button } from "../../atoms/index";
import { DateRange } from "../../molecules";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useMemo } from "react";

export const WorkExperienceForm = ({
  register,
  errors,
  control,
  fields,
  append,
  remove,
  trigger,
  isEndDateDisabled,
  getValues,
  setValue,
  handleChange,
}) => {
  const fieldArrayFields = useMemo(() => fields, [fields]);

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
    <div className="flex flex-col space-y-4 p-4 rounded-md border border-gray-300">
      <div className="flex flex-col space-y-4 p-4 rounded-md border border-gray-300 h-full  overflow-y-auto">
        <InputField
          important={true}
          label="Company Name"
          name="companyName"
          register={register}
          error={errors?.companyName}
          placeholder="e.g., Acme Corporation"
        />

        <InputField
          important={true}
          label="Job Title"
          name="jobTitle"
          register={register}
          error={errors?.jobTitle}
          placeholder="e.g., Senior Software Engineer"
        />

        <DateRange
          register={register}
          errors={errors}
          isEndDateDisabled={isEndDateDisabled}
        />

        <InputField
          important={false}
          label="Location"
          name="location"
          register={register}
          error={errors?.location}
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
                      important={false}
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
                    <FaRegTrashAlt size={18} className="text-black" />
                  </div>
                </div>
              </div>
            ))}

          <div>
            <div className="flex items-center w-full">
              <div className="flex-1">
                <InputField
                  important={false}
                  label=""
                  name="contributionInput"
                  register={register}
                  error={errors?.contributionInput}
                  placeholder="Describe a contribution..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white mb-12">
        <Button
          type="button"
          onClick={validateContributionInput}
          className="!bg-white !text-black rounded-md !border !border-gray-300 gap-2 flex justify-between items-center"
        >
          <FaPlus size={15} />
          {APP_CONSTANTS.addContribution}
        </Button>
      </div>

      <div className="w-full flex  justify-center ">
        <button className="w-2xl" type="submit">
          {APP_CONSTANTS.submit}
        </button>
      </div>
    </div>
  );
};
