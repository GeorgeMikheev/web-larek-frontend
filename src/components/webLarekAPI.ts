import { Api } from './base/api';
import {
	IOrderResult,
	IPaymentOrder,
	IWebLarekAPI,
} from '../types/IWebLarekAPI';
import { ICard } from '../types/ICard';
import { ApiListResponse } from './base/api';

// Класс получения данных с сервера:

export class WebLarekAPI extends Api implements IWebLarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);

		this.cdn = cdn;
	}

	getCardsList(): Promise<ICard[]> {
		return this.get('/product/').then((data: ApiListResponse<ICard>) =>
			data.items.map((card: ICard) => ({
				...card,
				image: this.cdn + card.image,
			}))
		);
	}

	getCard(uuid: string): Promise<ICard> {
		return this.get(`/product/${uuid}`).then((card: ICard) => ({
			...card,
			image: this.cdn + card.image,
		}));
	}

	createOrder(order: IPaymentOrder) {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}
