import { saveData } from './datamanagement';

export const AddData = async (
    inputValue: string, // Kullanıcının girdiği değer
    selectedDate: string, // Kullanıcının seçtiği tarih
    data: Array<{ id: string; date: string; value: string; additionalData: string }>, // Mevcut veri dizisi
    setData: React.Dispatch<React.SetStateAction<Array<{ id: string; date: string; value: string; additionalData: string }>>>, // Veriyi güncellemek için kullanılan fonksiyon
    setInputValue: React.Dispatch<React.SetStateAction<string>>, // Kullanıcının girdiği değeri sıfırlamak için kullanılan fonksiyon
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>, // Kullanıcının seçtiği tarihi sıfırlamak için kullanılan fonksiyon
    sendNotification: (title: string, message: string) => void // Bildirim göndermek için kullanılan fonksiyon
) => {
    function generateUniqueId() {
        // Benzersiz bir kimlik (ID) oluşturan fonksiyon
        return Math.random().toString(36).substr(2, 9);
    }
    if (inputValue) {
        // Eğer kullanıcı bir giriş yapmışsa
        const newData = {
            id: generateUniqueId(), // Benzersiz bir kimlik (ID)
            date: selectedDate, // Seçilen tarih
            value: inputValue, // Kullanıcının girdiği değer
            additionalData: 'Ek bilgi', // Ek bilgi (sabit bir değer, isteğe bağlı olarak değiştirilebilir)
        };

        const updatedData = [...data, newData]; // Mevcut veri dizisine yeni veriyi eklemek için yeni bir dizi oluşturuluyor
        setData(updatedData); // Veriyi güncelleme fonksiyonuyla yeni veriyi ayarla

        try {
            await saveData(updatedData); // Veriyi kaydetmek için bir asenkron işlem başlatılıyor
        } catch (error) {
            if (error instanceof Error) {
                // Hata bir JavaScript hatası ise, bu hatayı yakala ve hata mesajıyla birlikte bir hata fırlat
                throw new Error('DATA FUNCTİONVeriler yüklenirken bir hata oluştu: ' + error.message);
            } else {
                // Hata bir JavaScript hatası değilse, bilinmeyen bir hata olduğunu belirten bir hata fırlat
                throw new Error('DATA FUNCTİON Veriler yüklenirken bilinmeyen bir hata oluştu.');
            }
        }

        setInputValue(''); // Kullanıcının girdiği değeri temizle
        setSelectedDate(''); // Seçilen tarihi temizle

        const currentDate = new Date();
        const selectedDateTime = new Date(selectedDate);

        if (
            // Eğer seçilen tarih bugünkü tarihse, bir bildirim gönder
            currentDate.getDate() === selectedDateTime.getDate() &&
            currentDate.getMonth() === selectedDateTime.getMonth() &&
            currentDate.getFullYear() === selectedDateTime.getFullYear()
        ) {
            sendNotification('Hatırlatma', `Bugün - ${inputValue}`);
        }
    }
};


export const DeleteData = (
    id: string,
    data: Array<{ id: string; date: string; value: string; additionalData: string }>,
    setData: React.Dispatch<React.SetStateAction<Array<{ id: string; date: string; value: string; additionalData: string }>>>
) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);

    try {
        saveData(newData);
    } catch (error) {

    }
};
