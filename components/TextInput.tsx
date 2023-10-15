import React from 'react';
import { TextInput } from 'react-native';
import styles from '../styles';
interface TextInputComponentProps {
    placeholder: string;
    onChangeText: (text: string) => void;
    value: string;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({ placeholder, onChangeText, value }) => {
    return (
        <TextInput            style={styles.inputText}

            placeholder={placeholder}
            placeholderTextColor="darkgray"
            onChangeText={onChangeText}
            value={value}
        />
    );
}

export default TextInputComponent;