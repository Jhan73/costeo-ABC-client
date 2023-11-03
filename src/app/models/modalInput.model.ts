import { INPUT_TYPE } from "../enums/input_type.enum"

export interface ModalInput {
    inputType: INPUT_TYPE;
    label: string;
    controlName: string;
}
