import React from "react";
import {StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";

// components
import {Avatar} from "../../components/shared";

// types
import {RootState} from "../../store/store";

const Account = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles["account"]}>
      <View style={styles["account-user"]}>
        <Avatar style={styles["account-user-avatar"]} src={user.img} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  'account': {
    padding: 20,
    width: '100%',
  },
  'account-user': {
    width: '100%',
  },
  'account-user-avatar': {
    width: 100,
    height: 100,
  },
});

export default Account;
