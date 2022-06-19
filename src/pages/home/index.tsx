import React, {FC} from "react";
import {StyleSheet, View} from "react-native";

// components
import Memories from "./components/Memories";
import FloatingActionButton from "../../components/FloatingActionButton";

// hooks
import useNavigate from "../../hooks/useNavigate";

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <View style={styles["home"]}>
      <Memories />
      <FloatingActionButton onPress={() => navigate('add-memory')} />
    </View>
  );
};

const styles = StyleSheet.create({
  'home': {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default Home;
