import React, {FC, memo, useMemo} from "react";
import {Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {useSelector} from "react-redux";

// components
import UploadProfileAvatar from "./components/UploadProfileAvatar";

// hooks
import useNavigate from "../../../../hooks/useNavigate";

// types
import {RootState} from "../../../../store/store";

interface IProfileAvatarProps {
  canEdit: boolean;
}

const ProfileAvatar: FC<IProfileAvatarProps> = ({ canEdit }) => {
  const navigate = useNavigate();

  const profile = useSelector((state: RootState) => state.profile);

  const handleZoom = () => {
    navigate('zoom', {url: profile.user?.img});
  };

  if (!profile.user) {
    return null;
  }

  if (canEdit && !profile.user.img) {
    return <UploadProfileAvatar />;
  }

  if (!profile.user.img.trim()) {
    return (
      <Image
        source={require('../../../../assets/images/avatar.jpg')}
        style={styles['avatar']}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={handleZoom}>
      <Image
        source={{ uri: profile.user.img }}
        style={styles['avatar']}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  'avatar': {
    borderRadius: 50,
    width: 80,
    height: 80,
  },
});

export default memo(ProfileAvatar);
