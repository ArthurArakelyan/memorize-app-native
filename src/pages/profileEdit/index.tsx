import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch} from "react-redux";
import {TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

// components
import ProfileEditOption from "./components/ProfileEditOption";
import ProfileEditModals from "./components/ProfileEditModals";
import ConfirmationModal from "../../components/ConfirmationModal";

// actions
import {signOut} from "../../store/user/user.actions";

// types
import IProfileEditOption from "../../types/ProfileEditOption";
import {AppDispatch} from "../../store/store";

// assets
import {regular} from "../../assets/global";

const ProfileEdit = () => {
  const dispatch: AppDispatch = useDispatch();

  const [modal, setModal] = useState<string>('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);

  const handleClick = (modal: string) => {
    setModal(modal);
  };

  const handleClose = () => {
    setModal('');
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  const handleToggleConfirmationModal = () => {
    setIsConfirmationModalOpen((prevState) => !prevState);
  };

  const options: IProfileEditOption[] = [
    {
      name: 'Avatar',
      click: () => handleClick('avatar'),
    },
    {
      name: 'Name',
      click: () => handleClick('name'),
    },
    {
      name: 'Password',
      click: () => handleClick('password'),
    },
    {
      name: 'Email',
      click: () => handleClick('email'),
    },
  ];

  return (
    <View style={styles["profile-edit"]}>
      <ScrollView contentContainerStyle={styles["options"]}>
        {options.map((option, index) => {
          return (
            <ProfileEditOption
              key={option.name}
              option={option}
              isFirst={index === 0}
            />
          );
        })}
      </ScrollView>

      <TouchableRipple
        style={styles["logout"]}
        onPress={handleToggleConfirmationModal}
      >
        <>
          <Icon name="logout" style={styles["logout-icon"]} />
          <Text style={styles["logout-text"]}>Log out</Text>
        </>
      </TouchableRipple>

      {isConfirmationModalOpen && <ConfirmationModal
        text="Are you sure, you want to logout?"
        onSubmit={handleLogout}
        onClose={handleToggleConfirmationModal}
      />}

      <ProfileEditModals name={modal} close={handleClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  'profile-edit': {
    height: '100%',
    paddingBottom: 20,
  },
  'options': {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
  },
  'logout': {
    width: '100%',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'logout-text': {
    color: '#ff0000',
    fontSize: 20,
    fontFamily: regular,
  },
  'logout-icon': {
    marginRight: 10,
    color: '#ff0000',
    fontSize: 20,
  },
});

export default ProfileEdit;
