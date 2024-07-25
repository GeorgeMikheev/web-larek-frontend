# Проектная работа "Веб-ларек"

## Стек: 
- HTML;
- SCSS;
- TS;
- Webpack.

## Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

## Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


## Базовый код:

___

Класс **EventEmitter** - брокер событий.

```
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

### Класс имеет такие методы:
- on - принимает событие и  коллбек функцию. Устанавливает обработчик событий.
- off - принимает событие и коллбек функцию. удаляет обработчик событий.
- emit - принимает событие и данные. Инициирует событие с данными.
- onAll - принимает коллбек функцию. Устанавливает слушатель на все события.
- offAll - сбрасывает все обработчики событий.
- trigger - принимает событие и контекст. Создает коллбек триггер, генерирующий событие при вызове.

___

Класс **Api** - класс по работе с api.

### Класс имеет такие поля и методы:

#### Поля:
- baseUrl: string;
- options: RequestInit.


#### Методы:
- handleResponse: Promise< object > - принимает ответ от сервера и проверяет его на наличие ошибок. Если ошибок нет возвращает его, если есть, то возвращает сообщение об ошибке.
- get - принимает uri. Возвращает ответ от сервера.
- post - принимает uri и данные. Возвращает ответ от сервера.

___

## Мой код:

Класс **WebLarekAPI** - класс получения данных с сервера.

```
interface IWebLarekAPI {
	getCardsList(): Promise<ICard[]>;
	getCard(uuid: string): Promise<ICard>;
	createOrder(card: IPaymentOrder): Promise<object>;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- readonly cdn: string;

#### Методы:
- getCardsList(): Promise<ICard[]> - получение списка товаров с сервера.
- getCard(uuid: string): Promise<ICard> - получение одного конкретного товара с сервера.
- createOrder(order: IPaymentOrder) - отправка данных на сервер.

___

Класс **AppData** - основной класс, который реализует работу всего приложения.

```
interface IAppData extends ICard{
    product: ICard[];
    basket: string[];
    order: IOrderForm | null;
    loading: boolean;
}
```
### Класс имеет такие поля и методы:

#### Поля: 
```
cards: ICard[] = [];

demonstrationCard: ICard;

basket: IBasket = {
	shopList: [],
	totalPrice: 0,
};

order: IOrderForm = {
	payment: '',
	address: '',
};

contactForm: IContactForm = {
	email: '',
	phone: '',
};

formErrors: FormErrors = {};
```

#### Методы:
- setCards(cards: ICard[]) - устанавливает значение карточки товара.
- setPreview(card: ICard) - устанавливает значение в попап карточки.
- addProductToBasket(card: ICard) - добвляет товар в корзину.
- removeProductAtBasket(card: ICard) - удаляет товар из корзины.
- сheckProductToBasket(product: ICard) - проверяет наличие товара в корзине.
- Методы установки данных на формы:
  - setOrderField(field: keyof IOrderForm, value: string)
  - setContactField(field: keyof IContactForm, value: string)
- Методы валидации форм:
  - validateOrder()
  - validateContactForm()
- clearAppData() - очищает данные класса после завершения заказа.

___

Класс **Page** - класс главной страницы:

```
interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _counter: HTMLElement;
- protected _catalog: HTMLElement;
- protected _wrapper: HTMLElement;
- protected _basket: HTMLElement;

___

Класс **Card** - класс товара.

```
interface ICard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _title: HTMLElement;
- protected _image?: HTMLImageElement;
- protected _price: HTMLElement;
- protected _category: HTMLElement;
- protected _description?: HTMLElement;
- protected _button?: HTMLButtonElement;

#### Методы:
buttonDisabled() - приводит кньпку добавления товара в корзину в неактивное состояние.

___

Класс **Basket** - класс корзины.

```
interface IBasket {
    shopList?: ICard[];
    totalPrice: number;
}	

interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _shopList: HTMLElement;
- protected _totalPrice: HTMLElement;
- protected _button: HTMLButtonElement;

___

Класс **BasketItem** - класс товара в корзине.

```
interface IBasketItem {
	id: number;
	title: string;
	price: number;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _id: HTMLElement;
- protected _title: HTMLElement;
- protected _price: HTMLElement;
- protected _button: HTMLButtonElement;

___

Класс **IForm** - класс форм.

```
interface IForm {
    valid: boolean;
    errors: string[];
}
```
### Класс имеет такие поля и методы:

#### Поля: 
- protected _submit: HTMLButtonElement;
- protected _errors: HTMLElement;

___

Класс **Popup** - класс модальных окон.

```
interface IModalData {
    content: HTMLElement;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _closeButton: HTMLButtonElement;
- protected _content: HTMLElement;

#### Методы:
- openPopup() - открывает модальное окно.
- closePopup() - закрывает модальное окно.

___

Класс **Success** - класс окна успешной покупки.

```
interface ISuccess {
    totalPrice: number;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _description: HTMLElement;
- protected _button: HTMLButtonElement;

___

Класс **ContactForm** - класс формы ввода пользовательских данных: телефона и электронной почты.

```
interface IContactForm {
	email: string;
	phone: string;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _email: HTMLInputElement;
- protected _phone: HTMLInputElement;

___

Класс **OrderForm** - класс формы ввода пользовательских данных: способа оплаты и адресса доставки.

```
interface IOrderForm {
    payment: string;
    address: string;
}
```

### Класс имеет такие поля и методы:

#### Поля: 
- protected _paymentCash: HTMLButtonElement;
- protected _paymentCard: HTMLButtonElement;
- protected _address: HTMLInputElement;
