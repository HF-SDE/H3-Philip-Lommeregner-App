import Button from "@/components/Button";
import Card from "@/components/Card";
import mainViewModel from "@/viewModels/mainViewModel";
import { observer } from "mobx-react";
import { FlatList, View } from "react-native";

function ListOfCalculators() {
    return (
        <View className="h-full p-3">
            <FlatList
                data={[... mainViewModel.calculators]}
                extraData={mainViewModel.selectedID}
                renderItem={({ item }) => <Card activeID={mainViewModel.selectedID} id={item.id} input={item.input} onPress={() => mainViewModel.setSelected(item.id)} />}/>
            <View className="h-fit items-end justify-end">
                <Button title="Add" onPress={mainViewModel.addInstans} />
            </View>
        </View>
    )
}

export default observer(ListOfCalculators);