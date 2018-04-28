import {
    Component,
    Input,
    Inject,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef
} from '@angular/core';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';

import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '../../../store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { Appointment } from '../appointment';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    selector: 'app-store-appointments',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './store-appointments.component.html',
    styleUrls: ['./store-appointments.component.scss']
})
export class StoreAppointmentsComponent {
    @Input('store') store: Store;

    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: string = 'month';
    viewDate: Date = new Date();

    modalData: {
        action: string;
        event: CalendarEvent;
    };

    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    refresh: Subject<any> = new Subject();

    appointments: Appointment[] = [
        {
            name: 'John Doe',
            store_id: '1',
            time: new Date('March 29, 2018 10:00:00'),
            items: 'N/A'
        },
        {
            name: 'Jim Doe',
            store_id: '1',
            time: new Date('March 29, 2018 11:00:00'),
            items: 'N/A'
        },
        {
            name: 'John Doe',
            store_id: '1',
            time: new Date('March 30, 2018 14:00:00'),
            items: 'N/A'
        }
    ];

    events: CalendarEvent[] = [
        {
            start: new Date('March 27, 2018 12:00:00'),
            title: 'John Doe',
            color: colors.red,
            actions: this.actions
        },
        {
            start: new Date('March 28, 2018 14:00:00'),
            title: 'Jim Doe',
            color: colors.red,
            actions: this.actions
        },
        {
            start: new Date('March 27, 2018 11:00:00'),
            title: 'Jane Doe',
            color: colors.red,
            actions: this.actions
        }
    ];

    activeDayIsOpen: boolean = true;

    constructor(private modal: NgbModal, public dialog: MatDialog) {}

    time: string;
    name: string;
    date: string;
    items: string;

    openApptDialog(): void {
        let dialogRef = this.dialog.open(AppointmentDialog, {
            width: '300px',
            data: {
                name: this.name,
                time: this.time,
                date: this.date,
                items: this.items
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('Appointment Creator closed');
        });
    }

    dayClicked({ date, events }: { date: Date; events: Appointment[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            if (
                (isSameDay(this.viewDate, date) &&
                    this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd
    }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    }

    // Where to open the modal
    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

    addEvent(): void {
        this.appointments.push({
            name: 'Name Here',
            store_id: '1',
            time: new Date('March 27, 2018 16:00:00'),
            items: 'N/A'
        });
        this.refresh.next();
    }
}

@Component({
    selector: 'appointment-dialog',
    templateUrl: 'appointment-dialog.html'
})
export class AppointmentDialog {
    times = [
        { value: '10', viewValue: '10:00 AM' },
        { value: '11', viewValue: '11:00 AM' },
        { value: '12', viewValue: '12:00 AM' },
        { value: '1', viewValue: '1:00 PM' },
        { value: '2', viewValue: '2:00 PM' },
        { value: '3', viewValue: '3:00 PM' },
        { value: '4', viewValue: '4:00 PM' },
        { value: '5', viewValue: '5:00 PM' },
        { value: '6', viewValue: '6:00 PM' }
    ];

    constructor(
        public dialogue: MatDialogRef<AppointmentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
}
