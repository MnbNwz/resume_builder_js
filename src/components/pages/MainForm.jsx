import React from "react";

import {
  WorkExperience,
  ProfessionalSummary,
  PersonalInformation,
} from "./index";

import { useForm } from "react-hook-form";
import { InputField } from "./../atoms/input-field/index";

// const InputField = ({ label, name, register, type = "text", placeholder }) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         {...register(name)}
//         className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

const ReusableForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 max-w-md mx-auto">
      <InputField
        label="First Name"
        name="firstName"
        register={register}
        placeholder="Enter your first name"
      />
      <InputField
        label="Last Name"
        name="lastName"
        register={register}
        placeholder="Enter your last name"
      />
      <InputField
        label="Email"
        name="email"
        register={register}
        type="email"
        placeholder="Enter your email"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md w-full mt-4 hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

const MainForm = () => {
  return (
    <>
      <PersonalInformation />
      <ProfessionalSummary />
      <WorkExperience />
    </>
  );
};

export default MainForm;
