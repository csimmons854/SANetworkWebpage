import { Component, Input, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../item';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-items-home',
    templateUrl: './items-home.component.html',
    styleUrls: ['./items-home.component.scss']
})
export class ItemsHomeComponent implements OnInit {
    @Input() createForm: FormGroup;

    itemList: Item[] = [];

    selectedNdx = -1;
    selected: Item;
    editing = false;
    loggedIn = false;
    user;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private items: ItemService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder,

    ) {}

    ngOnInit() {
        this.createForm = this.fb.group ({
            key: ['', Validators.required]
        });
    }

    setItemsList(items: Item[]) {
        this.itemList = items;
    }

    itemSelected(ndx) {
        if (ndx !== this.selectedNdx) {
            this.editing = false;
        }
        this.selectedNdx = ndx;
        this.selected = this.itemList[this.selectedNdx];
    }

    editItems() {
        this.editing = true;
    }
    togglePause() {
        this.items.toggleItem(this.selected).subscribe(response => {
            if (response) {
                this.selected.powerState = !this.selected.powerState;
            }
        });
    }

    itemEdited(item) {
        this.selected.name = item.name;
        this.selected.fields = item.fields;
        this.editing = false;
    }

    userLoggedIn(user) {
        this.snackBar.open('Logging in...', '', {});
        this.items.login(user).subscribe(results => {
            if (results.code === 0) {
                this.user = user.username;
                this.items.getItems(this.user).subscribe(items => {
                    this.setItemsList(items);
                    this.loggedIn = true;
                    this.snackBar.dismiss();
                });
            } else {
                this.snackBar.open(results.error, '', {
                    duration: 2000
                });
            }
        });
    }

    signedUp(user) {
        this.snackBar.open('Signing Up...', '', {

        });
        console.log(user);
        this.items.signUp(user).subscribe(results => {
           if (results.success) {
               this.user = user.username;
               this.items.getItems(this.user).subscribe(items => {
                   this.setItemsList(items);
                   this.loggedIn = true;
                   this.snackBar.dismiss();
               });
           } else {
               this.snackBar.open('Username Already In Use', '', {
                   duration: 2000
               });
           }
        });
    }

    deleteItem() {
        this.selectedNdx = -1;
        this.itemList.splice(this.itemList.indexOf(this.selected), 1);
        this.items.deleteItem(this.selected).subscribe(rslt => {
            // do nothing
        });
        this.selected = null;
    }

    submit() {
        this.items.registerKey(this.user, this.createForm.value.key).subscribe(response =>{
            if (response.success) {
                this.snackBar.open('Device Registered', '', {
                    duration: 2000
                });
            } else {
                this.snackBar.open('Key Already Used', '', {
                    duration: 2000
                });
            }
        });
    }
}
