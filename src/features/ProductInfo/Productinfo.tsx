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

import { isEqual } from 'lodash';
import { AirbnbRating } from 'react-native-elements';
import { PRODUCT_STORE, IProductsStore } from 'store/productsStore';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { TextInput, Button } from 'react-native-paper';
import { ProductItem } from 'features/ProductItem/ProductItem';
import { withFormik } from '../../utils/withFormik';
import { IReview } from '../../models/Products';
import { USER_SETTINGS_STORE, IUserSettingsStore } from 'store/userSettings';
import { Routes } from 'navigation/routes';

const COMMENT_MAX_HEIGHT = 125;
const COMMENT_MIN_HEIGHT = 0;
const COMMENT_SCROLL_DISTANCE = COMMENT_MAX_HEIGHT - COMMENT_MIN_HEIGHT;

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [PRODUCT_STORE]: IProductsStore;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

interface IState {
  refreshing: boolean;
  scrollY: Animated.Value;
}

export enum Fields {
  CommentField = 'COMMENT_FIELD',
  RateField = 'RATE_FIELD',
}

export interface IFormValues {
  [Fields.CommentField]: string;
  [Fields.RateField]: number;
}

const validationSchema = Yup.object().shape({
  CommentField: Yup.string().required('Type something please'),
  RateField: Yup.string().required('Rate it please'),
});

const formikEnhance = withFormik<IProps, IFormValues>({
  // validationSchema,
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
      scrollY: new Animated.Value(0),
      // updateFlatList: true,
    };
  }

  // public getSnapshotBeforeUpdate(prevProps: IProps) {
  //   const isReviewsChanged = !isEqual(
  //     prevProps[PRODUCT_STORE].filteredReviews,
  //     this.props[PRODUCT_STORE].filteredReviews,
  //   );

  //   return isReviewsChanged;
  // }

  // public componentDidUpdate(
  //   prevProps: IProps,
  //   prevState: IState,
  //   snapshot: boolean,
  // ) {
  //   if (snapshot) {
  //     this.setState({ updateFlatList: !prevState.updateFlatList });
  //   }
  // }

  public get selectedItem() {
    return this.props.navigation.getParam('selected');
  }

  public logout = () => {
    this.props[USER_SETTINGS_STORE].logout();
    this.props.navigation.navigate({ routeName: Routes.Auth });
  };

  public reviewsKeyExtractor = (item: IReview) => `Review-${item.id}`;

  public renderReview = ({ item }: ListRenderItemInfo<IReview>) => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        borderRadius: 8,
        borderColor: '#eee',
        borderWidth: 1,
      }}>
      <AirbnbRating
        isDisabled
        count={5}
        reviews={['Terrible', 'Bad', 'OK', 'Good', 'Amazing']}
        defaultRating={item.rate}
        size={15}
      />
      <View style={{ marginTop: 15 }}>
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

  public render() {
    const { filteredReviews } = this.props[PRODUCT_STORE];
    const commentOpacity = this.state.scrollY.interpolate({
      inputRange: [0, COMMENT_MIN_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const commentHeight = this.state.scrollY.interpolate({
      inputRange: [0, COMMENT_SCROLL_DISTANCE],
      outputRange: [COMMENT_MAX_HEIGHT, COMMENT_MIN_HEIGHT],
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
        <Animated.View
          style={{ elevation: 15, borderBottomColor: '#eee', borderBottomWidth: 2 }}>
          <ProductItem hideBorder item={this.selectedItem} />
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

            <Button
              disabled={!this.props.values[Fields.CommentField]}
              mode="contained"
              onPress={this.props.handleSubmit}>
              Send
            </Button>
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
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
        />
      </Animated.View>
    );
  }
}
