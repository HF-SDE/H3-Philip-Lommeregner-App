export type ButtonTitle = " " | "AC" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0" | "," | "÷" | "×" | "−" | "+" | "=";

export interface Calculator {
    uuid: string;
    input: string;
    name?: string;
} 