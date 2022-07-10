import React, {FC, memo, useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

// components
import Memory from "../../../home/components/Memories/Memory";

// actions
import {getProfileMemories} from "../../../../store/profile/profile.actions";

// types
import {AppDispatch, RootState} from "../../../../store/store";

interface IProfilePostsProps {
  uid: string;
}

const ProfilePosts: FC<IProfilePostsProps> = ({ uid }) => {
  const dispatch: AppDispatch = useDispatch();

  const memories = useSelector((state: RootState) => state.profile.memories);

  useEffect(() => {
    dispatch(getProfileMemories(uid));
  }, []);

  return (
    <View style={styles["profile-posts"]}>
      {memories.map((memory) => {
        return (
          <Memory key={memory.id} memory={memory} />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  'profile-posts': {
    width: '100%',
    marginTop: 20,
  },
});

export default memo(ProfilePosts);
