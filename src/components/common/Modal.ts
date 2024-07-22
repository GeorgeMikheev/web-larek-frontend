import { IPopaps } from "../../types/interfaces";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

class Popaps extends Component<IPopaps> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    close() {
        this.container.classList.remove('modal_active');
        this._content = null;
        this.events.emit('modal:close');
    }

    render(data: IPopaps): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
