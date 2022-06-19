import React, {FC, memo} from "react";

// components
import Field from "../Field";

// types
import IField from "../../types/Field";
import {UserInput} from "../../types/UserInput";

interface Props {
  fields: IField[];
  data: UserInput;
  handleChange: (value: string, name: string) => void;
  handleSubmit?: () => void;
  submitted?: boolean;
}

const Fields: FC<Props> = ({ fields, submitted, data, handleSubmit, handleChange }) => {
  return (<>
    {fields.map(({ name, label, validators }) => {
      return (
        <Field
          key={name}
          label={label}
          value={data[name]}
          onChangeText={(value) => handleChange(value, name)}
          onSubmitEditing={handleSubmit}
          validator={validators}
          submitted={submitted}
        />
      );
    })}
  </>);
};

export default memo(Fields);
