import { ButtonTitle } from '@/models/mainModel';
import React from 'react';
import { Text, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';

interface Props {
    className?: string;
    onPress?: (event: GestureResponderEvent | unknown) => void;
    title?: string | ButtonTitle | React.JSX.Element
}

export default function Button(props: Props) {
    const { onPress, title = 'Save' } = props;
    return (
        <TouchableOpacity className={`items-center justify-center bg-black w-full h-16 py-3 px-8 border rounded-full active:bg-slate-900 dark:bg-white ${props.className}`} onPress={onPress}>
            <Text style={styles.text} className='text-white font-bold text-3xl dark:text-black'>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        letterSpacing: 0.25,
    },
});
