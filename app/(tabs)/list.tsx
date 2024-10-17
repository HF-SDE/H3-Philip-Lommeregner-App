import Button from "@/components/Button";
import Card from "@/components/Card";
import calculatorViewModel from "@/viewModels/calculatorViewModel";
import { observer } from "mobx-react";
import { FlatList, View } from "react-native";

export function ListOfCalculators() {
    return (
        <View className="h-full p-3 space-y-5">
            <FlatList
                data={[...calculatorViewModel.calculators]}
                extraData={calculatorViewModel.selectedUUID}
                renderItem={({ item, index }) =>
                    <Card
                        id={index}
                        activeUUID={calculatorViewModel.selectedUUID}
                        uuid={item.uuid}
                        input={item.input}
                        onPress={() => calculatorViewModel.setSelected(item.uuid)}
                        delete={() => calculatorViewModel.removeInstants(item.uuid)}
                        move={calculatorViewModel.move}
                    />}
                keyExtractor={item => item.uuid} />
            <View className="h-fit items-end justify-end">
                <Button title="Add" onPress={calculatorViewModel.addInstants} />
            </View>
        </View>
    )
}

export default observer(ListOfCalculators);