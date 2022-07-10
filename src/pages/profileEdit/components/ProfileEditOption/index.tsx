import React, {FC, memo} from "react";
import {StyleSheet, Text} from "react-native";
import {TouchableRipple} from "react-native-paper";

// types
import IProfileEditOption from "../../../../types/ProfileEditOption";

// assets
import {medium} from "../../../../assets/global";

interface IProfileEditOptionProps {
  option: IProfileEditOption;
  isFirst: boolean;
}

const ProfileEditOption: FC<IProfileEditOptionProps> = ({ option, isFirst }) => {
  return (
    <TouchableRipple style={[styles["option"], isFirst && styles["option-first"]]} onPress={option.click}>
      <Text style={styles["option-name"]}>
        {option.name}
      </Text>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  'option': {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 71, 71, 0.7)',
  },
  'option-first': {
    borderTopWidth: 1,
    borderTopColor: 'rgba(71, 71, 71, 0.7)',
  },
  'option-name': {
    fontSize: 20,
    fontFamily: medium,
    color: 'rgba(71, 71, 71, 0.7)',
  },
});

export default memo(ProfileEditOption);
