import { ValidatorFn, AsyncValidatorFn, FormControl, AbstractControl } from '@angular/forms';

// Copy-pasting quick hacks from Angular 2 sources, lol.
declare var Reflect: any;

const ControlSymbol: string = 'FDControl';

/**
 * Class property decorator for specifying FormControl constructor arguments to be used with
 * Angular forms.
 *
 * @param definition
 * @returns {(model:any, key:string)=>void}
 * @constructor
 */
export function FDControl(definition: ControlDefinition) {
    return function (model: any, key: string): void {
        let meta: MetaDefinition = Reflect.getMetadata(ControlSymbol, model.constructor) || {};
        meta[key] = definition;
        Reflect.defineMetadata(ControlSymbol, meta, model.constructor);
    }
}

/**
 * Generates form fields definition from specified model object.
 *
 * @param model
 * @returns {{}}
 */
export function fromModel(model: any): { [key: string]: AbstractControl } {
    let result: { [key: string]: AbstractControl } = {};
    let meta: MetaDefinition = Reflect.getMetadata(ControlSymbol, model.constructor);

    for (let key in meta) {
        let definition: ControlDefinition = meta[key];
        let value = model[key] === undefined || model[key] === null ? '' : model[key];
        let controlName = definition.name || key;

        if (definition.overrideValue !== undefined && definition.overrideValue !== null) {
            value = definition.overrideValue;
        }

        result[controlName] = new FormControl(value, definition.validators, definition.asyncValidators);
    }

    return result;
}

/**
 * FDControl definition interface.
 */
export interface ControlDefinition {
    /** Overrides property name. */
    name?: string;
    validators?: ValidatorFn|ValidatorFn[];
    asyncValidators?: AsyncValidatorFn|AsyncValidatorFn[];
    /** Overrides model objects value. */
    overrideValue?: any;
}

interface MetaDefinition {
    [index: string]: ControlDefinition;
}
