import React, {FC, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

// components
import Field from "../../../../../../components/Field";
import Button from "../../../../../../components/Button";

// actions
import {changeUserField} from "../../../../../../store/user/user.actions";

// utils
import validateOnce from "../../../../../../utils/validateOnce";
import showSuccessToast from "../../../../../../utils/showSuccessToast";
import showErrorToast from "../../../../../../utils/showErrorToast";

// constants
import successMessages from "../../../../../../constants/successMessages";

// types
import {IProfileEditModalProps} from "../../types";
import {AppDispatch, RootState} from "../../../../../../store/store";
import Validator from "../../../../../../types/Validator";

const validator: Validator[] = [
  {
    required: true,
    message: 'Name is Required',
  },
  {
    max: 64,
    message: 'Maximum 64 symbols',
  },
];

const ProfileEditName: FC<IProfileEditModalProps> = ({ close }) => {
  const dispatch: AppDispatch = useDispatch();

  const profileName = useSelector((state: RootState) => state.profile.user?.name);

  const [name, setName] = useState<string>(profileName || '');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setName(value);
  };

  const handleSubmit = async () => {
    if (name === profileName) {
      return close();
    }

    if (validateOnce(name, validator)) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(changeUserField({
        name: 'name',
        value: name,
      }));

      showSuccessToast(successMessages.nameChange);

      close();
    } catch (e) {
      setLoading(false);
      showErrorToast(e);
    }
  };

  return (
    <View style={styles["content"]}>
      <Field
        value={name}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        submitted
        autoFocus
        validator={validator}
      />
      <Button
        buttonStyle={styles["submit"]}
        loading={loading}
        onPress={handleSubmit}
      >
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  'content': {
    width: '100%',
  },
  'submit': {
    width: '100%',
    marginTop: 10,
  },
});

export default ProfileEditName;
