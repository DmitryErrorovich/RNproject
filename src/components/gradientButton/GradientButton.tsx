import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { styles } from "./GradientButtonStyle";

interface Props {
  gradientColors: string[];
  action: any;
  text: string;
  isDarkMode?: boolean;
  isDisabled?: boolean;
}

interface State {
  isDisabled: boolean;
}

export class GradientButtonComponent extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDisabled: this.props.isDisabled ? true : false
    };
  }

  componentDidUpdate(prevProps: any) {
    if (
      this.props.isDisabled !== undefined &&
      this.props.isDisabled !== prevProps.isDisabled
    ) {
      this.setState({ isDisabled: this.props.isDisabled });
    }
  }

  render() {
    if (this.state.isDisabled) {
      return (
        <View style={styles.componentWrapper as ViewStyle}>
          <LinearGradient
            colors={["#A9A9A9", "#A9A9A9"]}
            style={styles.linearGradient as ViewStyle}
          >
            <Text style={styles.buttonTextDarkMode as ViewStyle}>
              {this.props.text.toUpperCase()}
            </Text>
          </LinearGradient>
        </View>
      );
    } else {
      return (
        <View style={styles.componentWrapper as ViewStyle}>
          <TouchableOpacity onPress={this.props.action}>
            <LinearGradient
              colors={this.props.gradientColors}
              style={styles.linearGradient as ViewStyle}
            >
              <Text
                style={[
                  this.props.isDarkMode
                    ? (styles.buttonTextDarkMode as ViewStyle)
                    : (styles.buttonText as ViewStyle)
                ]}
              >
                {this.props.text.toUpperCase()}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
