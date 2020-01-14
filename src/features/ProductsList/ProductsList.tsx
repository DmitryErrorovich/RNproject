import { Field, InjectedFormikProps, withFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import {
  NavigationParams,
  NavigationScreenProp,
  FlatList,
  SafeAreaView,
} from 'react-navigation';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';

import { CustomButton } from 'components/button/Button';
import { InputField } from 'components/inputField/Input';
import { i18n } from 'i18n/i18n';
import { Routes } from 'navigation/routes';
import { PRODUCT_STORE, IProductsStore } from 'store/productsStore';
import { styles } from './styles';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { theme } from 'components/sharedStyles';
import { WeatherIcon } from 'components/weatherIcon/WeatherIcon';
import { ProductItem } from 'features/ProductItem/ProductItem';
import { IProduct } from '../../models/Products';
import NetInfo from '@react-native-community/netinfo';
import { USER_SETTINGS_STORE, IUserSettingsStore } from 'store/userSettings';

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [PRODUCT_STORE]: IProductsStore;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

interface IState {
  isConnected: boolean;
}

@inject(PRODUCT_STORE, USER_SETTINGS_STORE)
@observer
export class ProductsList extends Component<IProps, IState> {
  constructor(props: IProps & any) {
    super(props);
    this.state = {
      isConnected: true,
    };
    NetInfo.fetch().then((isConnected: boolean) => {
      this.setState({ isConnected });
    });
  }

  public async componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);

    await this.props[PRODUCT_STORE].getProducts();
  }

  public componentWillUnmount() {
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }

  public handleConnectivityChange = (isConnected: boolean) => {
    console.log({ isConnected });
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  public logout = () => {
    this.props[USER_SETTINGS_STORE].logout();
    this.props.navigation.navigate({ routeName: Routes.Entrypoint });
  };

  public selectProduct = (item: IProduct) => async () => {
    if (
      !isEmpty(this.props[PRODUCT_STORE].reviews) &&
      this.props[PRODUCT_STORE].reviews[0].product !== item.id
    ) {
      await this.props[PRODUCT_STORE].getProductReviews(item.id);
    }
    this.props.navigation.navigate({
      routeName: Routes.ProductInfo,
      params: {
        selected: item,
      },
    });
  };

  public productKeyExtractor = (item: IProduct) => `Product-${item.id}`;

  public renderProduct = ({ item }: ListRenderItemInfo<IProduct>) => (
    <ProductItem
      hideDescription
      onPress={this.selectProduct(item)}
      item={item}
    />
  );

  public render() {
    const { filteredProducts } = this.props[PRODUCT_STORE];
    return (
      <View style={{ backgroundColor: '#465881', flex: 1 }}>
        {/* <SafeAreaView style={{ flex: 0, backgroundColor: theme.colors.primary }} /> //implement for IOS later */}
        <HeaderComponent
          logout={this.logout}
          hideBackButton
          style={{ marginTop: -100 }}
          background
          screenTitle="Products"
          navigation={this.props.navigation}
        />
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.productsList}
            data={filteredProducts}
            keyExtractor={this.productKeyExtractor}
            renderItem={this.renderProduct}
          />
        </View>
      </View>
    );
  }
}
