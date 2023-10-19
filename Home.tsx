import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import PushNotification from 'react-native-push-notification';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarComponent from './components/Calendar';
import { AddData, DeleteData } from './components/DataFunction';
import ErrorComponent from './components/Error';
import HeaderComponent from './components/Header';
import TextInputComponent from './components/TextInput';
import TodoItem from './components/ToDoItem';
import styles from './styles';
const Home: React.FC = () => {
    const [data, setData] = useState<Array<{ id: string; date: string; value: string; additionalData: string }>>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('data');
            if (savedData) {
                setData(JSON.parse(savedData));
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('APP Veriler yüklenirken bir hata oluştu: ' + error.message);
            } else {
                throw new Error('APP Veriler yüklenirken bilinmeyen bir hata oluştu.');
            }
        }
    };

    const checkAndRequestPermission = async () => {
        const permission = Platform.OS === 'android' ? PERMISSIONS.ANDROID.READ_CALENDAR : PERMISSIONS.IOS.CALENDARS;

        const result = await check(permission);

        if (result === RESULTS.GRANTED) {
            console.log('İzin verilmiş.');
        } else {
            console.log('İzin verilmemiş. İzin talep ediliyor...');

            const requestResult = await request(permission);

            if (requestResult === RESULTS.GRANTED) {
                console.log('İzin verildi.');
            } else if (requestResult === RESULTS.DENIED) {
                console.log('İzin ret edildi.');

                // Kullanıcıya izni sormak için bir bildirim göster
                Alert.alert(
                    'İzin Talebi',
                    'Uygulamanın kamerayı kullanabilmesi için izin vermelisiniz.',
                    [
                        {
                            text: 'İzin Ver',
                            onPress: () => {
                                checkAndRequestPermission();
                            },
                        },
                        {
                            text: 'İptal',   //İzin verilmez ise uygulamayı kapat
                            onPress: () => {
                                console.log('İzin reddedildi, uygulama kapatılıyor.');

                                if (Platform.OS === 'android') {
                                    BackHandler.exitApp();
                                } else {
                                    // İzin reddedildiğinde iOS'ta yapılacak işlemler
                                }
                            },
                        },
                    ]
                );
            }
        }
    };

    PushNotification.createChannel(
        {
            channelId: 'reminders',
            channelName: 'Hatırlatmalar',
            channelDescription: 'Bildirimler için hatırlatma kanalı',
        },
        (created) => console.log(`Bildirim kanalı oluşturuldu: ${created}`)
    );

    const sendNotification = (title: string, message: string) => {
        PushNotification.localNotification({
            channelId: 'reminders',
            title: title,
            message: message,
        });
    };

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

    useEffect(() => {

        checkAndRequestPermission();
        fetchData();
    }, []);
    return (
        <ScrollView style={{ backgroundColor: '#ffffff' }}>
            <View>
                <CalendarComponent data={data} onDayPress={handleDayPress} />
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

                {data.map((item) => {//SADECE SEÇİLİ TARİHE AİT TODO LİST
                    if (item.date === selectedDate) {
                        return (
                            <TodoItem
                                key={item.id}
                                item={item}
                                onPressDelete={() => handleDeleteData(item.id)}
                            />
                        );
                    }
                    return null;
                })}
            </SafeAreaView>
        </ScrollView>
    );
};

export default Home;
