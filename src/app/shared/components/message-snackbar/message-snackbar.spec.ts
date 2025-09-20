import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageSnackbar } from './message-snackbar';

describe('MessageSnackbar', () => {
  let component: MessageSnackbar;
  let fixture: ComponentFixture<MessageSnackbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageSnackbar],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageSnackbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input message', () => {
    component.message = 'Hello World';
    fixture.detectChanges();
    expect(component.message).toBe('Hello World');
  });

  it('should set visible to true when show() is called', () => {
    jest.useFakeTimers();
    component.show();
    expect(component.visible).toBe(true);
    jest.useRealTimers();
  });

  it('should hide after 3 seconds', () => {
    jest.useFakeTimers();
    component.show();
    expect(component.visible).toBe(true);

    jest.advanceTimersByTime(3000);
    expect(component.visible).toBe(false);

    jest.useRealTimers();
  });
});
