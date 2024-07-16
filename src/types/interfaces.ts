// Интерфейс списка карточек:

export interface ICardList {
    createCard(): void; // Отображает карточки на странице.
}

// Интерфейс карточки:

export interface ICard {
    category: string;
    title: string;
    image: string;
    price: number;
    AddToBasket(): void; // Доюавляет това в корзину.
}

// Интерфейс всех попапов: 
//! Этот класс является прототипом всех классов модальных окон.

export interface IPopaps {
    clouseButton: HTMLElement | null;
    title?: string;
    nextButton: HTMLElement | null;
    openPopap(): void; // Открывает попап.
    clousePopap(): void; // Закрывает попап.
    sendingData?(): void; // Отправляет пользовательские данные.
}

// Интерфейс попапа карточки:

export interface ICardPopap {
    category: string;
    image: string;
    description: string;
    price: number;
}

// Интерфейс корзины: 

export interface IBasket {
    shopList?: {
        listItemNumber: number;
        title: string;
        price: number;
        deleteButton: HTMLElement | null; 
    };
    totalPrice: number;
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

// Интерфейс ввода данный пользователя:

export interface IUserDataForm {
    emailTitle: string;
    emailInput: HTMLElement | null;
    phoneTitle: string;
    phoneInput: HTMLElement | null;
}

// Последний попап:

export interface IFinalPopap {
    image: string;
    totalPrice: number;
}
