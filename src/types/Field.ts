import {TextInputProps} from "react-native";

// types
import Validator from "./Validator";

interface Field extends TextInputProps {
  name: string;
  label: string;
  validators: Validator[];
}

export default Field;
