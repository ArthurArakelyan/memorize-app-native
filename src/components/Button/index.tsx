import React, {FC, memo} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

// assets
import {medium, primaryColor} from "../../assets/global";

interface IButtonProps extends TouchableNativeFeedbackProps {
  loading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  icon?: JSX.Element;
}

const Button: FC<IButtonProps> = ({loading, disabled, buttonStyle, icon, children, ...props}) => {
  return (
    <TouchableNativeFeedback disabled={disabled} {...props}>
      <View style={[styles.button, disabled && styles["button-loading"], loading && styles["button-loading"], buttonStyle]}>
        {loading &&
          <ActivityIndicator style={styles["button-loader"]} size="small" color='#fff' />
        }
        {typeof children === 'string' ?
          <>
            {icon}
            <Text style={styles["button-text"]}>{children}</Text>
          </> :
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
