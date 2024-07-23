import { allEvents } from "../..";
import { IPopup } from "../../types/interfaces";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

interface IModalData {
    content: HTMLElement;
}

export class Popup extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButton.addEventListener('click', this.closePopup.bind(this));
        this.container.addEventListener('click', this.closePopup.bind(this));
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    openPopup() {
        this.container.classList.add('modal_active');
        this.events.emit(allEvents.modalOpen);
    }

    closePopup() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit(allEvents.modalClose);
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.openPopup();
        return this.container;
    }
}
