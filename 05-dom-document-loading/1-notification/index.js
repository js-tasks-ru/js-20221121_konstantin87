export default class NotificationMessage {
  static activeInstance;

  constructor(
    message = '',
    {
      duration = 1000,
      type = 'success',
    } = {}) {

    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render();
  }

  renderTemplate() {
    return (`
        <div class="notification ${this.type}" style="--value:${this.duration}ms">
          <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
              ${this.message}
            </div>
          </div>
        </div>
    `);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.renderTemplate();

    this.element = wrapper.firstElementChild;
  }

  show(target = document.body) {
    if (NotificationMessage.activeInstance) {
      NotificationMessage.activeInstance.remove();
    }

    target.append(this.element);

    this.timerId = setTimeout(() => this.remove(), this.duration);

    NotificationMessage.activeInstance = this;
  }

  remove() {
    clearTimeout(this.timerId);

    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
