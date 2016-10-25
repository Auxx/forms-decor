import { ValidatorFn, AsyncValidatorFn, FormControl, AbstractControl, FormGroup } from '@angular/forms';

// Copy-pasting quick hacks from Angular 2 sources, lol.
declare var Reflect: any;

const ControlSymbol: string = 'FDControl';
const GroupSymbol: string = 'FDGroup';

/**
 * Class property decorator for specifying FormControl constructor arguments to be used with
 * Angular forms.
 *
 * @param definition
 * @returns {(model:any, key:string)=>void}
 * @constructor
 */
export function FDControl(definition: ControlDefinition) {
    return (model: any, key: string): void => {
        let meta: MetaDefinition = Reflect.getMetadata(ControlSymbol, model.constructor) || {};
        meta[key] = definition;
        Reflect.defineMetadata(ControlSymbol, meta, model.constructor);
    }
}

/**
 * Class decorator for specifying FormGroup constructor arguments to be used with
 * Angular forms.
 *
 * @param definition
 * @returns {(constructor:Function)=>void}
 * @constructor
 */
export function FDGroup(definition: GroupDefinition) {
    return (constructor: Function): void => {
        Reflect.defineMetadata(GroupSymbol, definition, constructor);
    }
}

/**
 * Generates form fields from specified model object.
 *
 * @param model
 * @returns {{}}
 */
export function controlFromModel(model: any): ControlMap {
    let result: ControlMap = {};
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
 * Generates FormGroup from the model and its properties.
 *
 * @param model
 * @returns {FormGroup}
 */
export function groupFromModel(model: any): FormGroup {
    let controls: ControlMap = controlFromModel(model);
    let definition: GroupDefinition = Reflect.getMetadata(GroupSymbol, model.constructor);
    return new FormGroup(controls, definition.validators, definition.asyncValidators);
}

/**
 * FDControl definition interface.
 */
export interface ControlDefinition {
    /** Overrides property name. */
    name?: string;
    /** Overrides model objects value. */
    overrideValue?: any;
    validators?: ValidatorFn|ValidatorFn[];
    asyncValidators?: AsyncValidatorFn|AsyncValidatorFn[];
}

/**
 * FDGroup definition interface.
 */
export interface GroupDefinition {
    validators?: ValidatorFn;
    asyncValidators?: AsyncValidatorFn;
}

/**
 * FDArray definition interface.
 */
export interface ArrayDefinition {
    validators?: ValidatorFn;
    asyncValidators?: AsyncValidatorFn;
}

export type ControlMap = {
    [key: string]: AbstractControl;
};

interface MetaDefinition {
    [index: string]: ControlDefinition;
}
