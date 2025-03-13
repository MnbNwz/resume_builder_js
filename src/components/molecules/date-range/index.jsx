// import {  UseFormRegister } from "react-hook-form";
import { InputField } from "../../atoms";
// import { WorkExperienceFormData } from "../../../utils/types/formTypes";
import {
  APP_CONSTANTS,
  FORM_REGISTER_CONSTANTS,
} from "../../../constants/app-constants";
import { CheckboxWithLabel } from "../checkbox-label";

export const DateRange = ({ register, errors, isEndDateDisabled }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputField
        important={true} // Mark field as important
        label="Start Date"
        name="startDate"
        register={register}
        error={errors.startDate}
        placeholder={"Start Date"}
        dateRequired={true} // Ensure the date field is required
      />

      <InputField
        important={true} // Mark field as important
        label="End Date"
        name="endDate"
        register={register}
        error={errors.endDate}
        placeholder={"End Date"}
        dateRequired={true} // Ensure the field is required
        disabled={isEndDateDisabled} // Disable field if condition is true
        disabledError={isEndDateDisabled} // Disable field if condition is true
      />

      <div className="flex items-center col-span-2">
        <CheckboxWithLabel
          isChecked={isEndDateDisabled}
          id="disabledEndDate" // ID for the checkbox
          label={FORM_REGISTER_CONSTANTS.currentWorkingDateCheckBox.label} // Label text for the checkbox
          register={register} // Register the checkbox field
        />
      </div>
    </div>
  );
};
