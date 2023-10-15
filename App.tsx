import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarComponent from './components/Calendar';
import { AddData, DeleteData } from './components/DataFunction';
import ErrorComponent from './components/Error';
import HeaderComponent from './components/Header';
import TextInputComponent from './components/TextInput';
import TodoItem from './components/ToDoItem';
import styles from './styles';
const Home: React.FC = () => {  //REACT.FC = REACT FUNCTİONEL COMPONENT
  const [data, setData] = useState<Array<{ id: string; date: string; value: string; additionalData: string }>>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [error, setError] = useState<string>('');




  const sendNotification = (title: string, message: string) => {
    PushNotification.localNotification({
      channelId: 'reminders',
      title: title,
      message: message,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('data');
        if (savedData) {
          setData(JSON.parse(savedData));
        }
      }catch (error) {
        if (error instanceof Error) {
            throw new Error('APP Veriler yüklenirken bir hata oluştu: ' + error.message);
        } else {
            throw new Error('APP Veriler yüklenirken bilinmeyen bir hata oluştu.');
        }
    }
    };

    fetchData();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const handleAddData = () => {
    if (inputValue && selectedDate) {
      AddData(
        inputValue,
        selectedDate,
        data,
        setData,
        setInputValue,
        setSelectedDate,
        sendNotification
      );
    }
  };

  const handleDeleteData = (id: string) => {
    DeleteData(id, data, setData);
  };

  return (
    <ScrollView style={{ backgroundColor: '#ffffff' }}>
      <View>
        <CalendarComponent onDayPress={handleDayPress} />
        <HeaderComponent title="Seçilen Tarih" description={selectedDate} />
        <TextInputComponent
          placeholder="Değerinizi girin"
          onChangeText={setInputValue}
          value={inputValue}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddData}>
          <Text style={styles.buttonText}>Ekle</Text>
        </TouchableOpacity>
        {error && <ErrorComponent error={error} />}
        <HeaderComponent title="Yapılacaklar Listesi" description="" />
      </View>

      <SafeAreaView>
        {data.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onPressDelete={() => handleDeleteData(item.id)}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;
