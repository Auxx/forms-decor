import { FDControl } from 'forms-decor';
import { Validators } from '@angular/forms';

export class User {
    id: number;
    @FDControl({validators: Validators.required}) name: string;
    @FDControl({validators: Validators.required}) password: string;
}
