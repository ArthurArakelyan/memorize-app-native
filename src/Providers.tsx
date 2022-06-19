import React, {FC} from "react";
import {Provider as PaperProvider, DefaultTheme} from "react-native-paper";
import {Provider} from "react-redux";

// store
import store from "./store/store";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Providers: FC<Props> = ({children}) => {
  return (
    <PaperProvider theme={DefaultTheme}>
      <Provider store={store}>
        {children}
      </Provider>
    </PaperProvider>
  );
};

export default Providers;
