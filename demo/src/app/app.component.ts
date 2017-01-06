import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { controlFromModel, groupFromModel } from 'forms-decor';

import { User } from '../models/user';
import { Article } from '../models/article';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    formNew: FormGroup;
    formExisting: FormGroup;

    formArticle: FormGroup;

    newUser: User;
    existingUser: User;

    existingArticle: Article;

    constructor() {
        this.prepareControlFromModel();
        this.prepareGroupFromModel();
    }

    createUser() {
        alert(`Creating user "${this.formNew.value.name}" with password "${this.formNew.value.password}"`);
    }

    updateUser() {
        alert(`Updating user "${this.formExisting.value.name}" with password "${this.formExisting.value.password}"`);
    }

    updateArticle() {
        alert(`Updating article "${this.formArticle.value.title}" with body "${this.formArticle.value.body}"`);
    }

    private prepareControlFromModel() {
        this.newUser = new User();
        this.formNew = new FormGroup(controlFromModel(this.newUser));

        this.existingUser = new User();
        this.existingUser.name = 'Developer';
        this.existingUser.password = 'Password12345';
        this.formExisting = new FormGroup(controlFromModel(this.existingUser));
    }

    private prepareGroupFromModel() {
        this.existingArticle = new Article();
        this.existingArticle.title = 'forms-decor is released!';
        this.existingArticle.body = 'Best news today (:';

        this.formArticle = groupFromModel(this.existingArticle);
    }
}
