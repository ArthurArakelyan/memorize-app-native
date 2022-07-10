import React, {FC, useMemo} from "react";
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";

// components
import {Avatar} from "../../../../../components/shared";

// utils
import {getMonthName} from "../../../../../utils/date";
import addLeadingZero from "../../../../../utils/addLeadingZero";

// hooks
import useNavigate from "../../../../../hooks/useNavigate";

// assets
import {bold, medium, regular} from "../../../../../assets/global";

// types
import IMemory from "../../../../../types/Memory";

interface IMemoryProps {
  memory: IMemory;
}

const Memory: FC<IMemoryProps> = ({ memory }) => {
  const navigate = useNavigate();

  const creationDate = useMemo(() => {
    const today = new Date();
    const date = new Date(memory.date);

    let day: number | string = date.getDate();
    const minutes = addLeadingZero(date.getMinutes());
    const hours = addLeadingZero(date.getHours());

    if (today.getDate() === day) {
      day = 'Today';
    } else {
      day = `${getMonthName(date)} ${day}`;
    }

    return `${day} in ${hours}:${minutes}`;
  }, [memory.date]);

  const handleZoom = () => {
    navigate('zoom', {url: memory.img});
  };

  const handleRedirectToUser = () => {
    navigate('profile', {uid: memory.uid});
  };

  return (
    <View style={styles["memory"]}>
      <View style={styles["memory-content"]}>
        <View style={styles["memory-user"]}>
          <TouchableOpacity activeOpacity={1} onPress={handleRedirectToUser}>
            <Avatar src={memory.user?.img} />
          </TouchableOpacity>
          <View style={styles["memory-user-info"]}>
            <Text style={styles["memory-user-name"]}>{memory.user?.name}</Text>
            <Text style={styles["memory-user-date"]}>{creationDate}</Text>
          </View>
        </View>
        <Text style={styles["memory-title"]}>{memory.title}</Text>
        {!!memory.description && <Text style={styles["memory-description"]}>{memory.description}</Text>}
      </View>
      <TouchableWithoutFeedback onPress={handleZoom} style={styles["memory-img"]}>
        <Image style={styles["memory-img"]} source={{ uri: memory.img }} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  'memory': {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  'memory-content': {
    marginBottom: 10,
  },
  'memory-user': {
    minHeight: 24,
    flexDirection: 'row',
    marginBottom: 5,
  },
  'memory-user-info': {
    marginLeft: 15,
    height: '100%',
    alignContent: 'space-between',
  },
  'memory-user-name': {
    fontFamily: bold,
    color: '#000',
    fontSize: 18,
  },
  'memory-user-date': {
    color: '#525252',
    fontSize: 16,
    fontFamily: regular,
  },
  'memory-title': {
    color: '#000',
    fontSize: 24,
    fontFamily: bold,
    marginBottom: 5,
  },
  'memory-description': {
    fontSize: 16,
    fontFamily: medium,
  },
  'memory-img': {
    width: '100%',
    height: Dimensions.get('window').width - 20,
  },
});

export default Memory;
