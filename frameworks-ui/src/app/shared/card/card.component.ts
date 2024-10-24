import { Component, Input } from '@angular/core';
import { iUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() user!: iUser;
}
