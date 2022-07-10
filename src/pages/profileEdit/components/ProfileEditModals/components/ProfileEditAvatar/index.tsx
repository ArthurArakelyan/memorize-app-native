import React, {FC, useState} from "react";
import {StyleSheet, View} from "react-native";
import {useDispatch} from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

// components
import Button from "../../../../../../components/Button";

// actions
import {deleteUserAvatar, uploadUserAvatar} from "../../../../../../store/user/user.actions";

// utils
import upload from "../../../../../../utils/upload";

// types
import {IProfileEditModalProps} from "../../types";
import {AppDispatch} from "../../../../../../store/store";

const ProfileEditAvatar: FC<IProfileEditModalProps> = ({ close }) => {
  const dispatch: AppDispatch = useDispatch();

  const [loading, setLoading] = useState<string>('');

  const handleUpload = () => {
    if (loading) return;

    upload(async (img) => {
      try {
        setLoading('upload');
        await dispatch(uploadUserAvatar(img.uri as string));
        close();
      } catch (e) {
        setLoading('');
      }
    });
  };

  const handleDelete = async () => {
    if (loading) return;

    setLoading('delete');

    try {
      await dispatch(deleteUserAvatar());
      close();
    } catch (e) {
      setLoading('');
    }
  };

  return (
    <View style={styles["content"]}>
      <Button
        loading={loading === 'upload'}
        icon={<Icon name="file-upload" style={styles["button-icon"]} />}
        buttonStyle={styles["button"]}
        onPress={handleUpload}
      >
        Upload
      </Button>
      <Button
        loading={loading === 'delete'}
        icon={<Icon name="delete" style={styles["button-icon"]} />}
        buttonStyle={[styles["button"], styles["button-delete"]]}
        onPress={handleDelete}
      >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  'content': {
    width: '100%',
  },
  'button': {
    width: '100%',
    margin: 0,
  },
  'button-delete': {
    backgroundColor: '#ff0000',
    marginTop: 20,
  },
  'button-icon': {
    color: '#ffffff',
    fontSize: 20,
    marginRight: 10,
  },
});

export default ProfileEditAvatar;
