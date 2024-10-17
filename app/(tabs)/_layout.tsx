import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '.';
import { observer } from 'mobx-react';
import { ListOfCalculators } from './list';
import { Management } from './management';
import calculatorViewModel from '@/viewModels/calculatorViewModel';

const Stack = createNativeStackNavigator();

export default function TabLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={observer(HomeScreen)}
        options={{
          title: calculatorViewModel.selectedName,
          headerBackButtonMenuEnabled: true,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="List"
        component={observer(ListOfCalculators)}
        options={({ route }) => ({ title: route.name })}
      />
      <Stack.Screen
        name="Management"
        component={observer(Management)}
        options={({ route }) => ({ title: route.name })}
      />
    </Stack.Navigator>
  );
}
