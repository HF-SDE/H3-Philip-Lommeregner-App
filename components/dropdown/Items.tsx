import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props<T> {
  item: T;
  itemIndex: number;
  onPressItem: (item: T, index: number) => void;
  toggleDropdown: () => void;
}

export function DropdownItems<T>(props: Props<T>) {
  return (
    <TouchableOpacity
      className="m-1 space-y-3"
      onPress={() => {
        props.onPressItem(props.item, props.itemIndex);
        props.toggleDropdown();
      }}>
      <Text className="text-lg dark:text-white">{`Calculator ${props.itemIndex}`}</Text>
    </TouchableOpacity>
  );
}
