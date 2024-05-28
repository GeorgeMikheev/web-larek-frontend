export interface IAppState {
    cardList: IProduct[];
    basket: IProduct[];
    order: IOrder;
}

export type ID = string;

// Модель товара:
export interface IProduct {
    id: string;
    category: string;
    title: string;
    discription: string;
    image: string;
    price: number | null;
}

//Формы:
export interface IPaymentForm {
    paymentMethod: string;
    address: string;
}

export interface IContactsForm {
    email: string;
    phone: string;
}

export interface IAllForms extends IPaymentForm, IContactsForm {}

// Данные заказа:
export interface IOrder extends IAllForms {
    items: IProduct;
}
