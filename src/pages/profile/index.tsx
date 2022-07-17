import React, {useEffect, FC, useMemo, useCallback} from "react";
import {StyleSheet, Text, View, ScrollView, ActivityIndicator} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RouteProp} from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// components
import ProfileAvatar from "./components/ProfileAvatar";
import ProfilePosts from "./components/ProfilePosts";
import Button from "../../components/shared/Button";

// hooks
import useNavigate from "../../hooks/useNavigate";

// actions
import {getProfile, resetProfile} from "../../store/profile/profile.actions";

// assets
import {bold, darkColor} from "../../assets/global";

// types
import {AppDispatch, RootState} from "../../store/store";

interface IProfileProps {
  route: RouteProp<{ params: { uid: string } }, 'params'>;
}

const Profile: FC<IProfileProps> = ({ route }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state: RootState) => state.profile);
  const user = useSelector((state: RootState) => state.user);

  const canEdit = useMemo(() => profile.user?.id === user.id, [profile, user]);

  useEffect(() => {
    dispatch(getProfile(route.params.uid));

    return () => void(dispatch(resetProfile()));
  }, []);

  const handleEdit = useCallback(() => {
    navigate('profile-edit');
  }, [navigate]);

  return (
    <ScrollView contentContainerStyle={styles["profile"]}>
      <View style={styles["profile-header"]}>
        {profile.loading ?
          <View style={styles["profile-header__loader"]}>
            <ActivityIndicator size={62} color="rgba(0, 0, 0, 0.2)" />
          </View>
          :
          <>
            <ProfileAvatar canEdit={canEdit} />
            <Text style={styles["profile-header__name"]}>
              {profile.user?.name}
            </Text>
          </>
        }
      </View>
      {canEdit &&
        <Button
          icon={<Icon style={styles['profile-edit__icon']} name="account-edit" />}
          buttonStyle={styles["profile-edit"]}
          onPress={handleEdit}
        >
          Edit Profile
        </Button>
      }
      <View style={styles["profile-main"]}>
        <View style={styles["profile-posts__header"]}>
          <Text style={styles['profile-posts__count']}>
            {profile.memories.length.toString()} POSTS
          </Text>
          {profile.memoriesLoading &&
            <View style={styles["profile-posts__count_loader"]}>
              <ActivityIndicator size={20} color="rgba(0, 0, 0, 0.2)" />
            </View>
          }
        </View>
        {profile.user && <ProfilePosts uid={route.params.uid} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  'profile': {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  'profile-header': {
    width: '100%',
    minHeight: 80,
    alignItems: 'center',
    flexDirection: 'row',
  },
  'profile-header__loader': {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  'profile-header__name': {
    maxWidth: '65%',
    color: darkColor,
    marginLeft: 15,
    fontSize: 20,
    fontFamily: bold,
  },

  'profile-edit': {
    marginTop: 20,
    width: '100%',
    backgroundColor: 'rgba(71, 71, 71, 0.3)',
  },
  'profile-edit__icon': {
    color: '#fff',
    fontSize: 22,
    marginRight: 5,
  },

  'profile-main': {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  'profile-posts__header': {
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
  'profile-posts__count': {
    color: darkColor,
    fontSize: 18,
    fontFamily: bold,
    marginBottom: 10,
  },
  'profile-posts__count_loader': {
    position: 'absolute',
    right: 0,
    top: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
