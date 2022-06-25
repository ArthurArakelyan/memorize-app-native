import React, {FC, useEffect} from "react";
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

// components
import Button from "../../../../components/Button";
import Memory from "./Memory";

// hooks
import useNavigate from "../../../../hooks/useNavigate";

// actions
import {getMemories, refreshMemories} from "../../../../store/memories/memories.actions";

// types
import {AppDispatch, RootState} from "../../../../store/store";

// assets
import {darkColor, primaryColor, regular, purple} from "../../../../assets/global";

const Memories: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { memories, loading, error, refreshing } = useSelector((state: RootState) => state.memories);

  useEffect(() => {
    dispatch(getMemories());
  }, []);

  if (error) {
    return (
      <View style={styles["section"]}>
        <Text style={[styles["section-text"], styles["error-text"]]}>Can't get memories</Text>
        <Button onPress={() => dispatch(getMemories)}>Try Again</Button>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles["section"]}>
        <ActivityIndicator size={100} color={primaryColor} />
      </View>
    );
  }

  if (!memories.length) {
    return (
      <View style={styles["section"]}>
        <Text style={styles["section-text"]}>You don't have memories</Text>
        <Button onPress={() => navigate('add-memory')} buttonStyle={{ backgroundColor: purple }}>Create</Button>
      </View>
    );
  }

  return (
    <FlatList
      onEndReached={() => {}} // I guess it's for pagination
      refreshControl={<RefreshControl
        refreshing={refreshing}
        colors={[primaryColor]}
        onRefresh={() => dispatch(refreshMemories())}
      />}
      data={memories}
      renderItem={({ item }) => <Memory memory={item} />}
      keyExtractor={(item) => item.id}
      style={styles["memories"]}
    />
  );
};

const styles = StyleSheet.create({
  'memories': {
    width: '100%',
    paddingHorizontal: 20,
  },
  'section': {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  'section-text': {
    fontSize: 28,
    fontFamily: regular,
    color: darkColor,
    marginBottom: 20,
  },
  'error-text': {
    fontSize: 32,
  },
});

export default Memories;
