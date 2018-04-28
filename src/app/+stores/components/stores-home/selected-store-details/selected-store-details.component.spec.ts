import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedStoreDetailsComponent } from './selected-store-details.component';

describe('SelectedStoreDetailsComponent', () => {
    let component: SelectedStoreDetailsComponent;
    let fixture: ComponentFixture<SelectedStoreDetailsComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [SelectedStoreDetailsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectedStoreDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
