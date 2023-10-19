import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles';
interface HeaderComponentProps {
  title: string;
  description: string;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ title, description }) => {
  return (
    <View>
      <Text style={styles.showTitle}>{title} : {description}</Text>
      <Text></Text>
    </View>
  );
};

export default HeaderComponent;