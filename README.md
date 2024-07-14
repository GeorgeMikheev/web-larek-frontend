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

Класс **СardList** - отображает карточки на странице.

### Класс имеет такие поля и методы:

#### Методы:
createCard(): void - обрабатывает данные карточек и выводит их на страницу.

___

Класс **Card** - хранит данные карточек.

### Класс имеет такие поля и методы:

#### Поля:
- category: string - Катагория товара.
- title: string - Заголовок карточки.
- image: string - Изображение товара.
- price: number - Цена товара.

#### Методы:
- AddToBasket(): void - добавляет товар в корзину.

___

Класс **Popaps** - является прототипом всех модальных окон.

### Класс имеет такие поля и методы:

#### Поля:
- clouseButton: HTMLElement | null - кнопка закрытия модального окна.
- title?: string - заголовок модального окна.
- nextButton: HTMLElement | null; - кнопка подтверждения данных.

#### Методы:
- openPopap(): void - открывает модальное окно.
- clousePopap(): void - закрывает модально окно.
- sendingData?(): void - отправляет данные на сервер, если это необходимо.

___

Класс **CardPopap** - класс модального окна товара. Наследует класс **Popaps**.

### Класс имеет такие поля и методы:

#### Поля:
- category: string - категория товара.
- image: string - название товара.
- description: string - описание товара.
- price: number - цена товара.

___

Класс **Basket** - класс корзины. Наследует класс **Popaps**.

### Класс имеет такие поля и методы:

#### Поля: 
- shopList? - список товаров добавленных в корзину. Имеет своеи поля:
    - listItemNumber: number - номер списка.
    - title: string - название товара.
    - price: number - цена товара.
    - deleteButton: HTMLElement | null; - кнопка удаления товара из списка.
- totalPrice: number - итоговая цена за все товары.
  
#### Методы:
- countTotalPrice(): number - считает итоговую цену за все товары.
- deletePurchase(purchase: string): void - Удаляет покупку из корзины.

___

Класс **Payment** - класс оплаты товара. Наследует **Popaps**.

### Класс имеет такие поля и методы:

#### Поля: 
- paymentTitle: string - заголовок "способ облаты".
- onlinePaymentRadio: HTMLElement | null - радиокнопка "Онлайн".
- offlinePaymentRadio: HTMLElement | null - радиокнопка "При получении".
- addressTitle: string - заголовок "Адресс доставки"
- addressInput: HTMLElement | null - поле ввода адресса.

___

Класс **UserDataForm** - класс данный пользователя. Наследует **Popaps**.

### Класс имеет такие поля и методы:

#### Поля:
- emailTitle: string - заголовок "Email".
- emailInput: HTMLElement | null - поле ввода электронной почты.
- phoneTitle: string - заголовок "Телефон".
- phoneInput: HTMLElement | null - поле ввода номера телефона.

___

Класс **IFinalPopap** - класс модального окна "Заказ оформлен"
 
### Класс имеет такие поля и методы:

#### Поля:
- image: string - картинка подтверждающая, что заказ прошел успешно.
- totalPrice: number - итоговая сумма оплаты.
