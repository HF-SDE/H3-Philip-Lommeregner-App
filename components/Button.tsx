import { ButtonTitle } from '@/models/mainModel';
import React from 'react';
import { Text, StyleSheet, GestureResponderEvent, TouchableOpacity } from 'react-native';

interface Props {
  className?: string;
  onPress?: (event: GestureResponderEvent | unknown) => void;
  title?: string | ButtonTitle | React.JSX.Element;
}

export default function Button(props: Props) {
  const { onPress, title = 'Save' } = props;
  return (
    <TouchableOpacity
      className={`h-16 w-full items-center justify-center rounded-full border bg-black px-8 py-3 active:bg-slate-900 dark:bg-white ${props.className}`}
      onPress={onPress}>
      <Text style={styles.text} className="text-3xl font-bold text-white dark:text-black">
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    letterSpacing: 0.25,
  },
});
