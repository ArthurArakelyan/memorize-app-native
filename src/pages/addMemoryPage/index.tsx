import React, {useState} from "react";
import {Dimensions, Image, ScrollView, StyleSheet, View} from "react-native";
import {useDispatch} from "react-redux";
import {TouchableRipple} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import AntIcon from "react-native-vector-icons/AntDesign";

// components
import {Fields, Button} from "../../components/shared";

// actions
import {addMemory} from "../../store/memories/memories.actions";

// utils
import handleFormDataChange from "../../utils/handleFormDataChange";
import validate from "../../utils/validate";
import upload from "../../utils/upload";
import showErrorToast from "../../utils/showErrorToast";
import showSuccessToast from "../../utils/showSuccessToast";

// hooks
import useNavigate from "../../hooks/useNavigate";

// constants
import addMemoryFields from "../../constants/addMemoryFields";
import successMessages from "../../constants/successMessages";

// types
import {MemoryData} from "../../types/UserInput";
import {AppDispatch} from "../../store/store";

// assets
import {purple} from "../../assets/global";

const AddMemoryPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState<MemoryData>({
    title: '',
    description: '',
    img: null,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    !submitted && setSubmitted(true);

    if (!validate(data, addMemoryFields)) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(addMemory(data));
      showSuccessToast(successMessages.addMemory);
      navigate('home');
    } catch (e) {
      setLoading(false);
      showErrorToast(e);
    }
  };

  const handleChange = handleFormDataChange<MemoryData>(setData);

  const handleChooseImage = () => {
    upload((img) => {
      setData((prevState) => ({
        ...prevState,
        img,
      }));
    });
  };

  const handleRemoveImage = () => setData((prevState) => ({
    ...prevState,
    img: null,
  }));

  return (
    <ScrollView contentContainerStyle={styles["page"]}>
      <View style={styles["fields"]}>
        <Fields
          fields={addMemoryFields}
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitted={submitted}
        />
      </View>

      {data.img ?
        <View style={styles["uploaded-image-wrapper"]}>
          <Image style={styles["uploaded-image"]} source={{ uri: data.img?.uri }} />
          {!loading && <TouchableRipple style={styles["uploaded-image-icon"]} borderless onPress={handleRemoveImage}>
            <AntIcon name="closecircle" color="red" size={30} />
          </TouchableRipple>}
        </View>
        :
        <Button
          buttonStyle={styles["upload"]}
          onPress={handleChooseImage}
        >
          <Icon name="photo" style={styles["upload-icon"]} size={40} />
        </Button>
      }

      <Button
        buttonStyle={styles["submit"]}
        onPress={handleSubmit}
        loading={loading}
      >
        POST
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  'page': {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  'fields': {
    width: '100%',
  },
  'upload': {
    width: '100%',
  },
  'upload-icon': {
    color: '#fff',
  },
  'uploaded-image-wrapper': {
    position: 'relative',
    width: '100%',
    height: Dimensions.get('window').width - 40,
  },
  'uploaded-image-icon': {
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 50,
  },
  'uploaded-image': {
    width: '100%',
    height: '100%',
  },
  'submit': {
    width: '100%',
    marginTop: 20,
    backgroundColor: purple,
  },
});

export default AddMemoryPage;
