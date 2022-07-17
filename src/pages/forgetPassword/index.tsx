import React, {useState} from "react";
import {useDispatch} from "react-redux";

// components
import Auth from "../../components/common/Auth";
import Fields from "../../components/shared/Fields";

// hooks
import useNavigate from "../../hooks/useNavigate";

// services

// utils
import handleFormDataChange from "../../utils/handleFormDataChange";
import validate from "../../utils/validate";

// constants
import forgetPasswordFields from "../../constants/forgetPasswordFields";

// types
import {ForgetPasswordData} from "../../types/UserInput";
import {AppDispatch} from "../../store/store";
import authService from "../../services/authService";

const ForgetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<ForgetPasswordData>({
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = handleFormDataChange<ForgetPasswordData>(setData);

  const handleSubmit = async () => {
    !submitted && setSubmitted(true);

    if (!validate(data, forgetPasswordFields)) {
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(data);
      navigate('sign-in');
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Auth
      title="Forget Password"
      loading={loading}
      fields={<Fields
        fields={forgetPasswordFields}
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        submitted={submitted}
      />}
      primaryAction={{
        name: 'Submit',
        action: handleSubmit,
      }}
      secondaryAction={{
        name: 'Log in',
        action: () => navigate('sign-in'),
      }}
    />
  );
};

export default ForgetPassword;
