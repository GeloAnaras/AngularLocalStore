import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadurlComponent } from './badurl.component';

describe('BadurlComponent', () => {
  let component: BadurlComponent;
  let fixture: ComponentFixture<BadurlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadurlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
