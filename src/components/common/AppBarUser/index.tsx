import React, {useEffect} from "react";
import {StyleSheet} from "react-native";
import {TouchableRipple} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";

// components
import {Avatar} from "../../shared";

// actions
import {getUser} from "../../../store/user/user.actions";

// hooks
import useNavigate from "../../../hooks/useNavigate";

// types
import {AppDispatch, RootState} from "../../../store/store";

const AppBarUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user?.id) {
      dispatch(getUser());
    }
  }, []);

  return (
    <TouchableRipple
      style={styles["avatar-wrapper"]}
      borderless
      onPress={() => navigate('profile')}
    >
      <Avatar src={user?.img} style={styles["avatar"]} />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  'avatar-wrapper': {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  'avatar': {
    width: 40,
    height: 40,
  },
});

export default AppBarUser;
