import { Field, InjectedFormikProps, withFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import {
  NavigationParams,
  NavigationScreenProp,
  FlatList,
  SafeAreaView,
} from 'react-navigation';
import * as Yup from 'yup';

import { CustomButton } from 'components/button/Button';
import { InputField } from 'components/inputField/Input';
import { i18n } from 'i18n/i18n';
import { Routes } from 'navigation/routes';
import { PRODUCT_STORE, IProductsStore } from 'store/productsStore';
import { styles } from './styles';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { theme } from 'components/sharedStyles';
import { WeatherIcon } from 'components/weatherIcon/WeatherIcon';
import { TouchableRipple, Divider } from 'react-native-paper';
import { IProduct } from '../../models/Products';

interface IProps {
  item?: IProduct;
  hideBorder?: boolean;
  hideDescription?: boolean;

  onPress?: () => void;
}

export class ProductItem extends Component<IProps> {
  public renderDescription = () =>
    this.props.hideDescription ? null : (
      <View style={styles.descriptionContainer}>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Description:</Text>
        <Text style={{ fontSize: 16 }}>{this.props.item?.text}</Text>
      </View>
    );

  public render() {
    const { item, onPress, hideBorder } = this.props;
    return (
      <View
        onTouchStart={onPress}
        style={hideBorder ? styles.containerWithoutBorder : styles.container}>
        <WeatherIcon icon={item.img} style={styles.productImage} />
        <Text style={styles.title}>{item?.title}</Text>
        {this.renderDescription()}
      </View>
    );
  }
}
