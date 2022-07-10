import React, {FC} from "react";
import {Provider as PaperProvider, DefaultTheme} from "react-native-paper";
import {Provider} from "react-redux";

// store
import store from "./store/store";

interface IProvidersProps {
  children: JSX.Element | JSX.Element[];
}

const Providers: FC<IProvidersProps> = ({children}) => {
  return (
    <Provider store={store}>
      <PaperProvider theme={DefaultTheme}>
          {children}
      </PaperProvider>
    </Provider>
  );
};

export default Providers;
