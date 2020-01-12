import React, { PureComponent } from "react";
import { View, Platform, Text } from "react-native";
import { Appbar, Menu } from "react-native-paper";

import { styles } from "./headerComponentStyle";
import { CustomButton } from "components/button/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/AntDesign';

interface IHeaderProps {
  screenTitle: string;
  navigation: any;
  analyticsScreenName: string;
  onPress?: any;
  background?: boolean;
  leavingPageMessage?: string;
  menuButtons?: any;
  visibleDropdown?: boolean;
  hideBackButton: boolean;
  disableNotice?: boolean;
  goBack?: () => void;
  showHeaderDropDown?: () => void;
  hideDropDown?: () => void;
  logout?: () => void;
}

interface IHeaderState {
  visible: boolean;
}

export class HeaderComponent extends PureComponent<
  IHeaderProps,
  IHeaderState
  > {
  constructor(props: ScreenHeaderProps) {
    super(props);
    this.state = { visible: false };
  }

  public get contentStyle() {
    return this.props.hideBackButton ? { justifyContent: 'center', alignItems: 'center' } : null
  }

  static defaultProps = {
    visibleDropdown: false,
    hideDropDown: () => { }
  };

  public get textColor() {
    return '#fff';
  };

  public get backButtonStyle() {
    return Platform.select({
      ios: styles.iosBackButton,
      android: null
    });
  }

  public hideDropdown = () => this.setState({ visible: false });

  public showDropdown = () => this.setState({ visible: true });

  public backPressed() {
    if (this.props.leavingPageMessage) {
      AlertService.showYesNoAlert(
        "",
        this.props.leavingPageMessage,
        this.goBack,
        null
      );
    } else {
      this.goBack();
    }
  }

  public goBack = () => {
    if (this.props.goBack) {
      this.props.goBack();
    } else {
      this.props.navigation.pop();
    }
  };

  public renderMoreButton = () => {
    if (this.props.menuButtons) {
      return (
        <Appbar.Action
          color={this.textColor}
          icon="dots-vertical"
          onPress={this.props.showHeaderDropDown}
        />
      );
    }

    return null;
  };

  public renderBackButton = () => {
    return !this.props.hideBackButton ? (<Appbar.BackAction
      style={this.backButtonStyle}
      color={this.textColor}
      onPress={this.goBack}
    />) : null
  }

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
          <TouchableOpacity onPress={this.props.logout}>
            <Icon style={{marginRight: 5}} name="logout" size={25} color="#fff"/>
          </TouchableOpacity>
        </Appbar.Header>

        {/* {!this.props.disableNotice && <OfflineNotice />} */}
      </View>
    );
  }
}
