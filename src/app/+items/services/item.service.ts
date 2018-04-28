import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Item } from '../item';





@Injectable()
export class ItemService {
    items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);



    constructor(private http: HttpClient) {
    }

    getItems(user): Observable<Item[]> {
        const gottenItems = this.http.get<Item[]>('http://sanetworkserver.herokuapp.com/SANetwork/' + user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (gottenItems) {
            gottenItems.subscribe(items => {
            });
            return gottenItems;
        } else {
            return Observable.create(observer => {
                observer.error(Error('Items not found'));
            });
        }
    }

    /**
     * Updates the attributes for a Store. Store must already exist
     * USAGE:
     * this.stores.updateStore(someStore).subscribe(
     *      (result) => { // SUCCESS EVENT
     *          if (result.success) {
     *              console.log('Store Updated');
     *          } else {
     *              console.log('Unable to update store');
     *          }
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    updateItem(updatedItem: Item): Observable<any> {
        const outBound = {
            id: updatedItem.id,
            name: updatedItem.name,
            fields: updatedItem.fields
        };
        return this.http.put(
            'http://sanetworkserver.herokuapp.com/SANetwork',
            outBound,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    toggleItem(updatedItem: Item): Observable<any> {
        const outBound = {
            id: updatedItem.id,
            powerState: updatedItem.powerState
        };
        return this.http.put(
            'http://sanetworkserver.herokuapp.com/SANetwork/disable',
            outBound,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    /**
     * Deletes a item based on its id
     * USAGE:
     * this.stores.deleteStore('123').subscribe(
     *      (result) => { // SUCCESS EVENT
     *          if (result.success) {
     *              console.log('Store Deleted');
     *          } else {
     *              console.log('Unable to delete store');
     *          }
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    deleteItem(updatedItem: Item): Observable<any> {
        const outBound = {
            id: updatedItem.id
        };
        return this.http.put(
            'http://sanetworkserver.herokuapp.com/SANetwork/delete',
            outBound,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    signUp(newUser): Observable<any> {
        const outBound = {
            username: newUser.username,
            password: newUser.password
        };
        return this.http.put(
            'http://sanetworkserver.herokuapp.com/SANetwork/signup',
            outBound,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    login(newUser): Observable<any> {
        const outBound = {
            username: newUser.username,
            password: newUser.password
        };
        return this.http.put(
            'http://sanetworkserver.herokuapp.com/SANetwork/login',
            outBound,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    registerKey(username, productKey): Observable<any> {
        const outBound = {
            user: username,
            key: productKey
        };
        return this.http.put(
            'http://sanetworkserver.herokuapp.com/SANetwork/registerKey',
            outBound,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }
}
