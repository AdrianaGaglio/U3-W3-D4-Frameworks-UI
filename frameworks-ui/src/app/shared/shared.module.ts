import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { NewpostComponent } from './newpost/newpost.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardComponent, ModalComponent, NewpostComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CardComponent, ModalComponent, NewpostComponent],
})
export class SharedModule {}
