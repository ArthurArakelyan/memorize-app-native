import React, {FC, useEffect, useState, memo} from "react";
import {StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle, Animated} from "react-native";

// utils
import validateOnce from "../../../utils/validateOnce";

// hooks
import useAnimation from "../../../hooks/useAnimation";
import useFocus from "../../../hooks/useFocus";

// types
import Validator from "../../../types/Validator";

// assets
import {darkColor, gray, primaryColor, regular} from "../../../assets/global";

interface FieldProps extends TextInputProps {
  submitted?: boolean;
  validator?: Validator[];
  label?: string;
  viewStyle?: StyleProp<ViewStyle>;
}

const Field: FC<FieldProps> = ({ label, submitted, validator, viewStyle, onChangeText, value, style, ...props }) => {
  const [error, setError] = useState<string>('');

  const {focused, focusHandlers} = useFocus();

  const errorAnim = useAnimation(0, {
    toValue: 1,
    duration: 500,
    start: !!error,
  });

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
        selectionColor="#000"
        style={[styles["field-input"], focused && styles["field-input__focused"], !!error && styles["field-input__error"], style]}
        onChangeText={handleChange}
        value={value}
        {...focusHandlers}
        {...props}
      />
      {!!error && <Animated.Text style={[styles["field-error"], {opacity: errorAnim}]}>
        {error}
      </Animated.Text>}
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
  'field-input__error': {
    borderColor: '#ff0000',
  },
  'field-input__focused': {
    borderColor: primaryColor,
  },
  'field-error': {
    position: 'absolute',
    color: '#f00',
    fontSize: 14,
    fontFamily: regular,
    top: '100%',
  },
});

export default memo(Field);
