import React from 'react';
import { Text } from 'react-native';
import styles from '../styles';
interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <Text style={styles.errorText}>{error}</Text>
  );
};

export default ErrorComponent;