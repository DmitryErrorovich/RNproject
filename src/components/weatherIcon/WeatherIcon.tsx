import * as React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { HEROKU_API } from '../../api/auth';
import { WeatherStateAbbr } from '../../models/weather';

const name = (icon: WeatherStateAbbr) => {
  console.log({icon})
  return ({
  uri: `${HEROKU_API}/static/${icon}`
})};

export const WeatherIcon: React.SFC<{
  icon: WeatherStateAbbr;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}> = ({ icon, style, ...rest }) => (
  <Image source={name(icon)} style={style} {...rest} />
);
