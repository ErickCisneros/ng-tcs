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
});
