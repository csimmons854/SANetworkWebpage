import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from '../../../shared';
import { StoresComponent } from './stores.component';

@Pipe({
    name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

describe('StoresComponent', () => {
    let component: StoresComponent;
    let fixture: ComponentFixture<StoresComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [SharedModule, RouterTestingModule],
                declarations: [StoresComponent, MockTranslatePipe]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(StoresComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render the Stores title', () => {
        const titleEl = fixture.debugElement.query(By.css('.title'))
            .nativeElement;
        expect(titleEl.innerText).toEqual('stores.title');
    });
});
