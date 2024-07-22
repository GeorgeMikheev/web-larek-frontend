// Интерфейс карточки:

export interface ICard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
    //AddToBasket(): void; // Добавляет товар в корзину.
}

// Интерфейс списка карточек:

export interface ICardList {
    cardContainer: HTMLElement | null;
    cardTemplate: HTMLTemplateElement | null;
    createCard(): void; // Отображает карточки на странице.
}

// Интерфейс всех попапов: 
//! Этот класс является прототипом всех классов модальных окон.

export interface IPopaps {
    _clouseButton: HTMLElement | null;
    title?: string;
    nextButton: HTMLElement | null;
    openPopap(): void; // Открывает попап.
    clousePopap(): void; // Закрывает попап.
    sendingData?(): void; // Отправляет пользовательские данные.
}

// Интерфейс корзины: 

export interface IBasket {
    _shopList?: ICard[];
    _totalPrice: number;
    countTotalPrice(): number; // Считает итоговую сумму оплаты.
    deletePurchase(purchase: string): void; // Удаляет покупку из корзины.
}

// Интерфейс попапа оплаты:

export interface IPayment {
    paymentTitle: string;
    onlinePaymentRadio: HTMLElement | null;
    offlinePaymentRadio: HTMLElement | null;
    addressTitle: string;
    addressInput: HTMLElement | null;
}

// Интерфейс ввода данных пользователя:

export interface IForm {
    valid: boolean;
    errors: string[];
    
}

// Последний попап:

export interface IFinalPopap {
    image: string;
    totalPrice: number;
}

// Интерфейс запроса:

export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

// Интерфейсы ответа:

export interface IOrderResult {
    id: string;
    total: number;
}

// Интрефейс класса WebLarekAPI:

export interface IWebLarekAPI {
    getCardsList(): Promise<ICard[]>;
    getCard(uuid: string): Promise<ICard>;
    createOrder(card: IOrder): Promise<object>;
}
