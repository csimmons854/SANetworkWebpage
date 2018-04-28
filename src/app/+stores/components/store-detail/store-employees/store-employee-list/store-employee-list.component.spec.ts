import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEmployeeListComponent } from './store-employee-list.component';

describe('StoreEmployeeListComponent', () => {
    let component: StoreEmployeeListComponent;
    let fixture: ComponentFixture<StoreEmployeeListComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [StoreEmployeeListComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(StoreEmployeeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
