import { Model } from "./base/Model";
import { ICard, IBasket } from "../types/interfaces";
import { IEvents } from "./base/events";

export class AppData {
    cards: ICard[] = [];

    constructor(protected events: IEvents) {}

    setCards(cards: ICard[]) {
        this.cards = cards;
        this.events.emit('cards:change', this.cards);
    }
}
