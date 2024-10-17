import { ButtonTitle } from '@/models/mainModel';
import { action, makeAutoObservable } from 'mobx';
import calculatorViewModel from './calculatorViewModel';
import Toast from 'react-native-root-toast';
import { evaluate } from 'mathjs';

class ButtonViewModel {
  constructor() {
    makeAutoObservable(this);
  }

  @action public handleButtonPress = (input: ButtonTitle): void => {
    if (input.match(/[0-9]/g)) {
      if (calculatorViewModel.input === '0') {
        calculatorViewModel.setInput(input);
      } else {
        calculatorViewModel.setInput(calculatorViewModel.input + input);
      }
    }
    if (calculatorViewModel.input !== '0' && !input.match(/[0-9]/g)) {
      if (
        calculatorViewModel.input.at(-1) === ',' ||
        calculatorViewModel.input.at(-1) === '+' ||
        calculatorViewModel.input.at(-1) === '÷' ||
        calculatorViewModel.input.at(-1) === '−' ||
        calculatorViewModel.input.at(-1) === '×'
      ) {
        calculatorViewModel.setInput(calculatorViewModel.input.slice(0, -1) + input);
      } else {
        calculatorViewModel.setInput(calculatorViewModel.input + input);
      }
    }
  };

  @action public erase = (): void => {
    calculatorViewModel.calculators.find(
      (env) => env.uuid === calculatorViewModel.selectedUUID,
    )!.input = '0';
  };

  @action public undo = (): void => {
    const currentCalculator = calculatorViewModel.calculators.find(
      (env) => env.uuid === calculatorViewModel.selectedUUID,
    );
    if (currentCalculator) {
      currentCalculator.input = currentCalculator.input.slice(0, -1);
      if (currentCalculator.input === '') {
        currentCalculator.input = '0';
      }
    }
  };

  @action public equal = (): void => {
    let tmpInput: string = calculatorViewModel.input
      .replaceAll('÷', '/')
      .replaceAll('×', '*')
      .replaceAll('−', '-')
      .replaceAll(',', '.');

    while (
      tmpInput.endsWith('/') ||
      tmpInput.endsWith('*') ||
      tmpInput.endsWith('-') ||
      tmpInput.endsWith('+') ||
      tmpInput.endsWith('.')
    ) {
      tmpInput = tmpInput.slice(0, -1);
    }

    const result = evaluate(tmpInput);

    if (result === 69 && result === 80085) {
      Toast.show('Nice', {
        position: Toast.positions.TOP,
        duration: Toast.durations.SHORT,
      });
      return;
    }

    calculatorViewModel.setInput(result);
  };
}

const buttonViewModel = new ButtonViewModel();
export default buttonViewModel;
