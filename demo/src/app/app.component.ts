import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { fromModel } from 'forms-decor';
import { User } from '../models/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    formNew: FormGroup;
    formExisting: FormGroup;

    newUser: User;
    existingUser: User;

    constructor() {
        this.newUser = new User();
        this.formNew = new FormGroup(fromModel(this.newUser));

        this.existingUser = new User();
        this.existingUser.name = 'Developer';
        this.existingUser.password = 'Password12345';
        this.formExisting = new FormGroup(fromModel(this.existingUser));
    }

    create() {
        alert(`Creating user "${this.formNew.value.name}" with password "${this.formNew.value.password}"`);
    }

    update() {
        alert(`Updating user "${this.formExisting.value.name}" with password "${this.formExisting.value.password}"`);
    }
}
