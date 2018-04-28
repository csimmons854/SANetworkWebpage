import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsPerDayComponent } from './appointments-per-day.component';

describe('AppointmentsPerDayComponent', () => {
    let component: AppointmentsPerDayComponent;
    let fixture: ComponentFixture<AppointmentsPerDayComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AppointmentsPerDayComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AppointmentsPerDayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
