import React, {FC, memo} from "react";
import {TextInputProps} from "react-native";

// components
import Field from "../Field";

// types
import IField from "../../types/Field";
import {UserInput} from "../../types/UserInput";

interface Props extends TextInputProps {
  fields: IField[];
  data: UserInput;
  handleChange: (value: string, name: string) => void;
  handleSubmit?: () => void;
  submitted?: boolean;
}

const Fields: FC<Props> = ({ fields, submitted, data, handleSubmit, handleChange }) => {
  return (<>
    {fields.map(({ name, label, validators, ...props }) => {
      return (
        <Field
          key={name}
          label={label}
          value={data[name]}
          onChangeText={(value) => handleChange(value, name)}
          onSubmitEditing={handleSubmit}
          validator={validators}
          submitted={submitted}
          {...props}
        />
      );
    })}
  </>);
};

export default memo(Fields);
