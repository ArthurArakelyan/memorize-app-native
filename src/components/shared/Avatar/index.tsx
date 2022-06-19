import React, {FC, useMemo, useState, memo} from "react";
import {Image, ImageStyle, StyleProp, StyleSheet} from "react-native";

interface Props {
  src?: string;
  style?: StyleProp<ImageStyle>;
}

const Avatar: FC<Props> = ({ style, src }) => {
  const [error, setError] = useState<boolean>(false);

  const source = useMemo(() => {
    if (!src?.trim() || error) {
      return require('../../../assets/images/avatar.jpg');
    }

    return { uri: src };
  }, [src, error]);

  return (
    <Image
      style={[styles["avatar"], style]}
      source={source}
      onError={() => setError(true)}
    />
  );
};

const styles = StyleSheet.create({
  'avatar': {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  'avatar-loading': {
    display: 'none',
  },
});

export default memo(Avatar);
