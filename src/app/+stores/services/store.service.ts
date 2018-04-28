import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { NewStore, Store } from '../store';
import { mockStores } from './mock-stores';

import { EmployeeService } from '../../+employees/services/employee.service';
import { EmployeeDetailComponent } from 'app/+employees/components/employee-detail/employee-detail.component';

let currentId = 3;

@Injectable()
export class StoreService {
    constructor(private http: HttpClient) {}

    private apiUrl = 'http://192.168.3.139:3000';
    /**
     * Adds a new store to the database. Uses 'NewStore' type because
     * there are certain Store attributes that get created by the
     * backend, like id for example.
     * this.stores.createStore(someStore).subscribe(
     *      (result) => { // SUCCESS EVENT
     *          if (result.success) {
     *              console.log('Store Created');
     *          } else {
     *              console.log('Unable to create store');
     *          }
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    createStore(newStore: NewStore): Observable<{ success: boolean }> {
        const store: Store = Object.assign(newStore, {
            id: currentId.toString()
        });
        currentId++;
        mockStores.push(store);

        return Observable.of({ success: true });
    }

    /**
     * Returns a single store by id
     * USAGE:
     * this.stores.getStore('123').subscribe(
     *      (store) => { // SUCCESS EVENT
     *          console.log(store);
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    getStore(id: string): Observable<Store> {
        let store: Store = null;
        for (let i = 0; i < mockStores.length; i++) {
            if (mockStores[i].id == id) {
                store = mockStores[i];
            }
        }
        // Start of set up to connect front and back end
        //  return this.http.get<Store>(this.apiUrl + '/stores/' + id, {
        //     headers: {'Content-Type': 'application/x-www-loginForm-urlencoded', 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJAYmF5bG9yLmNvbSIsInVzZXJuYW1lIjoiYnJhbnNvbiIsImlkIjoiNWE4MTllYjI2ZDc2NGY1OGQ3NWYxNjA1IiwiaWF0IjoxNTIxNTYwNDM3fQ.ksXAORvi_xWtBCpfmEYhbGRyn3oL0Nz8DPdmQPgUcZM'}});

        return Observable.create(observer => {
            if (store) {
                observer.next(Object.assign({}, store));
            } else {
                observer.error(Error('Store not found'));
            }
        });
    }

    /**
     * Returns all stores.
     * USAGE:
     * this.stores.getStores().subscribe(
     *      (stores) => { // SUCCESS EVENT
     *          console.log(stores);
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    getStores(): Observable<Store[]> {
        //return this.http.get<Store[]>(this.apiUrl + '/stores');
        return Observable.of(JSON.parse(JSON.stringify(mockStores)));
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
    updateStore(updatedStore: Store): Observable<{ success: boolean }> {
        let store: Store = null;
        let ndx;
        for (let i = 0; i < mockStores.length; i++) {
            if (mockStores[i].id === updatedStore.id) {
                store = mockStores[i];
                ndx = i;
            }
        }

        return Observable.create(observer => {
            if (store) {
                mockStores[ndx] = updatedStore;
                observer.next({ success: true });
            } else {
                observer.error(Error('Store not found'));
            }
        });
    }

    /**
     * Deletes a store based on its id
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
    deleteStore(id: string): Observable<{ success: boolean }> {
        let store: Store = null;
        let ndx;
        for (let i = 0; i < mockStores.length; i++) {
            if (mockStores[i].id === id) {
                store = mockStores[i];
                ndx = i;
            }
        }

        return Observable.create(observer => {
            if (store) {
                mockStores.splice(ndx, 1);
                observer.next({ success: true });
            } else {
                observer.error(Error('Store not found'));
            }
        });
    }

    transferEmployee(
        employeeID: string,
        destinationStoreID: string
    ): Observable<{ success: boolean }> {
        let curStore: Store = null;
        let destStore: Store = null;

        // get the store employee is currently in
        this.getStoreForEmployee(employeeID).subscribe(
            gottenStore => (curStore = gottenStore)
        );
        if (curStore == null) {
            return Observable.create(observer => {
                observer.error(
                    Error('Could not find start store (' + curStore.name + ').')
                );
            });
        }

        // get the store he will be transferred to
        this.getStore(destinationStoreID).subscribe(
            gottenStore => (destStore = gottenStore)
        );
        if (destStore == null) {
            return Observable.create(observer => {
                observer.error(
                    Error(
                        'Could not find destination store (' +
                            destStore.name +
                            ').'
                    )
                );
            });
        }

        // find and remove employee from current store's employee list
        let curStoreEmployeeIndex;
        for (let i = 0; i < curStore.employees.length; i++) {
            if (curStore.employees[i] == employeeID) {
                curStoreEmployeeIndex = i;
            }
        }
        if (curStoreEmployeeIndex == null) {
            return Observable.create(observer => {
                observer.error(
                    Error(
                        'Could not find employee: ' +
                            employeeID +
                            ' in start store (' +
                            curStore.name +
                            ').'
                    )
                );
            });
        } else {
            console.log(
                'Removed emp: ' +
                    employeeID +
                    ' from start store (' +
                    curStore.name +
                    ').'
            );
            curStore.employees.splice(curStoreEmployeeIndex, 1);
        }

        destStore.employees.push(employeeID);
        console.log(
            'Pushed emp: ' +
                employeeID +
                ' into dest store (' +
                destStore.name +
                ').'
        );

        return Observable.create(observer => {
            observer.next({ success: true });
        });
    }

    getStoreForEmployee(employeeID: string): Observable<Store> {
        let store: Store = null;
        for (let s = 0; s < mockStores.length; s++) {
            for (let e = 0; e < mockStores[s].employees.length; e++) {
                if (mockStores[s].employees[e] == employeeID) {
                    store = mockStores[s];
                }
            }
        }

        return Observable.create(observer => {
            if (store) {
                observer.next(Object.assign({}, store));
            } else {
                observer.error(
                    Error('Store not found for employee ' + employeeID)
                );
            }
        });
    }
}
