import { ICard } from '../ICard';

export interface IBasket {
	shopList?: ICard[];
	totalPrice: number;
}

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
