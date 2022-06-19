import React from "react";

const handleFormDataChange = <T> (set: React.Dispatch<React.SetStateAction<T>>) => {
  return (value: string, name: string) => {
    set((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
};

export default handleFormDataChange;
