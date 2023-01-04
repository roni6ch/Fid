import { Component } from '@angular/core';
import { SessionQuery } from 'src/app/store/session.query';
import { SessionStore } from 'src/app/store/session.store';
import { ApiService } from '../../services/api.service';
import { AllCards, Card, CardType } from '../../types/Cards';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  userId: string = "";
  allCards: AllCards = { cards: [] };
  bankCards: Card[] = [];
  creditCards: Card[] = [];
  userCards: Card[] = [];
  userCardsIds: string[] = [];
  constructor(private sessionQuery: SessionQuery, private sessionStore: SessionStore, private api: ApiService) { }

  ngOnInit() {
    const user = localStorage.getItem('user')!;
    const { email } = JSON.parse(user);
    this.api.getCards(email).subscribe((allCards: AllCards) => {
      this.sessionStore.update(() => {
        return {
          allCards,
        }
      })
    });

    this.sessionQuery.getAllCards().subscribe((allCards: AllCards) => {
      this.allCards = allCards;
      this.userCards = allCards.userCards || [];
      this.userCardsIds = this.userCards.map(card => card._id);
      this.bankCards = this.filterCardsByType(allCards, CardType.BANK);
      this.creditCards = this.filterCardsByType(allCards, CardType.REGULAR);
    })
  }

  filterCardsByType(allCards: AllCards, type: CardType) {
    return allCards.cards.filter((card: { type: CardType; }) => card.type === type);
  }

  async onSelectCard(card: Card) {
    await this.api.setCard(card);
    this.sessionStore.update(() => {
      if (this.userCardsIds.includes(card._id)) {
        return {
          allCards: {
            ...this.allCards,
            userCards: this.userCards.filter(c => c._id !== card._id),
          },
        }
      } else {
        return {
          allCards: {
            ...this.allCards,
            userCards: [...this.userCards, card],
          },
        }
      }
    })
  }
}
