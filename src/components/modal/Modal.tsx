import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

import { styles } from './styles';

export interface IModalProps {
  title?: string;
  children?: any;
  canCancel?: boolean;
  canConfirm?: boolean;
  isVisible?: boolean;

  onCancel?: () => void;
  onConfirm: () => void;
}

export const CustomModal = (props: IModalProps) => (
  <Modal animationIn="slideInUp" isVisible={props.isVisible} style={styles.modal}>
    <Text style={styles.modalHeader}>
      HEllo
    </Text>
    <View>{props.children}</View>
  </Modal>
);
