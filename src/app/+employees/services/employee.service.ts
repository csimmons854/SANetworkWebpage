import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { NewEmployee, Employee } from '../employee';
import { mockEmployees } from './mock-employees';
import { mockStores } from 'app/+stores/services/mock-stores';

import { StoreService } from '../../+stores/services/store.service';

let currentId = 100;

@Injectable()
export class EmployeeService {
    constructor(private stores: StoreService) {}

    /**
     * Adds a new employee to the database. Uses 'NewEmployee' type because
     * there are certain employee attributes that get created by the
     * backend, like id for example.
     * this.employees.createEmployee(someEmployee).subscribe(
     *      (result) => { // SUCCESS EVENT
     *          if (result.success) {
     *              console.log('Employee Created');
     *          } else {
     *              console.log('Unable to create employee');
     *          }
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    createEmployee(
        newEmployee: NewEmployee,
        storeID: string
    ): Observable<string> {
        let givenID = currentId.toString();
        const employee: Employee = Object.assign(newEmployee, {
            id: givenID
        });
        currentId++;

        mockEmployees.push(employee);

        let gottenStore;
        this.stores
            .getStore(storeID)
            .subscribe(gottenStore => gottenStore.employees.push(employee.id));

        return Observable.of(givenID);
    }

    /**
     * Returns a single employee by id
     * USAGE:
     * this.employees.getEmployee('123').subscribe(
     *      (employee) => { // SUCCESS EVENT
     *          console.log(employee);
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    getEmployee(id: string): Observable<Employee> {
        console.log('GET EMPLOYEE');

        let employee: Employee = null;
        for (let i = 0; i < mockEmployees.length; i++) {
            if (mockEmployees[i].id == id) {
                employee = mockEmployees[i];
            }
        }

        return Observable.create(observer => {
            if (employee) {
                observer.next(Object.assign({}, employee));
            } else {
                observer.error(Error('Employee not found'));
            }
        });
    }

    /**
     * Returns all employees.
     * USAGE:
     * this.employees.getEmployees().subscribe(
     *      (employees) => { // SUCCESS EVENT
     *          console.log(employees);
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    getEmployees(): Observable<Employee[]> {
        return Observable.of(JSON.parse(JSON.stringify(mockEmployees)));
    }

    /**
     * Updates the attributes for a employee. Employee must already exist
     * USAGE:
     * this.employees.updateEmployee(someEmployee).subscribe(
     *      (result) => { // SUCCESS EVENT
     *          if (result.success) {
     *              console.log('employee Updated');
     *          } else {
     *              console.log('Unable to update Employee');
     *          }
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    updateEmployee(
        updatedEmployee: Employee
    ): Observable<{ success: boolean }> {
        let employee: Employee = null;
        let ndx;
        for (let i = 0; i < mockEmployees.length; i++) {
            if (mockEmployees[i].id === updatedEmployee.id) {
                employee = mockEmployees[i];
                ndx = i;
            }
        }

        return Observable.create(observer => {
            if (employee) {
                mockEmployees[ndx] = updatedEmployee;
                observer.next({ success: true });
            } else {
                observer.error(Error('Employee not found'));
            }
        });
    }

    /**
     * Deletes a employee based on its id
     * USAGE:
     * this.employees.deleteEmployee('123').subscribe(
     *      (result) => { // SUCCESS EVENT
     *          if (result.success) {
     *              console.log('employee Deleted');
     *          } else {
     *              console.log('Unable to delete employee');
     *          }
     *      },
     *      (error) => { // ERROR EVENT
     *          console.log(error.message);
     *      }
     * )
     */
    deleteEmployee(id: string): Observable<{ success: boolean }> {
        let employee: Employee = null;
        let ndx;
        for (let i = 0; i < mockEmployees.length; i++) {
            if (mockEmployees[i].id === id) {
                employee = mockEmployees[i];
                ndx = i;
            }
        }

        let storeOfEmp;
        this.stores
            .getStoreForEmployee(id)
            .subscribe(gottenStore => (storeOfEmp = gottenStore));

        let empIndex;
        for (let i = 0; i < storeOfEmp.employees.length; i++) {
            if (storeOfEmp.employees[i] == id) {
                empIndex = i;
            }
        }
        storeOfEmp.employees.splice(empIndex, 1);
        mockEmployees.splice(ndx, 1);

        return Observable.create(observer => {
            if (employee) {
                observer.next({ success: true });
            } else {
                observer.error(Error('Employee not found'));
            }
        });
    }
}
