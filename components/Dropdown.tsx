import mainViewModel from '@/viewModels/mainViewModel';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity } from 'react-native';

interface Props {
    label: string;
    currentSelected: string;
    placeHolder?: string;
    onPressItem?: () => void;
}

export default function Dropdown(props: Props) {
    const [visible, setVisible] = useState(false);
    const placeHolder = props.placeHolder ?? 'Select item';

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    const renderDropdown = () => {
        if (visible) {
            return (
                <SafeAreaView className='absolute top-7 border w-full py-4 pl-4'>
                    <FlatList
                        data={mainViewModel.calculators}
                        renderItem={({ item, index }) => renderDropdownItem(`Calculater ${index}`)}
                        keyExtractor={item => item.uuid}
                    />
                </SafeAreaView>
            );
        }
    };

    const renderDropdownItem = (text: string) => {
        return (
            <TouchableOpacity className='space-y-3 m-1' onPress={props.onPressItem}>
                <Text className='text-lg'>{text}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <TouchableOpacity
            className='flex flex-row items-center justify-center border z-10 rounded'
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text className='text-center text-xl'>{props.label}</Text>
            <Text className='text-center text-xl text-stone-400'>{props.currentSelected ?? placeHolder}</Text>
            <FontAwesome6 name="chevron-down" color="black" />
        </TouchableOpacity>
    );
}