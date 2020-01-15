import { Field, InjectedFormikProps } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  RefreshControl,
  ListRenderItemInfo,
} from 'react-native';
import { NavigationParams, NavigationScreenProp } from 'react-navigation';
import * as Yup from 'yup';

import { AirbnbRating } from 'react-native-elements';
import { PRODUCT_STORE, IProductsStore } from 'store/productsStore';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { TextInput, Button } from 'react-native-paper';
import { ProductItem } from 'features/ProductItem/ProductItem';
import { withFormik } from '../../utils/withFormik';
import { IReview } from '../../models/Products';
import { USER_SETTINGS_STORE, IUserSettingsStore } from 'store/userSettings';
import { Routes } from 'navigation/routes';
import { styles } from './ProductInfoStyles';

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [PRODUCT_STORE]: IProductsStore;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

interface IState {
  refreshing: boolean;
  scrollY: Animated.Value;
  isCollapsed: boolean;
}

export enum Fields {
  CommentField = 'COMMENT_FIELD',
  RateField = 'RATE_FIELD',
}

export interface IFormValues {
  [Fields.CommentField]: string;
  [Fields.RateField]: number;
}

const formikEnhance = withFormik<IProps, IFormValues>({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    [Fields.CommentField]: '',
    [Fields.RateField]: 0,
  }),
  handleSubmit: async (values, formikBag) => {
    const prodID = formikBag.props[PRODUCT_STORE].selectedProductID;
    await formikBag.props[PRODUCT_STORE].postProductReview(
      values[Fields.CommentField],
      values[Fields.RateField],
    );
    await formikBag.props[PRODUCT_STORE].getProductReviews(prodID);
    await formikBag.setValues({
      [Fields.CommentField]: '',
      [Fields.RateField]: 0,
    });
  },
});

@inject(PRODUCT_STORE, USER_SETTINGS_STORE)
@formikEnhance
@observer
export class ProductInfo extends Component<
  InjectedFormikProps<IProps, IFormValues>,
  IState
> {
  constructor(props: IProps & any) {
    super(props);
    this.state = {
      refreshing: false,
      isCollapsed: true,
      scrollY: new Animated.Value(0),
    };
  }

  public get selectedItem() {
    return this.props.navigation.getParam('selected');
  }

  public logout = () => {
    this.props[USER_SETTINGS_STORE].logout();
    this.props.navigation.navigate({ routeName: Routes.Auth });
  };

  public reviewsKeyExtractor = (item: IReview) => `Review-${item.id}`;

  public renderReview = ({ item }: ListRenderItemInfo<IReview>) => (
    <View style={styles.reviewContainer}>
      <AirbnbRating
        isDisabled
        count={5}
        reviews={['Terrible', 'Bad', 'OK', 'Good', 'Amazing']}
        defaultRating={item.rate}
        size={15}
      />
      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Comment: </Text>
        <Text style={{ fontSize: 16 }}>{item.text}</Text>
      </View>
    </View>
  );

  public changeCommentText = (text: string) => {
    this.props.setFieldValue(Fields.CommentField, text);
  };

  public rate = (rate: number) => {
    this.props.setFieldValue(Fields.RateField, rate);
  };

  public onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props[PRODUCT_STORE].getProductReviews(this.selectedItem.id);
    this.setState({ refreshing: false });
  };

  public animateComment = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
    if (this.state.isCollapsed) {
      Animated.timing(this.state.scrollY, {
        toValue: 65,
        duration: 500,
      }).start();
    } else {
      Animated.timing(this.state.scrollY, {
        toValue: 0,
        duration: 500,
      }).start();
    }
  };

  public render() {
    const { filteredReviews } = this.props[PRODUCT_STORE];
    const commentOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const commentHeight = this.state.scrollY.interpolate({
      inputRange: [0, 65],
      outputRange: [0, 125],
      extrapolate: 'clamp',
    });
    const buttonOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const buttonHeight = this.state.scrollY.interpolate({
      inputRange: [0, 45],
      outputRange: [45, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View>
        <HeaderComponent
          logout={this.logout}
          navigation={this.props.navigation}
          screenTitle="Product details"
          background
        />
        <Animated.View>
          <ProductItem hideBorder item={this.selectedItem} />
          <Animated.View
            style={{ opacity: buttonOpacity, height: buttonHeight }}>
            <Button onPress={this.animateComment}>Leave your Comment</Button>
          </Animated.View>
          <Animated.View
            style={{
              opacity: commentOpacity,
              height: commentHeight,
              paddingHorizontal: 25,
            }}>
            
            <Field
              name={Fields.CommentField}
              component={TextInput}
              onChangeText={this.changeCommentText}
              mode="outlined"
              error={this.props.errors[Fields.CommentField]}
              selectionColor="#6d62ee"
              label="Leave you comment"
            />
            <Field
              name={Fields.RateField}
              component={AirbnbRating}
              count={5}
              showRating={false}
              defaultRating={0}
              onFinishRating={this.rate}
              size={15}
            />
            <View onTouchEnd={this.animateComment}>
              <Button
                disabled={!this.props.values[Fields.CommentField]}
                mode="contained"
                onPress={this.props.handleSubmit}>
                Send
              </Button>
            </View>
          </Animated.View>
        </Animated.View>

        <Animated.FlatList
          data={filteredReviews}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          // extraData={this.state.updateFlatList}
          style={{ marginBottom: 100 }}
          contentContainerStyle={{ paddingHorizontal: 25 }}
          keyExtractor={this.reviewsKeyExtractor}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          renderItem={this.renderReview}
        />
      </Animated.View>
    );
  }
}
