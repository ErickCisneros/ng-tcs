import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputErrorMessages } from './input-error-messages';

describe('InputErrorMessages', () => {
  let component: InputErrorMessages;
  let fixture: ComponentFixture<InputErrorMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputErrorMessages],
    }).compileComponents();

    fixture = TestBed.createComponent(InputErrorMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
