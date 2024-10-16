import { ButtonTitle } from '@/models/sampleModel';
import React from 'react';
import { Text, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';

export default function Button(props: { onPress?: (event: GestureResponderEvent | unknown) => void; title?: string | ButtonTitle | React.JSX.Element }) {
    const { onPress, title = 'Save' } = props;
    return (
        <TouchableOpacity className="items-center justify-center bg-black w-full h-16 py-3 px-8 border rounded-full active:bg-slate-900" style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        elevation: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
