import React, {FC, memo} from "react";
import {StyleSheet, Text, View} from "react-native";
import {TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// assets
import {darkColor, regular} from "../../../assets/global";

interface IModalHeaderProps {
  title: string;
  showClose?: boolean;
  onClose?: () => void;
}

const ModalHeader: FC<IModalHeaderProps> = ({ title, showClose = true, onClose }) => {
  return (
    <View style={styles["header"]}>
      <Text style={styles["title"]}>
        {title}
      </Text>
      {showClose &&
        <TouchableRipple onPress={onClose} borderless style={styles["close-wrapper"]}>
          <Icon name="close" style={styles["close"]} />
        </TouchableRipple>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  'header': {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  'title': {
    color: darkColor,
    fontSize: 28,
    fontFamily: regular,
    textTransform: 'capitalize',
  },
  'close-wrapper': {
    borderRadius: 50,
  },
  'close': {
    color: darkColor,
    fontSize: 28,
  },
});

export default memo(ModalHeader);
