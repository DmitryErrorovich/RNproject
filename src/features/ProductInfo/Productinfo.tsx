import { Field, InjectedFormikProps, withFormik } from "formik";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Alert, Text, View, CameraRoll, Dimensions, Animated } from "react-native";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import Swipeable from "react-native-swipeable";
import {
  NavigationParams,
  NavigationScreenProp,
  FlatList,
  SafeAreaView
} from "react-navigation";
import * as Yup from "yup";

import { CustomButton } from "components/button/Button";
import { InputField } from "components/inputField/Input";
import { Rating, AirbnbRating } from 'react-native-elements';
import { i18n } from "i18n/i18n";
import { Routes } from "navigation/routes";
import { PRODUCT_STORE, IProductsStore } from "store/productsStore";
import { styles } from "./styles";
import { HeaderComponent } from "components/headerComponent/headerComponent";
import { theme } from "components/sharedStyles";
import { WeatherIcon } from "components/weatherIcon/WeatherIcon";
import { TouchableRipple, TextInput, Button } from "react-native-paper";
import { ProductItem } from "features/ProductItem/ProductItem";

const COMMENT_MAX_HEIGHT = 125;
const COMMENT_MIN_HEIGHT = 0;
const COMMENT_SCROLL_DISTANCE = COMMENT_MAX_HEIGHT - COMMENT_MIN_HEIGHT;

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [PRODUCT_STORE]: IProductsStore;
}

export enum Fields {
  CommentField = "COMMENT_FIELD",
  RateField = "RATE_FIELD",
}

export interface IFormValues {
  [Fields.CommentField]: string;
  [Fields.RateField]: number;
}

const validationSchema = Yup.object().shape({
  CommentField: Yup.string()
    .required("Type something please"),
  RateField: Yup.string()
    .required("Rate it please")
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: () => ({
    [Fields.CommentField]: '',
    [Fields.RateField]: 0
  }),
  handleSubmit: async (values, formikBag) => {
    console.log('POST')
    await formikBag.props[PRODUCT_STORE].postProductReview(values[Fields.CommentField], values[Fields.RateField])
  }
});

@inject(PRODUCT_STORE)
@formikEnhance
@observer
export class ProductInfo extends Component<InjectedFormikProps<IProps, IFormValues>> {

  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    }
  }

  public get selectedItem() {
    return this.props.navigation.getParam('selected');
  }

  public reviewsKeyExtractor = (item: any) => `Review-${item.id}`

  public renderReview = ({ item }: any) => (
    <View style={{ flex: 1, alignItems: "center", marginBottom: 20, padding: 15, borderRadius: 8, borderColor: '#eee', borderWidth: 1 }}>
      <AirbnbRating
        isDisabled
        count={5}
        reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
        defaultRating={item.rate}
        size={15}
      />
      <View style={{ marginTop: 15 }} >
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Comment: </Text>
        <Text style={{ fontSize: 16 }}>
          {item.text}
        </Text>
      </View>
    </View>
  )

  public changeCommentText = (text: string) => {
    console.log(text)
    this.props.setFieldValue(Fields.CommentField, text)
    console.log({ values: this.props.values })
  }

  public rate = (rate: number) => {
    console.log({ rate })
    this.props.setFieldValue(Fields.RateField, rate)
  }

  public render() {
    let _scrollView: any;
    const { reviews } = this.props[PRODUCT_STORE];
    const commentOpacity = this.state.scrollY.interpolate({
      inputRange: [0, COMMENT_SCROLL_DISTANCE],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const commentHeight = this.state.scrollY.interpolate({
      inputRange: [0, COMMENT_MAX_HEIGHT],
      outputRange: [COMMENT_MAX_HEIGHT, COMMENT_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const onScrollEndSnapToEdge = (event: any) => {
      const y = event.nativeEvent.contentOffset.y;

      if (0 < y && y < COMMENT_SCROLL_DISTANCE / 2) {
        if (_scrollView) {
          _scrollView.scrollToOffset({ offset: 0, animated: false });
        }
      } else if (COMMENT_SCROLL_DISTANCE / 2 <= y && y < COMMENT_SCROLL_DISTANCE) {
        if (_scrollView) {
          _scrollView.scrollToOffset({ offset: COMMENT_SCROLL_DISTANCE, animated: false });
        }
      }
    };
    console.log(this.props.errors)
    return (
      <Animated.View>
        <HeaderComponent
          navigation={this.props.navigation}
          screenTitle='Product details'
          background
        />
        <Animated.View style={{ borderBottomColor: '#eee', borderBottomWidth: 2 }}>
          <ProductItem
            hideBorder
            item={this.selectedItem}
          />
          <Animated.View style={{ opacity: commentOpacity, height: commentHeight, paddingHorizontal: 25 }}>

            <Field
              name={Fields.CommentField}
              component={TextInput}
              onChangeText={this.changeCommentText}
              mode='outlined'
              error={this.props.errors[Fields.CommentField]}
              selectionColor='#6d62ee'
              label='Leave you comment'
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

            <Button disabled={!this.props.values[Fields.CommentField]} mode='contained' onPress={this.props.handleSubmit} >Send</Button>
          </Animated.View>
        </Animated.View>

        <Animated.FlatList
          style={{ marginBottom: 100 }}
          contentContainerStyle={{ paddingHorizontal: 25 }}
          keyExtractor={this.reviewsKeyExtractor}
          data={reviews}
          ref={(scrollView: any) => {
            _scrollView = scrollView ? scrollView._component : null;
          }}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScrollEndDrag={onScrollEndSnapToEdge}
          renderItem={this.renderReview}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          )}
        />
      </Animated.View>
    );
  }
}
