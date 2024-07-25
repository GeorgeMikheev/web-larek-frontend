import './scss/styles.scss';

import { WebLarekAPI } from './components/webLarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ensureElement, cloneTemplate } from './utils/utils';
import { AppData } from './components/appData';
import { Page } from './components/page';
import { IBasket } from './types/common/IBasket';
import { ICard } from './types/ICard';
import { IOrderForm } from './types/order/IOrderForm';
import { IContactForm } from './types/order/IContactForm';
import { Card } from './components/card';
import { Popup } from './components/common/Modal';
import { Basket, BasketItem } from './components/common/Basket';
import { OrderForm } from './components/order/orderForm';
import { ContactForm } from './components/order/contactForm';
import { Success } from './components/common/Success';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const popupTemplate = ensureElement<HTMLTemplateElement>('#modal-container');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const webLarekAPI = new WebLarekAPI(CDN_URL, API_URL);
const events = new EventEmitter();
const appData = new AppData({}, events);
const page = new Page(document.body, events);
const popup = new Popup(popupTemplate, events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new OrderForm(cloneTemplate(orderTemplate), events);
const contactForm = new ContactForm(cloneTemplate(contactFormTemplate), events);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		popup.closePopup();
	},
});

export const allEvents: {
	cardsChange: string;
	cardSelect: string;
	cardPreview: string;
	modalOpen: string;
	modalClose: string;
	basketOpen: string;
	basketChange: string;
	orderOpen: string;
	basketSelect: string;
	formErrorsOrderChange: string;
	orderChange: RegExp;
	orderReady: string;
	orderSubmit: string;
	contactFormChange: RegExp;
	contactReady: string;
	formErrorsContactChange: string;
	contactSubmit: string;
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
	formErrorsOrderChange: 'formErrorsOrder:change',
	orderChange: /^order\..*:change$/,
	orderReady: 'order:ready',
	orderSubmit: 'order:submit',
	contactFormChange: /^contacts\..*:change$/,
	contactReady: 'contacts:ready',
	formErrorsContactChange: 'formErrorsContact:change',
	contactSubmit: 'contacts:submit',
};

events.on(allEvents.cardsChange, (cards: ICard[]) => {
	page.catalog = cards.map((card: ICard) => {
		const cardCatalogElement = new Card(
			'card',
			cloneTemplate(cardCatalogTemplate),
			{
				onClick: () => {
					events.emit(allEvents.cardSelect, card);
				},
			}
		);

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
		},
	});

	if (cardData.price === null) card.buttonDisabled();

	card.button = appData.сheckProductToBasket(cardData)
		? 'Удалить из корзины'
		: 'В корзину';

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
			},
		});

		return product.render({
			...card,
			id: index + 1,
		});
	});
});

events.on(allEvents.formErrorsOrderChange, (errors: Partial<IOrderForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	allEvents.formErrorsContactChange,
	(errors: Partial<IContactForm>) => {
		const { email, phone } = errors;
		contactForm.valid = !email && !phone;
		contactForm.errors = Object.values({ email, phone })
			.filter((i) => !!i)
			.join('; ');
	}
);

events.on(
	allEvents.orderChange,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on(
	allEvents.contactFormChange,
	(data: { field: keyof IContactForm; value: string }) => {
		appData.setContactField(data.field, data.value);
	}
);

events.on(allEvents.orderOpen, () => {
	popup.render({
		content: order.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on(allEvents.orderSubmit, () => {
	popup.render({
		content: contactForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on(allEvents.contactSubmit, () => {
	webLarekAPI
		.createOrder({
			payment: appData.order.payment,
			email: appData.contactForm.email,
			phone: appData.contactForm.phone,
			address: appData.order.address,
			total: appData.basket.totalPrice,
			items: appData.basket.shopList.map((card: ICard) => {
				return card.id;
			}),
		})
		.then((res) => {
			popup.render({
				content: success.render({
					totalPrice: res.total,
				}),
			});

			appData.clearAppData();
		})
		.catch((err) => console.log(`Error: ${err}`));
});

webLarekAPI.getCardsList().then((res) => appData.setCards(res));
