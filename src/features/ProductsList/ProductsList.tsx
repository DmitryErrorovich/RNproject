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

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [PRODUCT_STORE]: IProductsStore;
}

@inject(PRODUCT_STORE)
@observer
export class ProductsList extends Component<IProps> {
  public async componentDidMount() {
    await this.props[PRODUCT_STORE].getProducts();
  }

  public selectProduct = (item: number) => async () => {
    await this.props[PRODUCT_STORE].getProductReviews(item.id);
    this.props.navigation.navigate({
      routeName: Routes.ProductInfo,
      params: {
        selected: item,
      },
    });
  };

  public productKeyExtractor = (item: any) => `Product-${item.id}`;

  public renderProduct = ({ item }: ListRenderItemInfo<any>) => (
    <ProductItem
      hideDescription
      onPress={this.selectProduct(item)}
      item={item}
    />
  );

  public render() {
    const { filteredProducts } = this.props[PRODUCT_STORE];
    console.log({ filteredProducts });
    return (
      <View style={{ backgroundColor: '#465881', flex: 1 }}>
        {/* <SafeAreaView style={{ flex: 0, backgroundColor: theme.colors.primary }} /> //implement for IOS later */}
        <HeaderComponent
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
