import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View, ListRenderItemInfo } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  FlatList,
} from 'react-navigation';

import { Routes } from 'navigation/routes';
import { PRODUCT_STORE, IProductsStore } from 'store/productsStore';
import { styles } from './styles';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { ProductItem } from 'features/ProductItem/ProductItem';
import { IProduct } from '../../models/Products';
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
  }

  public get helloText() {
    if (!this.props[USER_SETTINGS_STORE].user.name) {
      return '';
    }
    return `Hello ${this.props[USER_SETTINGS_STORE].user.name}`;
  }

  public async componentDidMount() {
    await this.props[PRODUCT_STORE].getProducts();
  }

  public logout = () => {
    this.props[USER_SETTINGS_STORE].logout();
    this.props.navigation.navigate({ routeName: Routes.Entrypoint });
  };

  public selectProduct = (item: IProduct) => async () => {
    await this.props[PRODUCT_STORE].getProductReviews(item.id);
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
      <View style={styles.productsContainer}>
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
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {this.helloText}
          </Text>
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
