import { Component, Renderer, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.css', './bootstrap.css'] 
})
export class ModalComponent {
  @ViewChild('overlay') overlay: ElementRef;
  public visible = false;
  public visibleAnimate = false;

  constructor(private renderer : Renderer, private element : ElementRef){
      
  }

  public show(): void {
    this.visible = true;
    this.renderer.setElementClass(this.overlay.nativeElement, 'overlay', true);
    this.renderer.setElementStyle(this.overlay.nativeElement, 'opacity', '1');
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    this.renderer.setElementClass(this.overlay.nativeElement, 'overlay', false);
    this.renderer.setElementStyle(this.overlay.nativeElement, 'opacity', '0');
    setTimeout(() => this.visible = false, 300);
  }
}