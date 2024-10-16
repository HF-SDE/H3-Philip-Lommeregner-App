import Dropdown from "@/components/Dropdown";
import { observer } from "mobx-react";
import { SafeAreaView, TextInput } from "react-native";

export function Management() {
    return (
        <SafeAreaView className="h-full p-3 pt-10 flex flex-col">
            <Dropdown label="Dropdown" />
            {/* <TextInput className="border-2 border-gray-400 rounded-lg p-2" placeholder="Search" />
            <TextInput className="border-2 border-gray-400 rounded-lg p-2" placeholder="Search" /> */}

        </SafeAreaView>
    )
}

export default observer(Management);