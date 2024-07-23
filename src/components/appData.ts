import { Model } from "./base/Model";
import { ICard, IBasket } from "../types/interfaces";
import { IEvents } from "./base/events";
import { allEvents } from "..";

export class AppData extends Model<ICard> {
    cards: ICard[] = [];
    demonstrationCard: ICard;
    basket: IBasket = {
        shopList: [],
        totalPrice: 0,
    }

    constructor(data: Partial<ICard>, protected events: IEvents) {
        super(data, events);
    }

    setCards(cards: ICard[]) {
        this.cards = cards;
        this.events.emit(allEvents.cardsChange, this.cards);
    }

    setPreview(card: ICard) { 
        this.demonstrationCard = card;
        this.events.emit(allEvents.cardPreview, this.demonstrationCard);
    }

    addProductToBasket(card: ICard) {
        this.basket.totalPrice += card.price;
        this.basket.shopList.push(card);
        this.events.emit(allEvents.basketChange, this.basket);
    }

    removeProductAtBasket(card: ICard) {
        this.basket.totalPrice -= card.price;
        this.basket.shopList = this.basket.shopList.filter(item => item !== card);
        this.events.emit(allEvents.basketChange, this.basket);
    }

    сheckProductToBasket(product: ICard) {
        return this.basket.shopList.includes(product);
    }
}
