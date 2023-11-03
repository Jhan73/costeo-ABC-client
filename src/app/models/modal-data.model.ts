import { FormGroup } from "@angular/forms";
import { ModalInput } from "./modalInput.model";

export interface ModalData {
    title: string,
    fields: ModalInput[];
    formGroup: FormGroup;
}