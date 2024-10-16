import { Calculator } from "@/models/sampleModel";
import { Text, TouchableOpacity } from "react-native";

interface Props {
    activeID: number;
    onPress: () => void;
}

export default function Card(props: Calculator & Props) {

    return (
        <TouchableOpacity key={props.id}
            className={`w-fit h-fit m-2 p-2 rounded-lg shadow-md ${props.activeID === props.id ? "bg-green-400" : "bg-blue-500"}`}
            onPress={props.onPress}>
            <Text className="text-center">{props.id}</Text>
        </TouchableOpacity>
    )
}