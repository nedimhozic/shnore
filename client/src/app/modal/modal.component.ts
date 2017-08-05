import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';
import { TriggerService } from '../common/trigger.service';
import { ModalType } from './modal-type.enum';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css', './bootstrap.css']
})
export class ModalComponent {
  @ViewChild('overlay') overlay: ElementRef;
  public visible = false;
  public visibleAnimate = false;
  public password: string;

  public type: ModalType;
  public btnValue: string;
  public isCloseVisible: boolean = false;

  constructor(
    private renderer: Renderer,
    private element: ElementRef,
    private trigger: TriggerService
  ) {

  }

  public show(_type: ModalType): void {
    this.type = _type;
    this.isCloseVisible = this.type == ModalType.Set;
    if (this.type == ModalType.Confirm) this.btnValue = 'Confirm';
    else this.btnValue = 'Set';

    this.visible = true;
    this.renderer.setElementClass(this.overlay.nativeElement, 'overlay', true);
    this.renderer.setElementStyle(this.overlay.nativeElement, 'opacity', '1');
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    this.renderer.setElementClass(this.overlay.nativeElement, 'overlay', false);
    this.renderer.setElementStyle(this.overlay.nativeElement, 'opacity', '0');
    this.visible = false;
  }

  public close(event: MouseEvent): void {
    if (this.type == ModalType.Confirm) return;
    this.hide();
  }

  public onSubmit(): void {
    if (this.type == ModalType.Set) {
      this.trigger.setPassword(this.password);
    }
    else {
      this.trigger.confirmPassword(this.password);
    }
    this.password = '';
    this.hide();
  }
}