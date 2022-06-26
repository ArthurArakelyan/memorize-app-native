import React, {FC} from "react";
import {StyleSheet} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import {NavigationProp, RouteProp} from "@react-navigation/native";

interface IZoomProps {
  route: RouteProp<{ params: { url: string } }, 'params'>;
  navigation: NavigationProp<any>;
}

const Zoom: FC<IZoomProps> = ({navigation, route}) => {
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
      backgroundColor='#fff'
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
