import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
interface TodoItemProps {
    item: { id: string; date: string; value: string; additionalData: string };
    onPressDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onPressDelete }) => {
    return (
        <View style={styles.listItem}>
            <View>
                <Text style={styles.showToDo}>- {item.value}</Text>
                <Text style={styles.showDate}>{item.date}</Text>
            </View>
            <TouchableOpacity style={styles.deletebutton} onPress={onPressDelete}>
                <Text style={styles.buttonText}>Sil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TodoItem;