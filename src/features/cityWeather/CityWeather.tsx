import { InjectedFormikProps } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationParams, NavigationScreenProp } from 'react-navigation';

import { CustomButton } from 'components/button/Button';
import { WeatherIcon } from 'components/weatherIcon/WeatherIcon';
import { i18n } from 'i18n/i18n';
import { Routes } from 'navigation/routes';
import { IWeatherStore, WEATHER_STORE } from 'store/productsStore';
import { IWeather } from '../../models/weather';
import { styles } from './styles';

interface IFormValues {
  city: string;
  proposedCities: [];
}

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [WEATHER_STORE]: IWeatherStore;
}

class CityWeather extends Component<InjectedFormikProps<IProps, IFormValues>> {
  public goBack = () => {
    this.props.navigation.goBack();
  }

  public renderWeather = (weather: IWeather, key: number) => {
    const maxTemp = weather.max_temp.toFixed(1);
    const minTemp = weather.min_temp.toFixed(1);
    const temperature = weather.the_temp.toFixed(1);
    const date = weather.applicable_date;
    return (
      <View key={key} style={styles.weatherContainer}>
        <Text style={styles.dateText}>{i18n.t('city.date', { date })}</Text>
        <Text style={styles.welcomeText}>{i18n.t('city.temperature', { temperature })}</Text>
        <WeatherIcon
          style={styles.imageStyle}
          icon={weather.weather_state_abbr}
        />
        <View style={styles.tempView}>
          <Text style={styles.minText}>{i18n.t('city.minTemp', { minTemp })}</Text>
          <Text style={styles.maxText}>{i18n.t('city.maxTemp', { maxTemp })}</Text>
        </View>
      </View>
    );
  }

  public render() {
    const { city, cityWeather } = this.props[WEATHER_STORE];
    return (
      <ScrollView style={styles.safeArea}>
        <CustomButton
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          text={i18n.t('backButton')}
          onPress={this.goBack}
        />
        <View style={styles.cityTitleContainer}>
          <Text style={styles.cityTitle}>{city.title}</Text>
        </View>
        {cityWeather && cityWeather.map(this.renderWeather)}
      </ScrollView>
    );
  }
}

export const CityPage = inject(WEATHER_STORE)(observer(CityWeather));
