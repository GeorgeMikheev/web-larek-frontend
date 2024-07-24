import { Form } from "./common/Form";
import { IOrder } from "../types/interfaces";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";

export class Order extends Form<IOrder> {
    protected _paymentCash: HTMLButtonElement;
    protected _paymentCard: HTMLButtonElement;
    protected _address: HTMLInputElement;
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this._paymentCard = ensureElement<HTMLButtonElement>('.button_alt[name=card]', container);
        this._paymentCash = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', container);
        this._address = ensureElement<HTMLInputElement>('.form__input[name=address]', container);

        this._paymentCard.addEventListener('click', () => {
            this.payment = 'card';
        });
        this._paymentCash.addEventListener('click', () => {
            this.payment = 'cash';
        });
    }

    set payment(value: string) {
        this.toggleClass(this._paymentCard, 'button_alt-active', value === 'card');
        this.toggleClass(this._paymentCash, 'button_alt-active', value === 'cash');
        this.onInputChange('payment', value);
    }

    set address(value: string) {
        this._address.value = value;
        this.onInputChange('address', value);
    }
}
