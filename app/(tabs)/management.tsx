import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import { Calculator } from "@/models/mainModel";
import calculatorViewModel from "@/viewModels/calculatorViewModel";
import { observer } from "mobx-react";
import { SafeAreaView, Text } from "react-native";

export function Management() {
    return (
        <SafeAreaView className="h-full p-3 pt-10 flex flex-col">
            <Dropdown<Calculator>
                label="Dropdown"
                items={calculatorViewModel.calculators}
                currentSelected={calculatorViewModel.selectedFrom?.name}
                onPressItem={calculatorViewModel.setSelectedFrom}
                style={{ zIndex: 20 }}
            />
            <Text className="text-center text-black dark:text-white p-1">\/</Text>
            <Dropdown<Calculator>
                label="Dropdown"
                items={calculatorViewModel.calculators}
                currentSelected={calculatorViewModel.selectedTo?.name}
                onPressItem={calculatorViewModel.setSelectedTo}
                style={{ zIndex: 10 }}
            />
            <Button title="Move" onPress={calculatorViewModel.move}/>
        </SafeAreaView>
    )
}

export default observer(Management);