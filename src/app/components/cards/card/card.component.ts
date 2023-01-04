import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/types/Cards';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cards: Card[] = [];
  @Input() userCardsIds: string[] = [];
  @Output() onChildSelectCard = new EventEmitter<Card>();

  constructor() {

  }
  onSelectCard(card: Card) {
    this.onChildSelectCard.emit(card);
  }
}
