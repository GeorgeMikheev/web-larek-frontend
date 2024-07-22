import {Component} from "../base/Component";
import {cloneTemplate, createElement, ensureElement, formatNumber} from "../../utils/utils";
import {EventEmitter} from "../base/events";
import { IBasket, ICard } from "../../types/interfaces";

class Basket extends Component<IBasket> {
    protected _shopList: HTMLElement;
    protected _totalPrice: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._shopList = ensureElement<HTMLElement>('.basket__list', this.container);
        this._totalPrice = this.container.querySelector('.basket__total');
        this._button = this.container.querySelector('.basket__action');
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this._shopList.replaceChildren(...items);
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
