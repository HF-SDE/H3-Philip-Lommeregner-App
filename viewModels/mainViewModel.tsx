import { ButtonTitle, Calculator } from "@/models/sampleModel";
import { evaluate } from "mathjs";
import { action, computed, makeAutoObservable, observable } from "mobx";
import Toast from "react-native-root-toast";

class MainViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    @observable public selectedID: number = 1;

    @observable public calculators: Calculator[] = [{ id: 1, input: "0" }]

    @action public addInstans = (): void => {
        this.calculators.push({ id: this.calculators.length + 1, input: "0" });

    }

    @action public setSelected = (id: number): void => {
        this.selectedID = id;
    }

    @action public setInput = (val: string): void => {
        this.calculators.find(env => (env.id === this.selectedID))!.input = val.toString();
    }

    @action public handleButtonPress = (input: ButtonTitle): void => {
        if (this.input === "0" && input !== "," && input !== "÷" && input !== "×" && input !== "−" && input !== "+") {
            this.setInput(input);

        } else {
            this.setInput(this.input + input);
        }
    }

    @action public erase = (): void => {
        this.calculators.find(env => (env.id === this.selectedID))!.input = "0";
    }

    @action public equel = (): void => {
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
        return this.calculators.find(env => (env.id === this.selectedID))!.input;
    }

}

const mainViewModel = new MainViewModel();
export default mainViewModel;