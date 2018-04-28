import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '../../store';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-store-form',
    templateUrl: './store-form.component.html',
    styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {
    @Input() store: Store;
    @Output() submit: EventEmitter<Store> = new EventEmitter();
    @Input() form: FormGroup;
    @Input() pageTitle: string;

    phone_area: string;
    phone_exchange: string;
    phone_subscriber: string;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.parsePhoneNumber(this.store.phone);

        if (this.store == null) {
            this.form = this.fb.group({
                name: ['', Validators.required],
                address: ['', Validators.required],
                phone_area: ['', Validators.required],
                phone_exchange: ['', Validators.required],
                phone_subscriber: ['', Validators.required],
                phone: ['', null],
                lat: [0, Validators.required],
                lng: [0, Validators.required],
                sunOpen: [0, Validators.required],
                monOpen: [0, Validators.required],
                tueOpen: [0, Validators.required],
                wedOpen: [0, Validators.required],
                thuOpen: [0, Validators.required],
                friOpen: [0, Validators.required],
                satOpen: [0, Validators.required],
                sunClose: [0, Validators.required],
                monClose: [0, Validators.required],
                tueClose: [0, Validators.required],
                wedClose: [0, Validators.required],
                thuClose: [0, Validators.required],
                friClose: [0, Validators.required],
                satClose: [0, Validators.required]
            });
        } else {
            this.form = this.fb.group({
                name: [this.store.name, Validators.required],
                address: [this.store.address, Validators.required],
                phone_area: [this.phone_area, Validators.required],
                phone_exchange: [this.phone_exchange, Validators.required],
                phone_subscriber: [this.phone_subscriber, Validators.required],
                phone: [this.buildPhoneString, null],
                lat: [this.store.location.lat, Validators.required],
                lng: [this.store.location.lng, Validators.required],
                sunOpen: [this.store.hours.sun.open, Validators.required],
                monOpen: [this.store.hours.mon.open, Validators.required],
                tueOpen: [this.store.hours.tue.open, Validators.required],
                wedOpen: [this.store.hours.wed.open, Validators.required],
                thuOpen: [this.store.hours.thu.open, Validators.required],
                friOpen: [this.store.hours.fri.open, Validators.required],
                satOpen: [this.store.hours.sat.open, Validators.required],
                sunClose: [this.store.hours.sun.close, Validators.required],
                monClose: [this.store.hours.mon.close, Validators.required],
                tueClose: [this.store.hours.tue.close, Validators.required],
                wedClose: [this.store.hours.wed.close, Validators.required],
                thuClose: [this.store.hours.thu.close, Validators.required],
                friClose: [this.store.hours.fri.close, Validators.required],
                satClose: [this.store.hours.sat.close, Validators.required]
            });
        }
    }

    parsePhoneNumber(phone: string) {
        if (phone == null) {
            throw Error('Null phone number');
        }

        try {
            this.phone_area = this.store.phone.substring(1, 4);
            if (!this.phoneNumberPieceIsValid(this.phone_area)) {
                throw Error('Bad phone_area!');
            }
        } catch (Error) {
            this.phone_area = '';
        }

        try {
            this.phone_exchange = this.store.phone.substring(6, 9);
            if (!this.phoneNumberPieceIsValid(this.phone_exchange)) {
                throw Error('Bad phone_exchange!');
            }
        } catch (Error) {
            this.phone_exchange = '';
        }

        try {
            this.phone_subscriber = this.store.phone.substring(10);
            if (!this.phoneNumberPieceIsValid(this.phone_subscriber)) {
                throw Error('Bad phone_subscriber!');
            }
        } catch (Error) {
            this.phone_subscriber = '';
        }
    }

    phoneNumberPieceIsValid(phone_number_piece: string): boolean {
        for (var i = 0; i < phone_number_piece.length; i++) {
            if (!this.charIsNumber(phone_number_piece.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    charIsNumber(number: string): boolean {
        if (number.length != 1) return false;
        return number.charAt(0) >= '0' && number.charAt(0) <= '9';
    }

    buildPhoneString(): string {
        var phoneString =
            '(' +
            this.phone_area +
            ') ' +
            this.phone_exchange +
            '-' +
            this.phone_subscriber;

        return phoneString;
    }

    submitted() {
        this.submit.emit(this.form.value);
    }
}
