import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, AsyncStorage, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({navigation}){
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        
        const response = await api.post(`/spots/${id}/bookings` , {
            date
        },{
            headers: { user_id }
        });

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    };

    function handleCancel(){
        navigation.navigate('List');
    };

    return (
        <SafeAreaView style={style.container}>
            <Text style={style.label}>DATA DE INTERESSE *</Text>
                <TextInput
                    style={style.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={date}
                    onChangeText={setDate}
                />

                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                    <Text style={style.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={[ style.button, style.cancelButton ]}>
                    <Text style={style.buttonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 60,
    },

    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button:{
        height:42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    cancelButton:{
        backgroundColor: '#ccc',
        marginTop: 10,
    },

    buttonText:{
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 16,
    },
})