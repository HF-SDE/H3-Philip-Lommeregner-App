import { FontAwesome6 } from '@expo/vector-icons';
import { styled, StyledComponent, useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { FlatList, FlexStyle, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props<T extends { uuid: string }> {
    label: string;
    items: T[];
    style?: ViewStyle | FlexStyle;
    currentSelected?: string;
    placeHolder?: string;
    onPressItem: (item: T, index: number) => void;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
    },
    top: {
        flex: 0.3,
        backgroundColor: 'grey',
        borderWidth: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    middle: {
        flex: 0.3,
        backgroundColor: 'beige',
        borderWidth: 5,
    },
    bottom: {
        flex: 0.3,
        backgroundColor: 'pink',
        borderWidth: 5,
        borderBottomLeftRadius: 20,
    }
});

export default function Dropdown<T extends { uuid: string }>(props: Props<T>) {
    const { colorScheme } = useColorScheme()
    const [visible, setVisible] = useState(false);
    const placeHolder = props.placeHolder ?? 'Select item';

    const toggleDropdown = () => {
        setVisible(!visible);
    };

    const StyleTouchableOpacity = styled(TouchableOpacity);

    const renderDropdown = () => {
        if (visible) {
            return (
                <View className='absolute top-8 border w-full py-4 pl-4 rounded-b bg-slate-300'>
                    <FlatList
                        data={props.items}
                        renderItem={({ item, index }) => renderDropdownItem(item, index)}
                        keyExtractor={item => item.uuid}
                    />
                </View>
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
        <StyleTouchableOpacity
            className={`flex flex-row items-center w-full justify-between border dark:border-slate-200 ${visible ? "rounded-t" : "rounded"}`}
            style={props.style}
            onPress={toggleDropdown}
        >
            {renderDropdown()}
            <Text className={`text-center text-xl pl-2 ${props.currentSelected ? "text-black dark:text-white" : "text-stone-400"}`}>{props.currentSelected ?? placeHolder}</Text>
            <View className="pr-2">
                <FontAwesome6 name="chevron-down" color={colorScheme === 'dark' ? "white" : "black"} />
            </View>
        </StyleTouchableOpacity>
    );
}