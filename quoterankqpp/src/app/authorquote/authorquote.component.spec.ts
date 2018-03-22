import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorquoteComponent } from './authorquote.component';

describe('AuthorquoteComponent', () => {
  let component: AuthorquoteComponent;
  let fixture: ComponentFixture<AuthorquoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorquoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
