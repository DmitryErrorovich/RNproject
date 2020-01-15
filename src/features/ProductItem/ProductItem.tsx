import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';
import { Icon } from 'components/icon/Icon';
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
        <Icon icon={item.img} style={styles.productImage} />
        <Text style={styles.title}>{item?.title}</Text>
        {this.renderDescription()}
      </View>
    );
  }
}
