import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Field, Item } from '../../../item';
import { ItemService } from '../../../services/item.service';

@Component({
    selector: 'app-edit-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
    @Input() item: Item;
    @Input() fields: FormArray;
    @Input() form: FormGroup;

    itemToEdit: Item;
    itemID: string;
    pageTitle = 'Edit Login';

    @Output() itemEdited: EventEmitter<any> = new EventEmitter<any>();


    constructor(
        private items: ItemService,
        private fb: FormBuilder,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.itemID = this.item.id;
        const fieldsArray = new FormArray([]);
        this.item.fields.forEach((element) => {
            fieldsArray.push(this.createField(element));
        });
        this.form = this.fb.group({
            name: [this.item.name, Validators.required],
            fields: fieldsArray
        });
        if (this.itemToEdit == null) {
        }
    }

    createField(field: Field): FormGroup {
        return this.fb.group({
            name: field.name,
            value: [
                field.value,
                [Validators.required,
                Validators.pattern(field.valueValidation)]
            ],
            hasOptions: [field.hasOptions],
            options: [field.options],
            validation: field.valueValidation
            }
        );
    }

    submit() {
        const updatedItem: Item = this.form.value;
        updatedItem.id = this.itemID;
        this.items.updateItem(updatedItem).subscribe(response => {
            if (response) {
                this.itemEditedEvent(updatedItem);
                this.snackBar.open('Login Updated ', '', {
                    duration: 2000
                });
            }
        });
    }

    itemEditedEvent(event) {
        this.itemEdited.emit(event);
    }
}
