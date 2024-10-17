import { ButtonTitle } from '@/models/mainModel';
import { action, makeAutoObservable } from 'mobx';
import calculatorViewModel from './calculatorViewModel';
import { evaluate } from 'mathjs';
import { toast } from 'sonner-native';

/**
 * View model for Button
 *
 * @class ButtonViewModel
 * @typedef {ButtonViewModel}
 */
class ButtonViewModel {
  /**
   * Creates an instance of ButtonViewModel.
   *
   * @constructor
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Handles the button press
   *
   * @param {ButtonTitle} input
   */
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

  /** 
   * Erases the input
   */
  @action public erase = (): void => {
    calculatorViewModel.calculators.find(
      (env) => env.uuid === calculatorViewModel.selectedUUID,
    )!.input = '0';
  };

  /** 
   * Semi undo the input 
   */
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

  /** 
   * Equal the input
   */
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

    if (result === 69 || result === 80085) {
      toast('Nice');
    }

    calculatorViewModel.setInput(result);
  };
}

/**
 * Used to export the button view model
 *
 * @type {ButtonViewModel}
 */
const buttonViewModel = new ButtonViewModel();
export default buttonViewModel;
