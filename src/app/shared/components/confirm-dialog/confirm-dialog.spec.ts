import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialog } from './confirm-dialog';

describe('ConfirmDialog', () => {
  let component: ConfirmDialog;
  let fixture: ComponentFixture<ConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancelAction when onCancel is called', () => {
    const spy = jest.spyOn(component.cancelAction, 'emit');
    component.onCancel();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit confirmAction when onConfirm is called', () => {
    const spy = jest.spyOn(component.confirmAction, 'emit');
    component.onConfirm();
    expect(spy).toHaveBeenCalled();
  });
});
