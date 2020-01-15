import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import { Appbar } from 'react-native-paper';

import { styles } from './headerComponentStyle';
import Icon from 'react-native-vector-icons/AntDesign';

interface IHeaderProps {
  screenTitle: string;
  navigation: any;
  background?: boolean;
  hideBackButton?: boolean;
  goBack?: () => void;
  logout?: () => void;
}

export class HeaderComponent extends PureComponent<IHeaderProps> {
  public get contentStyle() {
    return this.props.hideBackButton
      ? { justifyContent: 'center', alignItems: 'center' }
      : null;
  }

  public get textColor() {
    return '#fff';
  }

  public get backButtonStyle() {
    return Platform.select({
      ios: styles.iosBackButton,
      android: null,
    });
  }

  public backPressed() {
    this.goBack();
  }

  public goBack = () => {
    if (this.props.goBack) {
      this.props.goBack();
    } else {
      this.props.navigation.pop();
    }
  };

  public renderBackButton = () => {
    return !this.props.hideBackButton ? (
      <Appbar.BackAction
        style={this.backButtonStyle}
        color={this.textColor}
        onPress={this.goBack}
      />
    ) : null;
  };

  public render() {
    const headerStyle = this.props.background
      ? styles.appBarTop
      : styles.cleanAppBarTop;

    return (
      <View>
        <Appbar.Header style={headerStyle}>
          {this.renderBackButton()}
          <Appbar.Content
            style={this.contentStyle}
            title={this.props.screenTitle}
            color={this.textColor}
          />
          <Icon
            onPress={this.props.logout}
            style={{ marginRight: 5 }}
            name="logout"
            size={25}
            color="#fff"
          />
        </Appbar.Header>

      </View>
    );
  }
}
