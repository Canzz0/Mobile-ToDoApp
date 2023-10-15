import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadData = async () => {
    try {
        const savedData = await AsyncStorage.getItem('data');
        console.log(savedData); // Verileri görüntüleme
        return savedData ? JSON.parse(savedData) : [];
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Veriler yüklenirken bir hata oluştu: ' + error.message);
        } else {
            throw new Error('Veriler yüklenirken bilinmeyen bir hata oluştu.');
        }
    }
};

export const saveData = async (newData: Array<{ id: string; date: string; value: string; additionalData: string }>) => {
    try {
        await AsyncStorage.setItem('data', JSON.stringify(newData));
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('DAtaMANAGEMENT Veriler kaydedilirken bir hata oluştu: ' + error.message);
        } else {
            throw new Error('DAtaMANAGEMENT Veriler kaydedilirken bilinmeyen bir hata oluştu.');
        }
    }
};
