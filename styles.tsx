import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button: {
        opacity: 0.90,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 5,
        width: 150,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputText: {
        borderRadius: 15,
        backgroundColor: '#eaeaea',
        color: 'black',
        fontSize: 20,
        marginVertical: 10,
        paddingVertical: 25,
        paddingHorizontal: 10,
    },
    showText: {
        color: '#000000',
        fontSize: 20,
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    showTitle: {
        color: '#000000',
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        paddingHorizontal: 10,
    },
    listItem: {
        borderRadius: 35,
        color: '#000000',
        marginBottom: 5,
        borderWidth: 2,
        backgroundColor: '#eaeaea',
        borderColor: '#eaeaea',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    showToDo: {
        color: '#000000',
        fontSize: 20,
        paddingHorizontal: 10,
    },
    showDate: {
        color: '#000000',
        paddingVertical: 15,
        fontSize: 15,
        paddingHorizontal: 10,
    },
    deletebutton: {
        backgroundColor: '#db0808',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default styles;