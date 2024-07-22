import { Api } from "./base/api";
import { ICard, IOrder, IOrderResult, IWebLarekAPI } from "../types/interfaces";
import { ApiListResponse } from "./base/api"

// Класс получения данных с сервера:

export class WebLarekAPI extends Api implements IWebLarekAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);

        this.cdn = cdn;
    }

    getCardsList(): Promise<ICard[]> {
        return this.get('/product/').then((data: ApiListResponse<ICard>) => data.items.map((card: ICard) => ({
            ...card,
            image: this.cdn + card.image
        })));
    }

    getCard(uuid: string): Promise<ICard> {
        return this.get(`/product/${uuid}`).then((card: ICard) => ({
            ...card,
            image: this.cdn + card.image
        }));
    }

    createOrder(card: IOrder) {
        return this.post('/order', card)
                    .then((data: IOrderResult) => data);
    }
}
