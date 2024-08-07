import { Form } from '../common/Form';
import { IContactForm } from '../../types/order/IContactForm';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class ContactForm extends Form<IContactForm> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._email = ensureElement<HTMLInputElement>(
			'.form__input[name=email]',
			container
		);
		this._phone = ensureElement<HTMLInputElement>(
			'.form__input[name=phone]',
			container
		);
	}

	set email(value: string) {
		this._email.value = value;
		this.onInputChange('email', value);
	}

	set phone(value: string) {
		this._phone.value = value;
		this.onInputChange('phone', value);
	}
}
