import { Calculator } from '@/models/mainModel';
import { generate_UUIDv4 } from '@/utils/uuid';
import { action, computed, makeAutoObservable, observable } from 'mobx';

/**
 * View model for Calculator
 *
 * @class CalculatorViewModel
 * @typedef {CalculatorViewModel}
 */
class CalculatorViewModel {
  /**
   * Creates an instance of CalculatorViewModel.
   *
   * @constructor
   */
  constructor() {
    makeAutoObservable(this);
  }

  /**
   * @private
   * @type {string}
   */
  private _firstUUID: string = generate_UUIDv4();

  /**
   * UUID on the current selected calculator.
   * When initializing, the first calculator sat to {@link _firstUUID}
   *
   * @public
   * @type {string}
   */
  @observable public selectedUUID: string = this._firstUUID;

  /**
   * The calculator witch the selected calculator will be moved to.
   *
   * Move function {@link move}
   *
   * Function to set the selected to calculator {@link setSelectedTo}
   *
   * @public
   * @type {(Calculator | undefined)}
   */
  @observable public selectedTo: Calculator | undefined = undefined;

  /**
   * Calculators
   *
   * @public
   * @type {Calculator[]}
   */
  @observable public calculators: Calculator[] = [
    { uuid: this._firstUUID, input: '0', name: 'Calculator 0' },
  ];

  /**
   * Adds a new calculator
   */
  @action
  public addInstants = (): void => {
    this.calculators.push({ uuid: generate_UUIDv4(), input: '0' });
  };

  /**
   * Get the selected calculator name
   *
   * @public
   * @readonly
   * @type {string}
   */
  @action
  public get selectedName(): string {
    const index = this.calculators.findIndex((env) => env.uuid === this.selectedUUID);
    return `Calculator ${index}`;
  }

  /**
   * Removes the selected calculator
   *
   * @param {string} uuid
   */
  @action
  public removeInstants = (uuid: string): void => {
    if (this.calculators.length > 1) {
      const selectedElement = this.calculators.find((element) => element.uuid === uuid);
      if (selectedElement) {
        this.calculators.splice(this.calculators.indexOf(selectedElement), 1);
        this.selectedUUID = this.calculators[0].uuid;
      }
    }
  };

  /**
   * Used to set the selected to calculator used in the move function {@link move}
   *
   * @param {Calculator} item
   * @param {number} index
   */
  @action
  public setSelectedTo = (item: Calculator, index: number): void => {
    this.selectedTo = { ...item, name: `Calculator ${index}` };
  };

  /**
   * Moves one calculators data to another
   */
  @action
  public move = (): void => {
    const currentInstants = this.calculators.find((env) => env.uuid === this.selectedUUID);

    const toInstantsIndex = this.calculators.findIndex(
      (element) => element.uuid === this.selectedTo?.uuid,
    );
    const toInstants = this.calculators.at(toInstantsIndex);

    if (currentInstants && toInstants) {
      this.calculators[toInstantsIndex] = { uuid: toInstants.uuid, input: currentInstants.input };
      this.selectedTo = undefined;
    }
  };

  /**
   * Sets the selected calculator
   *
   * @param {string} uuid
   */
  @action
  public setSelected = (uuid: string): void => {
    this.selectedUUID = uuid;
  };

  /**
   * Set the input of the selected calculator
   *
   * @param {string} val
   */
  @action
  public setInput = (val: string): void => {
    this.calculators.find((env) => env.uuid === this.selectedUUID)!.input = val.toString();
  };

  /**
   * Description placeholder
   *
   * @public
   * @readonly
   * @type {string}
   */
  @computed
  public get input(): string {
    return this.calculators.find((env) => env.uuid === this.selectedUUID)?.input ?? '';
  }
}

/**
 * Description placeholder
 *
 * @type {CalculatorViewModel}
 */
const calculatorViewModel = new CalculatorViewModel();
export default calculatorViewModel;
