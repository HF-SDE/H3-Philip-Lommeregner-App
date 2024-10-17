import { Calculator } from '@/models/mainModel';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RectButton, Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { styled } from 'nativewind';
import calculatorViewModel from '@/viewModels/calculatorViewModel';
import { LegacyRef } from 'react';

interface Props {
  id: number;
  activeUUID: string;
  onPress: () => void;
  delete: () => void;
  move: () => void;
}

export default function Card(props: Calculator & Props) {
  function renderRightComponet() {
    const StyledRectButton = styled(RectButton);

    return (
      <View className="m-2 flex h-fit flex-row items-center justify-between">
        <StyledRectButton
          onPress={props.delete}
          className="flex w-full flex-row-reverse items-end rounded-lg bg-red-500">
          <View className="m-2">
            <MaterialIcons name="delete" size={27} />
          </View>
        </StyledRectButton>
      </View>
    );
  }

  function renderLeftComponet() {
    const StyledRectButton = styled(RectButton);

    return (
      <View className="m-2 flex h-fit flex-row items-center justify-between">
        <StyledRectButton
          onPress={props.delete}
          className="flex w-full flex-row items-end rounded-lg bg-blue-500">
          <View className="m-2">
            <MaterialIcons name="drive-file-move" size={27} color="black" />
          </View>
        </StyledRectButton>
      </View>
    );
  }

  function deleteElement(event?: any) {
    if (calculatorViewModel.calculators.length > 1) {
      props.delete();
    } else if (event) {
      (event as Swipeable).reset();
    }
  }

  function onSwipeableOpen(direction: string, element: Swipeable) {
    if (direction === 'right') {
      deleteElement(element);
    }
    if (direction === 'left') {
      element.reset();
      props.move();
    }
  }

  return (
    <Swipeable
      renderRightActions={renderRightComponet}
      onSwipeableOpen={onSwipeableOpen}
      renderLeftActions={renderLeftComponet}
      id={props.uuid}>
      <Pressable
        className={`m-2 flex h-fit w-fit flex-row justify-between rounded-lg p-2 shadow-md ${props.activeUUID === props.uuid ? 'bg-green-400' : 'bg-blue-500'}`}
        onPress={props.onPress}>
        <Text className="text-xl font-bold">Calulator {props.id}</Text>
        <View className="flex flex-row">
          <TouchableOpacity className="flex" onPress={props.move}>
            <MaterialIcons name="drive-file-move" size={27} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex" onPress={deleteElement}>
            <MaterialIcons name="delete" size={27} color="red" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Swipeable>
  );
}
