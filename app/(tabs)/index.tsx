import Button from '@/components/Button';
import mainViewModel from '@/viewModels/mainViewModel';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { observer } from 'mobx-react';
import { Text, View } from 'react-native';


export function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View className="h-full flex flex-row items-center justify-center">
      <View className='h-full flex flex-col items-center justify-center'>
        <Text className='text-end'>{mainViewModel.input}</Text>
        <View className="flex flex-row items-center">
          <View>
            <Button title="AC" onPress={mainViewModel.erase} />
            <Button title="7" onPress={() => mainViewModel.handleButtonPress("7")} />
            <Button title="4" onPress={() => mainViewModel.handleButtonPress("4")} />
            <Button title="1" onPress={() => mainViewModel.handleButtonPress("1")} />
            <Button title={<Ionicons name="calculator" size={22} />} onPress={() => navigation.navigate('List' as never)} />
          </View>
          <View>
            <Button title={<FontAwesome6 name="delete-left" size={22} />} onPress={mainViewModel.undo} />
            <Button title="8" onPress={() => mainViewModel.handleButtonPress("8")} />
            <Button title="5" onPress={() => mainViewModel.handleButtonPress("5")} />
            <Button title="2" onPress={() => mainViewModel.handleButtonPress("2")} />
            <Button title="0" onPress={() => mainViewModel.handleButtonPress("0")} />
          </View>
          <View>
            <Button title="S" onPress={() => navigation.navigate('Management' as never)} />
            <Button title="9" onPress={() => mainViewModel.handleButtonPress("9")} />
            <Button title="6" onPress={() => mainViewModel.handleButtonPress("6")} />
            <Button title="3" onPress={() => mainViewModel.handleButtonPress("3")} />
            <Button title="," onPress={() => mainViewModel.handleButtonPress(",")} />
          </View>
          <View>
            <Button title="÷" onPress={() => mainViewModel.handleButtonPress("÷")} />
            <Button title="×" onPress={() => mainViewModel.handleButtonPress("×")} />
            <Button title="−" onPress={() => mainViewModel.handleButtonPress("−")} />
            <Button title="+" onPress={() => mainViewModel.handleButtonPress("+")} />
            <Button title="=" onPress={() => mainViewModel.equel()} />
          </View>
        </View>
      </View>
    </View>

  );
}


export default observer(HomeScreen);
