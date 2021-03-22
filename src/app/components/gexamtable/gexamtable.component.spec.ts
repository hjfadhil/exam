import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GexamtableComponent } from './gexamtable.component';

describe('GexamtableComponent', () => {
  let component: GexamtableComponent;
  let fixture: ComponentFixture<GexamtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GexamtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GexamtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
