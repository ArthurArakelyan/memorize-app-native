import {useRef, useEffect} from "react";
import {Animated} from "react-native";

interface TimingConfig {
  toValue: number;
  duration?: number;
  delay?: number;
  start?: boolean;
}

const useAnimation = (value: number, {toValue, duration, delay, start = true}: TimingConfig) => {
  const anim = useRef(new Animated.Value(value)).current;

  useEffect(() => {
    if (start) {
      Animated.timing(anim, {
        useNativeDriver: false,
        toValue,
        duration,
        delay,
      }).start();
    } else {
      anim.setValue(0);
    }
  }, [anim, start]);

  return anim;
};

export default useAnimation;
