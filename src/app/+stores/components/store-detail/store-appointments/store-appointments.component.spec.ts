import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAppointmentsComponent } from './store-appointments.component';
import { SharedMaterialModule } from '../../../../shared/shared-material.module';

describe('StoreAppointmentsComponent', () => {
    let component: StoreAppointmentsComponent;
    let fixture: ComponentFixture<StoreAppointmentsComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [StoreAppointmentsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreAppointmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
