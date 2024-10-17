import { ButtonTitle, Calculator } from "@/models/sampleModel";
import { generate_uuidv4 } from "@/utils/uuid";
import { evaluate, re } from "mathjs";
import { action, computed, makeAutoObservable, observable } from "mobx";
import Toast from "react-native-root-toast";

class MainViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    private _firstUUID: string = generate_uuidv4();

    @observable public selectedUUID: string = this._firstUUID;

    @observable public selectedFrom: Calculator | undefined = undefined;

    @observable public selectedTo: Calculator | undefined = undefined;

    @observable public calculators: Calculator[] = [{ uuid: this._firstUUID, input: "0" }]

    @action public addInstans = (): void => {
        this.calculators.push({ uuid: generate_uuidv4(), input: "0" });
    }

    @action public removeInstans = (uuid: string): void => {
        const selectedElement = this.calculators.find((element) => element.uuid === uuid)
        if (selectedElement) {
            this.calculators.splice(this.calculators.indexOf(selectedElement), 1);
        }
    }

    @action public setSelectedTo = (item: Calculator, index: number): void => {
        this.selectedTo = { ...item, name: `Calculator ${index}` };;
    }

    @action public setSelectedFrom = (item: Calculator, index: number): void => {
        this.selectedFrom = { ...item, name: `Calculator ${index}` };
    }

    @action public move = (): void => {
        const toInstantsIndex = this.calculators.findIndex(element => element.uuid === this.selectedTo?.uuid);
        const toInstants = this.calculators.at(toInstantsIndex);

        const fromInstantsIndex = this.calculators.findIndex(element => element.uuid === this.selectedFrom?.uuid);
        const fromInstants = this.calculators.at(fromInstantsIndex);


        if (fromInstants && toInstants) {
            // this.calculators = this.calculators.splice(toInstantsIndex, 0, { uuid: toInstants.uuid, input: fromInstants.input });
            // this.calculators = [...this.calculators.slice(0, fromInstantsIndex), { uuid: toInstants.uuid, input: fromInstants.input }, ...this.calculators.slice(toInstantsIndex + 1)];
            this.calculators[toInstantsIndex] = { uuid: toInstants.uuid, input: fromInstants.input };
            this.selectedFrom = undefined;
            this.selectedTo = undefined;
        }

    }

    @action public setSelected = (uuid: string): void => {
        this.selectedUUID = uuid;
    }

    @action public setInput = (val: string): void => {
        this.calculators.find(env => (env.uuid === this.selectedUUID))!.input = val.toString();
    }

    @action public handleButtonPress = (input: ButtonTitle): void => {
        if (input.match(/[0-9]/g)) {
            if (this.input === "0") {
                this.setInput(input);
            } else {
                this.setInput(this.input + input);
            }
        }
        if (this.input !== "0" && !input.match(/[0-9]/g)) {
            if (this.input.at(-1) === "," || this.input.at(-1) === "+" || this.input.at(-1) === "÷" || this.input.at(-1) === "−" || this.input.at(-1) === "×") {
                this.setInput(this.input.slice(0, -1) + input);
            } else {
                this.setInput(this.input + input);
            }
        }
    }

    @action public erase = (): void => {
        this.calculators.find(env => (env.uuid === this.selectedUUID))!.input = "0";
    }

    @action public undo = (): void => {
        const currentCalculator = this.calculators.find(env => (env.uuid === this.selectedUUID));
        if (currentCalculator) {
            currentCalculator.input = currentCalculator.input.slice(0, -1);
            if (currentCalculator.input === "") {
                currentCalculator.input = "0";
            }
        }
    }

    @action public equal = (): void => {
        let tmpInput: string = this.input.replaceAll("÷", "/").replaceAll("×", "*").replaceAll("−", "-").replaceAll(",", ".");

        while (tmpInput.endsWith("/") || tmpInput.endsWith("*") || tmpInput.endsWith("-") || tmpInput.endsWith("+") || tmpInput.endsWith(".")) {
            tmpInput = tmpInput.slice(0, -1);
        }

        const result = evaluate(tmpInput);

        if (result === 69 && result === 80085) {
            Toast.show("Nice", {
                position: Toast.positions.TOP,
                duration: Toast.durations.SHORT,
            });
            return;

        }

        this.setInput(result);
    }

    @computed
    public get input(): string {
        return this.calculators.find(env => (env.uuid === this.selectedUUID))?.input ?? "";
    }

}

const mainViewModel = new MainViewModel();
export default mainViewModel;