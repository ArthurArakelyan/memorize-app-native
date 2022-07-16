import React, {FC, useEffect} from "react";
import {StatusBar, StyleSheet} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import {NavigationProp, RouteProp} from "@react-navigation/native";
import changeNavigationBarColor from "react-native-navigation-bar-color";

// assets
import {primaryDark} from "../../assets/global";

interface IZoomProps {
  route: RouteProp<{ params: { url: string } }, 'params'>;
  navigation: NavigationProp<any>;
}

const Zoom: FC<IZoomProps> = ({navigation, route}) => {
  useEffect(() => {
    changeNavigationBarColor('#000000', false, false);
    StatusBar.setBackgroundColor('#000', false);

    return () => {
      changeNavigationBarColor('#F2F2F2', true, false);
      StatusBar.setBackgroundColor(primaryDark, false);
    };
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <ImageViewer
      onCancel={handleGoBack}
      onSwipeDown={handleGoBack}
      enableSwipeDown
      renderIndicator={() => <></>}
      backgroundColor="#000"
      imageUrls={[{ url: route.params.url }]}
      style={styles["viewer"]}
    />
  );
};

const styles = StyleSheet.create({
  'viewer': {
    width: '100%',
    height: '100%',
  },
});

export default Zoom;
