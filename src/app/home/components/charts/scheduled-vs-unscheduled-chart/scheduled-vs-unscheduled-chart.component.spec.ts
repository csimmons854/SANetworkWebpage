import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledVsUnscheduledChartComponent } from './scheduled-vs-unscheduled-chart.component';

describe('ScheduledVsUnscheduledChartComponent', () => {
    let component: ScheduledVsUnscheduledChartComponent;
    let fixture: ComponentFixture<ScheduledVsUnscheduledChartComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ScheduledVsUnscheduledChartComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduledVsUnscheduledChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
