import React from "react";
import Colors from "../../constants/Colors";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import * as Elements from "react-native-elements";

import Logo from "../../assets/images/logo_black.png";
import Arrow from "../../assets/icons/arrow-left-black.png";

export default class Header extends React.Component {
  renderCenterComponent = () => {
    return (
      <Image
        style={{
          height: 20,
          resizeMode: "contain",
          alignSelf: "center"
        }}
        source={Logo}
      />
    );
  };

  renderLeftComponent = () => {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
        <Image
          style={{
            height: 20,
            resizeMode: "contain"
          }}
          source={Arrow}
        />
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View>
        <Elements.Header
          backgroundColor="transparent"
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
