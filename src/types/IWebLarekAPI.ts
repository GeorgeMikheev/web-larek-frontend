import { ICard } from './ICard';

export interface IWebLarekAPI {
	getCardsList(): Promise<ICard[]>;
	getCard(uuid: string): Promise<ICard>;
	createOrder(card: IPaymentOrder): Promise<object>;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IPaymentOrder {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}
