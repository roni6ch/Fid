
export type Offer = {
  _id: any;
  businessId: string;
  cardId: string;
  description: string;
  link: string;
}
export type AllOffers = {
  offers: Offer[],
  nonOffers: Offer[]
}
