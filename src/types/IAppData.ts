import { IOrderForm } from './order/IOrderForm';
import { ICard } from './ICard';
import { IContactForm } from './order/IContactForm';

export type FormErrors = Partial<
	Record<keyof IOrderForm | keyof IContactForm, string>
>;

export interface IAppData extends ICard {
	product: ICard[];
	basket: string[];
	order: IOrderForm | null;
	loading: boolean;
}
