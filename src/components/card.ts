import { Component } from './base/Component';
import { ICard, ICardActions } from '../types/ICard';
import { ensureElement } from '../utils/utils';

export class Card<T> extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;
	protected _category: HTMLElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = container.querySelector(`.${blockName}__image`);
		this._price = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this._category = container.querySelector(`.${blockName}__category`);
		this._button = container.querySelector(`.${blockName}__button`);
		this._description = container.querySelector(`.${blockName}__description`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: string) {
		this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
	}

	get price(): string {
		return this._price.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	get category() {
		return this._category.textContent || '';
	}

	set button(value: string) {
		this._button.textContent = value;
	}

	set description(value: string | string[]) {
		if (Array.isArray(value)) {
			this._description.replaceWith(
				...value.map((str) => {
					const descTemplate = this._description.cloneNode() as HTMLElement;
					this.setText(descTemplate, str);
					return descTemplate;
				})
			);
		} else {
			this.setText(this._description, value);
		}
	}

	buttonDisabled() {
		this.setDisabled(this._button, true);
	}
}
