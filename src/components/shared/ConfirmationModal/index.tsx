import React, {FC, memo} from "react";
import {StyleSheet, Text, View} from "react-native";

// components
import {Modal} from "../index";
import Button from "../Button";

// assets
import {darkColor, regular} from "../../../assets/global";

interface IConfirmationModalProps {
  text: string;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmationModal: FC<IConfirmationModalProps> = ({ text, onSubmit, onClose }) => {
  return (
    <Modal close={onClose}>
      <View style={styles["content"]}>
        <Text style={styles["text"]}>
          {text}
        </Text>
        <View style={styles["footer"]}>
          <Button onPress={onClose} buttonStyle={styles["cancel"]}>
            No
          </Button>
          <Button onPress={onSubmit} buttonStyle={styles["submit"]}>
            Yes
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  'content': {
    width: '100%',
  },
  'text': {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
    color: darkColor,
    fontFamily: regular,
  },
  'footer': {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 30,
  },
  'cancel': {
    marginRight: 10,
  },
  'submit': {
    backgroundColor: '#ff0000',
  },
});

export default memo(ConfirmationModal);
