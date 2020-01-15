import * as React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { HEROKU_API } from '../../api/auth';

const name = (icon: any) => ({
  uri: `${HEROKU_API}/static/${icon}`,
});

export const Icon: React.SFC<{
  icon: any;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}> = ({ icon, style, ...rest }) => (
  <Image source={name(icon)} style={style} {...rest} />
);
