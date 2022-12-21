class Tooltip {
  static #singleton = null;

  constructor() {
    if (!Tooltip.#singleton) {
      Tooltip.#singleton = this;
    } else {
      return Tooltip.#singleton;
    }
  }

  trackPointerMove = (event) => {
    this.element.style.left = event.clientX + 20 + 'px';
    this.element.style.top = event.clientY + 20 + 'px';
  };

  trackPointerOver = (event) => {
    if (event.target.closest("[data-tooltip]")) {
      this.element.textContent = event.target.closest("[data-tooltip]").dataset.tooltip;
      this.render();
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
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="tooltip" />`;
    this.element = wrapper.firstElementChild;

    document.body.addEventListener("pointerover", this.trackPointerOver);
    document.body.addEventListener("pointerout", this.trackPointerOut);
  };

  render = () => {
    document.body.append(this.element);
  };

  removeGlobalEventListeners = () => {
    document.body.removeEventListener("pointerover", this.trackPointerOver);
    document.body.removeEventListener("pointerout", this.removeGlobalEventListeners);
  };

  destroy = () => {
    if (this.element) {
      this.element.remove();
    }
    this.removeGlobalEventListeners();
    Tooltip.#singleton = null;
  };
}

export default Tooltip;
