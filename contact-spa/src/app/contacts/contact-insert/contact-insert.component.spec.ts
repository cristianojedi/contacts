import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInsertComponent } from './contact-insert.component';

describe('ContactInsertComponent', () => {
  let component: ContactInsertComponent;
  let fixture: ComponentFixture<ContactInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
