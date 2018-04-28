import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../../shared';
import { EmployeesComponent } from './employees.component';

@Pipe({
    name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

describe('EmployeesComponent', () => {
    let component: EmployeesComponent;
    let fixture: ComponentFixture<EmployeesComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, RouterTestingModule],
                declarations: [EmployeesComponent, MockTranslatePipe]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the Employees title', () => {
        const titleEl = fixture.debugElement.query(By.css('.title'))
            .nativeElement;
        expect(titleEl.innerText).toEqual('employees.title');
    });
});
