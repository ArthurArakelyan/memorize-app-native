import React, {FC, useEffect, useState} from "react";
import {StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle} from "react-native";

// utils
import validateOnce from "../../utils/validateOnce";

// types
import Validator from "../../types/Validator";

// assets
import {darkColor, gray, regular} from "../../assets/global";

interface FieldProps extends TextInputProps {
  submitted?: boolean;
  validator?: Validator[];
  label?: string;
  viewStyle?: StyleProp<ViewStyle>;
}

const Field: FC<FieldProps> = ({ label, submitted, validator, viewStyle, onChangeText, value, style, ...props }) => {
  const [error, setError] = useState<string>('');

  const validate = (value: string) => {
    if (submitted && validator) {
      const message = validateOnce(value, validator);

      if (message !== error) {
        setError(message);
      }
    }
  };

  const handleChange = (value: string) => {
    validate(value);
    onChangeText && onChangeText(value);
  };

  useEffect(() => {
    if (submitted && typeof value === 'string') {
      validate(value);
    }
  }, [submitted]);

  return (
    <View style={[styles["field"], viewStyle]}>
      {!!label && <Text style={styles["field-label"]}>{label}</Text>}
      <TextInput
        selectionColor="#000" style={[styles["field-input"], style]}
        onChangeText={handleChange}
        value={value}
        {...props}
      />
      {!!error && <Text style={styles["field-error"]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  'field': {
    position: 'relative',
    width: '100%',
    maxHeight: 100,
    marginBottom: 20,
  },
  'field-label': {
    color: darkColor,
    fontSize: 18,
    fontFamily: regular,
    marginBottom: 5,
  },
  'field-input': {
    width: '100%',
    color: '#000',
    fontSize: 18,
    paddingHorizontal: 15,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: gray,
  },
  'field-error': {
    position: 'absolute',
    color: '#f00',
    fontSize: 14,
    fontFamily: regular,
    top: '100%',
  },
});

export default Field;
