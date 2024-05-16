import React from "react";

function CreateError({ errors, name }) {
  return (
    <>
      {errors.error?.details.map(
        (error, index) =>
          error.context?.label === name && (
            <div key={index} className=" text-start  text-danger p-0 mt-0 mb-1">
              {name === "phone"
                ? "Please enter a valid phone like this 01122327923"
                : name === "password"
                ? "The password must be a number of 6 letters or numbers"
                : error.message}
            </div>
          )
      )}
    </>
  );
}

export default CreateError;
