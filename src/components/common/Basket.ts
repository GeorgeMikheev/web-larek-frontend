import {Component} from "../base/Component";
import {cloneTemplate, createElement, ensureElement, formatNumber} from "../../utils/utils";
import {EventEmitter} from "../base/events";
import { IBasket, ICard } from "../../types/interfaces";
import { allEvents } from "../..";

export interface IBasketView {
    items: HTMLElement[];
    total: number;
    selected: string[];
}

export interface IBasketItem {
    id: number;
    title: string;
    price: number;
}

export interface IBasketItemActions {
    onClick: (event: MouseEvent) => void;
}

export class Basket extends Component<IBasketView> {
    protected _shopList: HTMLElement;
    protected _totalPrice: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._shopList = ensureElement<HTMLElement>('.basket__list', this.container);
        this._totalPrice = this.container.querySelector('.basket__price');
        this._button = this.container.querySelector('.basket__action');

        if (this._button) {
            this._button.addEventListener('click', () => {
                events.emit(allEvents.orderOpen);
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._shopList.replaceChildren(...items);
            console.log(true)
        } else {
            this._shopList.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this._button, false);
        } else {
            this.setDisabled(this._button, true);
        }
    }

    set total(total: number) {
        this.setText(this._totalPrice, formatNumber(total));
    }
}

export class BasketItem extends Component<IBasketItem> {
    protected _id: HTMLElement;
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IBasketItemActions) {
        super(container);

        this._id = ensureElement<HTMLElement>('.basket__item-index', container);
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
        this._button = ensureElement<HTMLButtonElement>('.card__button', container);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set id(value: number) {
        this.setText(this._id, value);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set price(value: number) {
        this.setText(this._price, value);
    }
}
