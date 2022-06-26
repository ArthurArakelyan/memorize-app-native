import React, {FC} from "react";
import {StyleSheet, Text, View} from "react-native";
import {TouchableRipple} from "react-native-paper";

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
  secondaryActions: Action[];
}

const Auth: FC<IAuthProps> = (props) => {
  const {
    title,
    fields,
    primaryAction,
    secondaryActions,
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
          {secondaryActions.map(({name, action}) => {
            return (
              <TouchableRipple style={{borderRadius: 3}} borderless key={name} onPress={action}>
                <Text style={styles["auth-actions-secondary"]}>
                  {name}
                </Text>
              </TouchableRipple>
            )
          })}
        </View>
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
});

export default Auth;
