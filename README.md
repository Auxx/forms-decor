# forms-decor

Model decorators for forms auto-generation for Angular 2

## Installation

```
npm i --save forms-decor
```

## Usage

* Define your model class:

```TypeScript
import { FDControl } from 'forms-decor';
import { Validators } from '@angular/forms';

export class User {
    id: number;
    @FDControl({validators: Validators.required}) name: string;
    @FDControl({validators: Validators.required}) password: string;
}
```

* Generate Angular form:

```TypeScript
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromModel } from 'forms-decor';

import { User } from './user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup(fromModel(new User()));
    }
}
```

* This will be equivalent to:

```TypeScript
// ...
    
    constructor() {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }
    
// ...
```

## Decorator configuration

`@FDControl` also supports additional configuration options:

1. `name` - overrides model property name with a specified string value.
    It will be passed to `FormGroup` contructor instead of property name.
2. `overrideValue` - overrides property value passed to `FormControl` constructor.
    **Warning!** This will override value for ALL instances of your model!

## Demo application

Demo application is available in [demo](https://github.com/Auxx/forms-decor/tree/master/demo) folder in git repository.
