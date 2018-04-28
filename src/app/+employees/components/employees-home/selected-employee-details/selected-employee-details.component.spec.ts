import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedEmployeeDetailsComponent } from './selected-employee-details.component';

describe('SelectedEmployeeDetailsComponent', () => {
    let component: SelectedEmployeeDetailsComponent;
    let fixture: ComponentFixture<SelectedEmployeeDetailsComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SelectedEmployeeDetailsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectedEmployeeDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
