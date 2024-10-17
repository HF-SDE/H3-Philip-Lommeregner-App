import Button from '@/components/Button';
import Dropdown from '@/components/dropdown/Dropdown';
import { Calculator } from '@/models/mainModel';
import calculatorViewModel from '@/viewModels/calculatorViewModel';
import { observer } from 'mobx-react';
import { SafeAreaView, Text } from 'react-native';

export function Management() {
  return (
    <SafeAreaView className="flex h-full flex-col p-3 pt-10">
      <Dropdown<Calculator>
        label="Dropdown"
        items={calculatorViewModel.calculators}
        currentSelected={
          calculatorViewModel.calculators.find(
            (env) => env.uuid === calculatorViewModel.selectedUUID,
          )?.name
        }
        onPressItem={calculatorViewModel.setSelectedFrom}
        style={{ zIndex: 20 }}
      />
      <Text className="p-1 text-center text-black dark:text-white">\/</Text>
      <Button title="Move" onPress={calculatorViewModel.move} />
    </SafeAreaView>
  );
}

export default observer(Management);
