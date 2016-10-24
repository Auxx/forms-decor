import {ValidatorFn, AsyncValidatorFn, FormControl } from "@angular/forms";

export namespace FormsDecor {
    const ControlSymbol: string = "FDControl";

    export function FDControl(definition: ControlDefinition) {
        return function(model: any, key: string): void {
            let meta: MetaDefinition = Reflect.getMetadata(ControlSymbol, model.constructor) || {};
            meta[key] = definition;
            Reflect.defineMetadata(ControlSymbol, meta, model.constructor);
        }
    }

    export function fromModel(model: any) {
        let result = {};
        let meta: MetaDefinition = Reflect.getMetadata(ControlSymbol, model.constructor);

        for(let key in meta) {
            let definition: ControlDefinition = meta[key];
            let value = model[key] === undefined || model[key] === null ? '' : model[key];
            let controlName = definition.name || key;

            if(definition.overrideValue !== undefined && definition.overrideValue !== null) {
                value = definition.overrideValue;
            }

            result[controlName] = new FormControl(value, definition.validators, definition.asyncValidators);
        }

        return result;
    }

    export interface ControlDefinition {
        name?: string;
        validators?: ValidatorFn|ValidatorFn[];
        asyncValidators?: AsyncValidatorFn|AsyncValidatorFn[];
        overrideValue?: any;
    }

    interface MetaDefinition {
        [index: string]: ControlDefinition;
    }
}
