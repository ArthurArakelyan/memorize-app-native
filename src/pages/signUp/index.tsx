import React, {FC, useState} from "react";
import {NavigationProp} from "@react-navigation/native";
import {useDispatch} from "react-redux";

// components
import Auth from "../../components/common/Auth";
import Fields from "../../components/Fields";

// actions
import {signUp} from "../../store/user/user.actions";

// utils
import validate from "../../utils/validate";
import handleFormDataChange from "../../utils/handleFormDataChange";

// constants
import signUpFields from "../../constants/signUpFields";

// types
import {AppDispatch} from "../../store/store";
import {SignUpData} from "../../types/UserInput";

interface ISignUpProps {
  navigation: NavigationProp<any>;
}

const SignUp: FC<ISignUpProps> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    !submitted && setSubmitted(true);

    if (!validate(data, signUpFields)) {
      return;
    }

    setLoading(true);

    dispatch(signUp(data))
      .finally(() => setLoading(false));
  };

  const handleRedirect = () => {
    navigation.navigate('sign-in');
  };

  const handleChange = handleFormDataChange<SignUpData>(setData);

  return (
    <Auth
      title="Sign Up"
      fields={<Fields
        fields={signUpFields}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitted={submitted}
      />}
      primaryAction={{
        name: 'Sign up',
        action: handleSubmit,
      }}
      secondaryActions={[{
        name: 'Log in',
        action: handleRedirect,
      }]}
      loading={loading}
    />
  );
};

export default SignUp;
