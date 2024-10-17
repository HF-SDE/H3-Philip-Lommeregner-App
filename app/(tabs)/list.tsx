import Button from '@/components/Button';
import Card from '@/components/Card';
import Dropdown from '@/components/dropdown/Dropdown';
import { Calculator } from '@/models/mainModel';
import calculatorViewModel from '@/viewModels/calculatorViewModel';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function ListOfCalculators() {
  const [modalVisible, setModalVisible] = useState(false);

  function onPress() {
    setModalVisible(!modalVisible);
    calculatorViewModel.move();
  }

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex flex-[1] items-center justify-center">
          <View className="flex h-80 max-h-80 w-80 flex-[1] items-center justify-between rounded-lg bg-white p-4">
            <Text className="p-1 text-center text-black dark:text-white">Move to</Text>
            <Dropdown<Calculator>
              label="Dropdown"
              items={calculatorViewModel.calculators}
              currentSelected={calculatorViewModel.selectedTo?.name}
              onPressItem={calculatorViewModel.setSelectedTo}
              style={{ zIndex: 10 }}
            />
            <Button title="Move" onPress={onPress} />
          </View>
        </View>
      </Modal>
      <GestureHandlerRootView className="h-full space-y-5 p-3">
        <FlatList
          data={[...calculatorViewModel.calculators]}
          extraData={calculatorViewModel.selectedUUID}
          renderItem={({ item, index }) => (
            <Card
              id={index}
              activeUUID={calculatorViewModel.selectedUUID}
              uuid={item.uuid}
              input={item.input}
              onPress={() => calculatorViewModel.setSelected(item.uuid)}
              delete={() => calculatorViewModel.removeInstants(item.uuid)}
              move={() => setModalVisible(true)}
            />
          )}
          keyExtractor={(item) => item.uuid}
        />
        <View className="h-fit items-end justify-end">
          <Button title="Add" onPress={calculatorViewModel.addInstants} />
        </View>
      </GestureHandlerRootView>
    </>
  );
}

export default observer(ListOfCalculators);
