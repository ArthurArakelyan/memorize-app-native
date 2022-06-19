import React, {FC} from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {FAB} from "react-native-paper";

// assets
import {purple} from "../../assets/global";

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  icon?: string;
  disabled?: boolean;
}

const FloatingActionButton: FC<Props> = ({ style, onPress, icon = 'plus', disabled }) => {
  return (
    <View style={styles["fab-wrapper"]}>
      <FAB
        style={[styles["fab"], style]}
        onPress={onPress}
        icon={icon}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  'fab-wrapper': {
    position: 'absolute',
    bottom: 20,
    right: 15,
  },
  'fab': {
    backgroundColor: purple,
  },
});

export default FloatingActionButton;
