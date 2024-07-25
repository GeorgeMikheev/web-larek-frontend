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

