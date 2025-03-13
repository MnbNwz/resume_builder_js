import { InputField, Button } from "../../atoms/index";
import { DateRange } from "../../molecules";
import { APP_CONSTANTS } from "../../../constants/app-constants";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { memo } from "react";

export const WorkExperienceForm = ({
  register,
  errors,
  control,
  fields,
  append,
  remove,
  watch,
  lastFieldValue,
  isEndDateDisabled,
}) => {
  const ContributionField = memo(({ index, isLast }) => {
    return (
      <div>
        <div className="flex items-center w-full">
          <div className="flex-1">
            <InputField
              disabled={!isLast}
              important={false}
              label=""
              name={`contributions.${index}.value`}
              register={register}
              error={errors?.contributions?.[index]?.value}
              placeholder="Describe a contribution..."
            />
          </div>
          {!isLast && (
            <Button
              type="button"
              onClick={() => remove(index)}
              className="!bg-transparent !text-black h-10 w-10 flex items-center justify-center"
            >
              <FaRegTrashAlt size={18} className="text-black" />
            </Button>
          )}
        </div>
        {isLast && lastFieldValue?.length < 8 && (
          <p className="text-red-500 text-xs">Contributions cannot be empty</p>
        )}
      </div>
    );
  });

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
          {fields.map((_, index) => (
            <ContributionField
              key={index}
              isLast={fields.length - 1 === index}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="bg-white mb-12">
        <Button
          type="button"
          onClick={() => {
            if (lastFieldValue && lastFieldValue.length > 8) {
              append({ value: "" });
            }
          }}
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
