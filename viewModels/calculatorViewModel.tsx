import { Calculator } from "@/models/mainModel";
import { generate_UUIDv4 } from "@/utils/uuid";
import { action, computed, makeAutoObservable, observable } from "mobx";

class CalculatorViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    private _firstUUID: string = generate_UUIDv4();

    @observable public selectedUUID: string = this._firstUUID;

    @observable public selectedFrom: Calculator | undefined = undefined;

    @observable public selectedTo: Calculator | undefined = undefined;

    @observable public calculators: Calculator[] = [{ uuid: this._firstUUID, input: "0" }]

    @action
    public addInstans = (): void => {
        this.calculators.push({ uuid: generate_UUIDv4(), input: "0" });
    }

    @action
    public get selectedName(): string {
        const index = this.calculators.findIndex(env => (env.uuid === this.selectedUUID));
        return `Calculator ${index}`;
    };

    @action
    public removeInstans = (uuid: string): void => {
        const selectedElement = this.calculators.find((element) => element.uuid === uuid)
        if (selectedElement) {
            this.calculators.splice(this.calculators.indexOf(selectedElement), 1);
        }
    }

    @action
    public setSelectedTo = (item: Calculator, index: number): void => {
        this.selectedTo = { ...item, name: `Calculator ${index}` };;
    }

    @action
    public setSelectedFrom = (item: Calculator, index: number): void => {
        this.selectedFrom = { ...item, name: `Calculator ${index}` };
    }

    @action
    public move = (): void => {
        const toInstantsIndex = this.calculators.findIndex(element => element.uuid === this.selectedTo?.uuid);
        const toInstants = this.calculators.at(toInstantsIndex);

        const fromInstantsIndex = this.calculators.findIndex(element => element.uuid === this.selectedFrom?.uuid);
        const fromInstants = this.calculators.at(fromInstantsIndex);


        if (fromInstants && toInstants) {
            this.calculators[toInstantsIndex] = { uuid: toInstants.uuid, input: fromInstants.input };
            this.selectedFrom = undefined;
            this.selectedTo = undefined;
        }

    }

    @action
    public setSelected = (uuid: string): void => {
        this.selectedUUID = uuid;
    }

    @action
    public setInput = (val: string): void => {
        this.calculators.find(env => (env.uuid === this.selectedUUID))!.input = val.toString();
    }

    @computed
    public get input(): string {
        return this.calculators.find(env => (env.uuid === this.selectedUUID))?.input ?? "";
    }

}

const calculatorViewModel = new CalculatorViewModel();
export default calculatorViewModel;