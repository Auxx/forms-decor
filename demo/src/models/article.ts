import { FDControl, FDGroup } from 'forms-decor';
import { Validators } from '@angular/forms';

@FDGroup({})
export class Article {
    id: number;
    @FDControl({validators: Validators.required}) title: string;
    @FDControl({validators: Validators.required}) body: string;
}
