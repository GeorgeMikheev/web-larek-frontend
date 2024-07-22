import './scss/styles.scss';

import { WebLarekAPI } from './components/webLarekAPI';
import { API_URL, CDN_URL } from './utils/constants';

import { EventEmitter } from './components/base/events';
import { ensureElement, ensureAllElements, cloneTemplate } from './utils/utils';
import { AppData } from './components/appData';
import { Page } from './components/page';
import { ICard } from './types/interfaces';
import { Card } from './components/card';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

const webLarekAPI = new WebLarekAPI(CDN_URL, API_URL);
const events = new EventEmitter();
const appData = new AppData(events);

const page = new Page(document.body, events);

events.on('cards:change', (cards: ICard[]) => {
    page.catalog = cards.map((card: ICard) => {
        const cardCatalogElement = new Card('card', cloneTemplate(cardCatalogTemplate));
        return cardCatalogElement.render(card);
    })
});

webLarekAPI.getCardsList().then(res => appData.setCards(res));
