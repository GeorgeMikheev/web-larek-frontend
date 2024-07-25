// Интерфейс карточки товара:
export interface ICard {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
    price: number;
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}
