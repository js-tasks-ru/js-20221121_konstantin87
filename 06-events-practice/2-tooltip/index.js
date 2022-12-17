class Tooltip {
  static #onlyInstance = null;

  constructor() {
    if (!Tooltip.#onlyInstance) {
      Tooltip.#onlyInstance = this;
    } else {
      return Tooltip.#onlyInstance;
    }
  }

  trackPointerMove = (event) => {
    this.element.style.left = event.clientX + 20 + 'px';
    this.element.style.top = event.clientY + 20 + 'px';
  };

  trackPointerOver = (event) => {
    if (event.target.closest("[data-tooltip]")) {
      this.element.textContent = event.target.closest("[data-tooltip]").dataset.tooltip;
      document.body.append(this.element);
      if (!this.isPointermoveSet) {
        document.body.addEventListener('pointermove', this.trackPointerMove);
        this.isPointermoveSet = true;
      }
    }
  };

  trackPointerOut = (event) => {
    if (!event.relatedTarget?.dataset.tooltip) {
      this.element.remove();
      document.body.removeEventListener('pointermove', this.trackPointerMove);
      this.isPointermoveSet = false;
    }
  };

  initialize = () => {
    this.render();
    document.body.addEventListener("pointerover", this.trackPointerOver);
    document.body.addEventListener("pointerout", this.trackPointerOut);
  };

  render = () => {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = `<div class="tooltip" />`;

    this.element = wrapper.firstElementChild;
  };

  removeGlobalEventListeners = () => {
    document.body.removeEventListener("pointerover", this.trackPointerOver);
    document.body.addEventListener("pointerout", this.removeGlobalEventListeners);
  };

  destroy = () => {
    if (this.element) {
      this.element.remove();
    }
    this.removeGlobalEventListeners();
    Tooltip.#onlyInstance = null;
  };
}

export default Tooltip;
