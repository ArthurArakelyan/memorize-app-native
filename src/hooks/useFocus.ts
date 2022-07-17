import {useState} from "react";

interface IFocusHandlers {
  onFocus: () => void;
  onBlur: () => void;
}

interface IUseFocus {
  focused: boolean;
  focusHandlers: IFocusHandlers;
}

const useFocus = (): IUseFocus => {
  const [focused, setFocused] = useState(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  return {focused, focusHandlers: {onFocus, onBlur}};
};

export default useFocus;
