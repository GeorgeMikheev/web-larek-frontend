import './scss/styles.scss';

import { WebLarekAPI } from './components/webLarekAPI';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/events';
import { ensureElement, ensureAllElements, cloneTemplate } from './utils/utils';
import { AppData } from './components/appData';
import { Page } from './components/page';
import { IBasket, ICard, IPopup } from './types/interfaces';
import { Card } from './components/card';
import { Popup } from './components/common/Modal';
import { Basket, BasketItem } from './components/common/Basket';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const popupTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

const webLarekAPI = new WebLarekAPI(CDN_URL, API_URL);
const events = new EventEmitter();
const appData = new AppData({} ,events);

const page = new Page(document.body, events);
const popup = new Popup(popupTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

export const allEvents: {
    cardsChange: string,
    cardSelect: string,
    cardPreview: string,
    modalOpen: string,
    modalClose: string,
    basketOpen: string,
    basketChange: string,
    orderOpen: string,
    basketSelect: string,
} = {
    cardsChange: 'cards:change',
    cardSelect: 'card:select',
    cardPreview: 'card:preview',
    modalOpen: 'modal:open',
    modalClose: 'modal:close',
    basketOpen: 'basket:open',
    basketChange: 'basket:change',
    orderOpen: 'order:open',
    basketSelect: 'basket:select',
}

events.on(allEvents.cardsChange, (cards: ICard[]) => {
    page.catalog = cards.map((card: ICard) => {
        const cardCatalogElement = new Card('card', cloneTemplate(cardCatalogTemplate), {
            onClick: () => {
                events.emit(allEvents.cardSelect, card);
            }
        });

        return cardCatalogElement.render(card);
    });
});

events.on(allEvents.cardSelect, (card: ICard) => {
    appData.setPreview(card);
});

events.on(allEvents.cardPreview, (cardData: ICard) => {
    const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
            if (appData.сheckProductToBasket(cardData)) {
                appData.removeProductAtBasket(cardData);
                card.button = 'В корзину';
            } else {
                appData.addProductToBasket(cardData);
                card.button = 'Удалить из корзины';
            }
        }
    });

    card.button = appData.сheckProductToBasket(cardData) ? 'Удалить из корзины' : 'В корзину';

    popup.render({
        content: card.render(cardData),
    });
});

events.on(allEvents.modalOpen, () => {
    page.locked = true;
});

events.on(allEvents.modalClose, () => {
    page.locked = false;
});

events.on(allEvents.basketOpen, () => {
    popup.render({
        content: basket.render(),
    });
});

events.on(allEvents.basketChange, (basketData: IBasket) => {
    basket.total = basketData.totalPrice;
    page.counter = basketData.shopList.length;
    basket.items = basketData.shopList.map((card: ICard, index: number) => {
        const product = new BasketItem(cloneTemplate(cardBasketTemplate), {
            onClick: () => {
                appData.removeProductAtBasket(card);
            }
        });

        return product.render({
            ...card,
            id: index + 1,
        });
    });
});

webLarekAPI.getCardsList().then(res => appData.setCards(res));
