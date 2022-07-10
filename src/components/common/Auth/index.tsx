import React, {FC} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";

// components
import Button from "../../Button";

// assets
import {gray, medium, regular, secondaryColor} from "../../../assets/global";

interface Action {
  name: string;
  action: () => void;
}

interface IAuthProps {
  title: string;
  loading: boolean;
  fields: JSX.Element | JSX.Element[];
  primaryAction: Action;
  secondaryAction?: Action;
  thirdAction?: Action;
}

const Auth: FC<IAuthProps> = (props) => {
  const {
    title,
    fields,
    primaryAction,
    secondaryAction,
    thirdAction,
    loading,
  } = props;

  return (
    <View style={styles["auth"]}>
      <View style={styles["auth-content"]}>
        <Text style={styles["auth-title"]}>{title}</Text>

        <View style={styles["auth-fields"]}>
          {fields}
        </View>

        <View style={styles["auth-actions"]}>
          <Button onPress={loading ? undefined : primaryAction.action} loading={loading}>
            {primaryAction.name}
          </Button>
          {secondaryAction && <TouchableOpacity activeOpacity={0.6} onPress={secondaryAction.action}>
            <Text style={styles["auth-actions-secondary"]}>
              {secondaryAction.name}
            </Text>
          </TouchableOpacity>}
        </View>

        {thirdAction &&
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={thirdAction.action}
            style={styles["auth-actions-third__wrapper"]}
          >
            <Text style={styles["auth-actions-third"]}>
              {thirdAction.name}
            </Text>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  'auth': {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'auth-content': {
    width: '90%',
    minHeight: '80%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)',
    borderColor: gray,
    borderWidth: 1,
  },
  'auth-title': {
    width: '100%',
    textAlign: 'center',
    fontFamily: medium,
    fontSize: 32,
    color: '#000',
  },
  'auth-fields': {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  'auth-actions': {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  'auth-actions-secondary': {
    color: secondaryColor,
    fontSize: 22,
    fontFamily: regular,
    paddingVertical: 5,
    paddingHorizontal: 10,
    textDecorationLine: 'underline',
  },
  'auth-actions-third__wrapper': {
    marginTop: 15,
    paddingVertical: 5,
  },
  'auth-actions-third': {
    color: secondaryColor,
    fontSize: 18,
    fontFamily: regular,
    textDecorationLine: 'underline',
  },
});

export default Auth;
