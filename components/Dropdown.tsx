import { FontAwesome6 } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

interface Props<T extends {uuid: string}> {
    label: string;
    items: T[];
    currentSelected?: string;
    placeHolder?: string;
    className?: string;
    onPressItem: (item: T, index: number) => void;
}

export default function Dropdown<T extends {uuid: string}>(props: Props<T>) {
    const { colorScheme } = useColorScheme()
    const [visible, setVisible] = useState(false);
    const placeHolder = props.placeHolder ?? 'Select item';

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    const renderDropdown = () => {
        if (visible) {
            return (
                <SafeAreaView className='absolute top-8 border w-full py-4 pl-4 rounded-b bg-slate-300'>
                    <FlatList
                        data={props.items}
                        renderItem={({ item, index }) => renderDropdownItem(item, index)}
                        keyExtractor={item => item.uuid}
                    />
                </SafeAreaView>
            );
        }
    };

    const renderDropdownItem = (item: T, itemIndex: number) => {
        return (
            <TouchableOpacity className='space-y-3 m-1' onPress={() => {
                props.onPressItem(item, itemIndex);
                toggleDropdown();

            }}>
                <Text className='text-lg dark:text-white'>{`Calculator ${itemIndex}`}</Text>
            </TouchableOpacity>
        );
    };


    return (
        <TouchableOpacity
            className={`flex flex-row items-center w-full justify-between border dark:border-slate-200 z-10 ${props.className} ${visible ? "rounded-t" : "rounded"}`}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text className={`text-center text-xl pl-2 ${props.currentSelected ? "text-black dark:text-white" : "text-stone-400"}`}>{props.currentSelected ?? placeHolder}</Text>
            <View className="pr-2">
                <FontAwesome6 name="chevron-down" color={colorScheme === 'dark' ? "white" : "black"} />
            </View>
        </TouchableOpacity>
    );
}