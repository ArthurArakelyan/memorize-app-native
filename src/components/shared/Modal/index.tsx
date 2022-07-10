import React, {FC} from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Portal, Modal as PaperModal} from "react-native-paper";

interface IModalProps {
  style?: StyleProp<ViewStyle>;
  close: () => void;
  visible?: boolean;
  children: JSX.Element;
}

const Modal: FC<IModalProps> = ({ style, close, visible = true, children }) => {
  return (
    <Portal>
      <PaperModal
        visible={visible}
        dismissable
        onDismiss={close}
      >
        <View style={styles["centered-view"]}>
          <View style={[styles["modal"], style]}>
            {children}
          </View>
        </View>
      </PaperModal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  'centered-view': {
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  'modal': {
    width: '80%',
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 20,
    padding: 20,
  },
});

export default Modal;
