// Интерфейс модального окна успешного завершения покупки:
export interface ISuccess {
	totalPrice: number;
}

export interface ISuccessActions {
	onClick: (event: MouseEvent) => void;
}
