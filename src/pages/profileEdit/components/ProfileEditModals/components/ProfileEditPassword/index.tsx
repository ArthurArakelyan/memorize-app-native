import React, {FC, useState} from "react";
import {StyleSheet, View} from "react-native";

// components
import Fields from "../../../../../../components/shared/Fields";
import Button from "../../../../../../components/shared/Button";

// services
import authService from "../../../../../../services/authService";

// utils
import handleFormDataChange from "../../../../../../utils/handleFormDataChange";
import validate from "../../../../../../utils/validate";
import showErrorToast from "../../../../../../utils/showErrorToast";
import showSuccessToast from "../../../../../../utils/showSuccessToast";

// constants
import newPasswordFields from "../../../../../../constants/newPasswordFields";
import successMessages from "../../../../../../constants/successMessages";

// types
import {IProfileEditModalProps} from "../../types";
import {NewPasswordData} from "../../../../../../types/UserInput";

const ProfileEditPassword: FC<IProfileEditModalProps> = ({ close }) => {
  const [data, setData] = useState<NewPasswordData>({
    oldPassword: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = handleFormDataChange<NewPasswordData>(setData);

  const handleSubmit = async () => {
    !submitted && setSubmitted(true);

    if (!validate(data, newPasswordFields)) {
      return;
    }

    setLoading(true);

    try {
      await authService.changePassword(data);
      showSuccessToast(successMessages.passwordChange);
      close();
    } catch (e) {
      setLoading(false);
      showErrorToast(e);
    }
  };

  return (
    <View style={styles["content"]}>
      <Fields
        fields={newPasswordFields}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitted={submitted}
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

export default ProfileEditPassword;
