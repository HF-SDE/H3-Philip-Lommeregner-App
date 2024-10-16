import Button from "@/components/Button";
import Card from "@/components/Card";
import mainViewModel from "@/viewModels/mainViewModel";
import { observer } from "mobx-react";
import { FlatList, View } from "react-native";

export function ListOfCalculators() {
    return (
        <View className="h-full p-3 space-y-5">
            <FlatList
                data={[...mainViewModel.calculators]}
                extraData={mainViewModel.selectedUUID}
                renderItem={({ item, index }) =>
                    <Card
                        id={index}
                        activeUUID={mainViewModel.selectedUUID}
                        uuid={item.uuid}
                        input={item.input}
                        onPress={() => mainViewModel.setSelected(item.uuid)}
                        delete={() => mainViewModel.removeInstans(item.uuid)}
                    />}
                keyExtractor={item => item.uuid} />
            <View className="h-fit items-end justify-end">
                <Button title="Add" onPress={mainViewModel.addInstans} />
            </View>
        </View>
    )
}

export default observer(ListOfCalculators);