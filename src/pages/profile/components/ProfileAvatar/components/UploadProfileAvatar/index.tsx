import React, {memo, useState} from "react";
import {ActivityIndicator, StyleSheet, TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";
import Icon from "react-native-vector-icons/Feather";

// actions
import {uploadUserAvatar} from "../../../../../../store/user/user.actions";

// utils
import upload from "../../../../../../utils/upload";

// assets
import {gray, primaryLight} from "../../../../../../assets/global";

// types
import {AppDispatch} from "../../../../../../store/store";

const UploadProfileAvatar = () => {
  const [loading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleUpload = () => {
    if (loading) {
      return;
    }

    upload((img) => {
      setLoading(true);

      dispatch(uploadUserAvatar(img.uri as string))
        .catch(() => setLoading(false));
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handleUpload}
      style={[styles["avatar-upload"], loading && styles["avatar-upload__loading"]]}
    >
      {loading ?
        <ActivityIndicator size={32} color={primaryLight} />
        :
        <Icon name="plus" size={36} color={primaryLight} />
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  'avatar-upload': {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  'avatar-upload__loading': {
    opacity: 0.6,
  },
});

export default memo(UploadProfileAvatar);
