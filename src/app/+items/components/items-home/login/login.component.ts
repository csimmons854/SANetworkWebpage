import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-item',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @Input() fields: FormArray;
    @Input() loginForm: FormGroup;
    @Input() signUpForm: FormGroup;

    pageTitle = 'Login';

    @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();
    @Output() signedUp: EventEmitter<any> = new EventEmitter<any>();



    constructor(
        private fb: FormBuilder,
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.signUpForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }




    login() {
        this.loggedInEvent(this.loginForm.value);
    }

    signUp() {
        this.signUpEvent(this.signUpForm.value);
    }

    loggedInEvent(event) {
        console.log('clicked');
        this.loggedIn.emit(event);
    }

    signUpEvent(event) {
        this.signedUp.emit(event);
    }
}
