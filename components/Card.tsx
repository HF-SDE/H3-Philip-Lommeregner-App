import { Calculator } from "@/models/mainModel";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
    id: number;
    activeUUID: string;
    onPress: () => void;
    delete: () => void;
    move: () => void;
}

export default function Card(props: Calculator & Props) {

    return (
        <TouchableOpacity
            className={`w-fit h-fit m-2 p-2 rounded-lg shadow-md flex flex-row justify-between ${props.activeUUID === props.uuid ? "bg-green-400" : "bg-blue-500"}`}
            onPress={props.onPress}>
            <Text className="font-bold text-xl">Calulator {props.id}</Text>
            <View className="flex-1">
                <TouchableOpacity className="flex" onPress={props.delete}>
                    <MaterialIcons name="delete" size={27} color="red" />
                </TouchableOpacity>
                <TouchableOpacity className="flex" onPress={props.move}>
                    <MaterialIcons name="drive-file-move" size={27} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}