import { FontAwesome6 } from '@expo/vector-icons';
import { styled, useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { FlatList, FlexStyle, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface Props<T extends { uuid: string }> {
  label: string;
  items: T[];
  style?: ViewStyle | FlexStyle;
  currentSelected?: string;
  placeHolder?: string;
  onPressItem: (item: T, index: number) => void;
}

export default function Dropdown<T extends { uuid: string }>(props: Props<T>) {
  const { colorScheme } = useColorScheme();
  const [visible, setVisible] = useState(false);
  const placeHolder = props.placeHolder ?? 'Select item';

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const StyleTouchableOpacity = styled(TouchableOpacity);

  const renderDropdown = () => {
    if (visible) {
      return (
        <View className="absolute top-8 w-full rounded-b border bg-slate-300 py-4 pl-4">
          <FlatList
            data={props.items}
            renderItem={({ item, index }) => renderDropdownItem(item, index)}
            keyExtractor={(item) => item.uuid}
          />
        </View>
      );
    }
  };

  const renderDropdownItem = (item: T, itemIndex: number) => {
    return (
      <TouchableOpacity
        className="m-1 space-y-3"
        onPress={() => {
          props.onPressItem(item, itemIndex);
          toggleDropdown();
        }}>
        <Text className="text-lg dark:text-white">{`Calculator ${itemIndex}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <StyleTouchableOpacity
      className={`flex w-full flex-row items-center justify-between border dark:border-slate-200 ${visible ? 'rounded-t' : 'rounded'}`}
      style={props.style}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <Text
        className={`pl-2 text-center text-xl ${props.currentSelected ? 'text-black dark:text-white' : 'text-stone-400'}`}>
        {props.currentSelected ?? placeHolder}
      </Text>
      <View className="pr-2">
        <FontAwesome6 name="chevron-down" color={colorScheme === 'dark' ? 'white' : 'black'} />
      </View>
    </StyleTouchableOpacity>
  );
}
