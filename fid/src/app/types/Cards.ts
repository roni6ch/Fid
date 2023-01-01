export type Card = {
  _id: any;
  name: string;
  type: CardType;
  photoUrl: string;
}

export enum CardType {
  REGULAR = 'regular',
  BANK = 'bank'
}

export type AllCards = {
  cards: Card[],
  userCards?: Card[]
}
