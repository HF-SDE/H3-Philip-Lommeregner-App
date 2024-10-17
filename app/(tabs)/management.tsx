import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { Calculator } from "@/models/sampleModel";
import mainViewModel from "@/viewModels/mainViewModel";
import { observer } from "mobx-react";
import { SafeAreaView, Text } from "react-native";

export function Management() {
    return (
        <SafeAreaView className="h-full p-3 pt-10 flex flex-col">
            <Dropdown<Calculator>
                label="Dropdown"
                items={mainViewModel.calculators}
                currentSelected={mainViewModel.selectedFrom?.name}
                onPressItem={mainViewModel.setSelectedFrom}
                style={{ zIndex: 20 }}
            />
            <Text className="text-center text-black dark:text-white p-1">\/</Text>
            <Dropdown<Calculator>
                label="Dropdown"
                items={mainViewModel.calculators}
                currentSelected={mainViewModel.selectedTo?.name}
                onPressItem={mainViewModel.setSelectedTo}
                style={{ zIndex: 10 }}
            />
            <Button title="Move" onPress={mainViewModel.move}/>
        </SafeAreaView>
    )
}

export default observer(Management);