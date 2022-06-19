import React, {FC, memo} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
} from "react-native";

// assets
import {medium, primaryColor} from "../../assets/global";

interface Props extends TouchableNativeFeedbackProps {
  loading?: boolean;
  buttonStyle?: object;
}

const Button: FC<Props> = ({loading, buttonStyle, children, ...props}) => {
  return (
    <TouchableNativeFeedback {...props}>
      <View style={[styles.button, loading && styles["button-loading"], buttonStyle]}>
        {loading &&
          <ActivityIndicator style={styles["button-loader"]} size="small" color='#fff' />
        }
        {typeof children === 'string' ?
          <Text style={styles["button-text"]}>{children}</Text> :
          children
        }
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  'button': {
    minWidth: 80,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
  'button-loading': {
    opacity: 0.8,
  },
  'button-loader': {
    marginRight: 10,
  },
  'button-text': {
    color: '#fff',
    fontSize: 18,
    fontFamily: medium,
  },
});

export default memo(Button);
