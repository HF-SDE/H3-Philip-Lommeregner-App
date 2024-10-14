import { ButtonTitle } from "@/models/sampleModel";
import * as math from "mathjs";
import { action, makeAutoObservable, observable } from "mobx";

class MainViewModel {
    constructor() {
        makeAutoObservable(this)
    }

    @observable public input = "0";

    @action private setTestString = (val: string): void => {
        this.input = val;
    }

    @action public handleButtonPress = (input: ButtonTitle): void => {
        this.setTestString(this.input + input);
    }

    @action public erase = (): void => {
        this.input = "";
    }

    @action public equel = (): void => {
        // this.setTestString(math.evaluate(this.input));
    }

}

export default MainViewModel