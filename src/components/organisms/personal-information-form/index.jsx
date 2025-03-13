import { InputField } from "../../atoms";

export const PersonalInformationForm = ({ register, errors }) => (
  <div className="space-y-4 p-4 rounded-md border border-gray-300">
    <div className="grid grid-cols-2 gap-4">
      <InputField
        important={true}
        label="Full Name"
        name="fullName"
        register={register}
        error={errors?.fullName}
        placeholder="eg,. John"
      />
      <InputField
        important={true}
        label="Email"
        name="email"
        register={register}
        error={errors?.email}
        placeholder="abc@domain.com"
      />
    </div>
    <InputField
      label="Headline"
      name="headline"
      register={register}
      error={errors?.headline}
      placeholder="eg,. some famous headline about you"
    />
    <InputField
      label="Location"
      name="location"
      register={register}
      error={errors?.location}
      placeholder="e.g., San Francisco CA or LA"
    />
    <InputField
      countryFlag={true}
      label="Phone Number"
      name="phoneNumber"
      register={register}
      error={errors?.phoneNumber}
      placeholder="000 000 0000"
    />
    <div className="grid grid-cols-2 gap-4">
      <InputField
        label="LinkedIn"
        name="linkedIn"
        register={register}
        error={errors?.linkedIn}
        placeholder="www.linkedin.com"
      />
      <InputField
        label="Website"
        name="website"
        register={register}
        error={errors?.website}
        placeholder="www.google.com"
      />
    </div>
  </div>
);
