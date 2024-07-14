// Интерфейс списка карточек:

interface ICardList {
    createCard(): void; // Отображает карточки на странице.
}

// Интерфейс карточки:

interface ICard {
    category: string;
    title: string;
    image: string;
    price: number;
    AddToBasket(): void; // Доюавляет това в корзину.
}

// Интерфейс всех попапов: 
//! Этот класс является прототипом всех классов модальных окон.

interface IPopaps {
    clouseButton: HTMLElement | null;
    title?: string;
    nextButton: HTMLElement | null;
    openPopap(): void; // Открывает попап.
    clousePopap(): void; // Закрывает попап.
    sendingData?(): void; // Отправляет пользовательские данные.
}

// Интерфейс попапа карточки:

interface ICardPopap {
    category: string;
    image: string;
    description: string;
    price: number;
}

// Интерфейс корзины: 

interface IBasket {
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

interface IPayment {
    paymentTitle: string;
    onlinePaymentRadio: HTMLElement | null;
    offlinePaymentRadio: HTMLElement | null;
    addressTitle: string;
    addressInput: HTMLElement | null;
}

// Интерфейс ввода данный пользователя:

interface IUserDataForm {
    emailTitle: string;
    emailInput: HTMLElement | null;
    phoneTitle: string;
    phoneInput: HTMLElement | null;
}

// Последний попап:

interface IFinalPopap {
    image: string;
    totalPrice: number;
}
