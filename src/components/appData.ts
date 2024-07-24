import { Model } from "./base/Model";
import { ICard, IBasket, IForm, IOrder, FormErrors, IAppData, IContactForm } from "../types/interfaces";
import { IEvents } from "./base/events";
import { allEvents } from "..";

export class AppData extends Model<IAppData> {
    cards: ICard[] = [];
    demonstrationCard: ICard;
    basket: IBasket = {
        shopList: [],
        totalPrice: 0,
    };
    order: IOrder = {
        payment: '',
        address: '',
    };

    contactForm: IContactForm = {
        email: '',
        phone: '',
    };

    formErrors: FormErrors = {};

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

    setOrderField(field: keyof IOrder, value: string) {
        this.order[field] = value;

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    setContactField(field: keyof IContactForm, value: string) {
        this.contactForm[field] = value;

        if (this.validateContactForm()) {
            this.events.emit('contacts:ready', this.contactForm);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты';
        }
        if (!this.order.address) {
            errors.address = 'Необходимо указать адресс';
        }
        this.formErrors = errors;
        this.events.emit(allEvents.formErrorsOrderChange, this.formErrors);
        return Object.keys(errors).length === 0;
    }

    validateContactForm() {
        const errors: typeof this.formErrors = {};
        if (!this.contactForm.email) {
            errors.email = 'Необходимо указать адресс почты';
        }
        if (!this.contactForm.phone) {
            errors.phone = 'Необходимо указать номер телефона';
        }
        this.formErrors = errors;
        this.events.emit(allEvents.formErrorsContactChange, this.formErrors);
        return Object.keys(errors).length === 0;
    }

    clearAppData() {
        this.basket = {
            shopList: [],
            totalPrice: 0,
        };
        this.order = {
            payment: '',
            address: '',
        };
    
        this.contactForm = {
            email: '',
            phone: '',
        };

        this.events.emit(allEvents.basketChange, this.basket);
    }
}
