import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../../../shared';
import { StoreService } from '../../services/store.service';
import { CreateStoreComponent } from './create-store.component';

@Pipe({
    name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

class MockStoreService {
    constructor() {}
}

describe('CreateStoreComponent', () => {
    let component: CreateStoreComponent;
    let fixture: ComponentFixture<CreateStoreComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [NoopAnimationsModule, SharedModule],
                declarations: [CreateStoreComponent, MockTranslatePipe],
                providers: [
                    { provide: StoreService, useValue: MockStoreService }
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateStoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
