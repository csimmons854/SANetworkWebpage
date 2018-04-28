import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekPerformanceCardsComponent } from './week-performance-cards.component';

describe('WeekPerformanceCardsComponent', () => {
    let component: WeekPerformanceCardsComponent;
    let fixture: ComponentFixture<WeekPerformanceCardsComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [WeekPerformanceCardsComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(WeekPerformanceCardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
