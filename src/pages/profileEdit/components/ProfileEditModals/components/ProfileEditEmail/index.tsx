import React, {FC, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

// components
import Field from "../../../../../../components/Field";
import Button from "../../../../../../components/Button";

// actions
import {changeUserEmail} from "../../../../../../store/user/user.actions";

// utils
import validateOnce from "../../../../../../utils/validateOnce";
import {emailValidator} from "../../../../../../utils/customValidators";

// types
import {IProfileEditModalProps} from "../../types";
import {AppDispatch, RootState} from "../../../../../../store/store";
import Validator from "../../../../../../types/Validator";

const validator: Validator[] = [
  {
    required: true,
    message: 'Email is required',
  },
  {
    custom: emailValidator,
    message: 'Email is not correct',
  },
];

const ProfileEditEmail: FC<IProfileEditModalProps> = ({ close }) => {
  const dispatch: AppDispatch = useDispatch();

  const profileEmail = useSelector((state: RootState) => state.profile.user?.email);

  const [email, setEmail] = useState<string>(profileEmail || '');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (value: string) => {
    setEmail(value);
  };

  const handleSubmit = async () => {
    if (validateOnce(email, validator)) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(changeUserEmail(email));
      close();
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <View style={styles["content"]}>
      <Field
        value={email}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        submitted
        autoFocus
        keyboardType="email-address"
        validator={validator}
      />
      <Button
        buttonStyle={styles["submit"]}
        onPress={handleSubmit}
        loading={loading}
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

export default ProfileEditEmail;
