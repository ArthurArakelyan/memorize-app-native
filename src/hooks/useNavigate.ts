import {CommonActions, useNavigation} from "@react-navigation/native";

const useNavigate = () => {
  const navigation = useNavigation();

  return (to: string, params?: any) => {
    navigation.dispatch(CommonActions.navigate({
      name: to,
      params,
    }));
  };
};

export default useNavigate;
