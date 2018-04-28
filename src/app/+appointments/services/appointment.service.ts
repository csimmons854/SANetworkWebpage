import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { Appointment } from '../appointment';
import { mockApps } from './mock-appointments';

@Injectable()
export class AppointmentService {
    constructor() {}

    /**
     * Adds a new appointment to the database.
     */
    createAppointment(
        appointment: Appointment
    ): Observable<{ success: boolean }> {
        mockApps.push(appointment);

        return Observable.of({ success: true });
    }

    /**
     * Returns an appointment by name, store_id, and time.
     */
    getAppointment(
        name: string,
        store_id: string,
        time: Date
    ): Observable<Appointment> {
        let appointment: Appointment = null;
        for (let i = 0; i < mockApps.length; i++) {
            if (
                mockApps[i].name == name &&
                mockApps[i].store_id == store_id &&
                mockApps[i].time == time
            ) {
                appointment = mockApps[i];
            }
        }

        return Observable.create(observer => {
            if (appointment) {
                observer.next(Object.assign({}, appointment));
            } else {
                observer.error(Error('Appointment not found'));
            }
        });
    }

    /**
     * Returns all appointments for a given store.
     */
    getAppointments(store_id: string): Observable<Appointment[]> {
        let appointments: Appointment[] = [];
        for (let i = 0; i < mockApps.length; i++) {
            if (mockApps[i].store_id == store_id) {
                appointments.push(mockApps[i]);
            }
        }

        return Observable.create(observer => {
            if (appointments) {
                observer.next(Object.assign({}, appointments));
            } else {
                observer.error(Error('No appointments found'));
            }
        });
    }

    /**
     * Updates the details for an appointment.
     */
    updateAppointment(
        updatedAppointment: Appointment
    ): Observable<{ success: boolean }> {
        let appointment: Appointment = null;
        let index;
        for (let i = 0; i < mockApps.length; i++) {
            if (
                mockApps[i].name == updatedAppointment.name &&
                mockApps[i].store_id == updatedAppointment.store_id &&
                mockApps[i].time == updatedAppointment.time
            ) {
                appointment = mockApps[i];
                index = i;
            }
        }

        return Observable.create(observer => {
            if (appointment) {
                mockApps[index] = updatedAppointment;
                observer.next({ success: true });
            } else {
                observer.error(Error('Appointment not found'));
            }
        });
    }

    /**
     * Deletes an appointment based on its name, store_id, and time.
     */
    deleteAppointment(
        name: string,
        store_id: string,
        time: Date
    ): Observable<{ success: boolean }> {
        let appointment: Appointment = null;
        let index;
        for (let i = 0; i < mockApps.length; i++) {
            if (
                mockApps[i].name == name &&
                mockApps[i].store_id == store_id &&
                mockApps[i].time == time
            ) {
                appointment = mockApps[i];
                index = i;
            }
        }

        return Observable.create(observer => {
            if (appointment) {
                mockApps.splice(index, 1);
                observer.next({ success: true });
            } else {
                observer.error(Error('Appointment not found'));
            }
        });
    }
}
