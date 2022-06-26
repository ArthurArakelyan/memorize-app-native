import React, {FC, useState} from "react";
import {NavigationProp} from "@react-navigation/native";
import {useDispatch} from "react-redux";

// components
import Auth from "../../components/common/Auth";
import Fields from "../../components/Fields";

// actions
import {signIn} from "../../store/user/user.actions";

// utils
import validate from "../../utils/validate";
import handleFormDataChange from "../../utils/handleFormDataChange";

// constants
import signInFields from "../../constants/signInFields";

// types
import {AppDispatch} from "../../store/store";
import {SignInData} from "../../types/UserInput";

interface ISignInProps {
  navigation: NavigationProp<any>;
}

const SignIn: FC<ISignInProps> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState<SignInData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = handleFormDataChange<SignInData>(setData);

  const handleSubmit = () => {
    !submitted && setSubmitted(true);

    if (!validate(data, signInFields)) {
      return;
    }

    setLoading(true);

    dispatch(signIn(data))
      .finally(() => setLoading(false));
  };

  const handleRedirect = () => {
    navigation.navigate('sign-up');
  };

  return (
    <Auth
      title='Login'
      fields={<Fields
        fields={signInFields}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitted={submitted}
      />}
      primaryAction={{
        name: 'Sign in',
        action: handleSubmit,
      }}
      secondaryActions={[
        {
          name: 'Sign up',
          action: handleRedirect,
        }
      ]}
      loading={loading}
    />
  );
};

export default SignIn;
