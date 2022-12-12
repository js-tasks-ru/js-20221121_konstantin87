export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.configureColumns();
    this.render();
  }

  sort(fieldValue, orderValue) {
    if (!orderValue) {
      return;
    }
    this.data = this.sortRows(this.data, orderValue, fieldValue);
    this.subElements.body.innerHTML = this.buildTableTemplate();
  }

  sortRows(arr, sortOrder, value) {
    const options = {caseFirst: 'upper', numeric: true};
    const collator = new Intl.Collator(['ru', 'en'], options);
    const modifier = sortOrder === 'asc' ? 1 : -1;
    const sortCallback = (a, b) => collator.compare(a[value], b[value]) * modifier;

    return [...arr].sort(sortCallback);
  }

  configureColumns() {
    this.columns = this.headerConfig.map(item => ({id: item.id, template: item.template}));
  }

  defineSubElements() {
    const dataElements = this.element.querySelectorAll('[data-element]');
    const subElements = {};

    for (let subElement of dataElements) {
      const key = subElement.dataset.element;
      subElements[key] = subElement;
    }
    this.subElements = subElements;
  }

  buildHeaderTemplate() {
    return (`
       <div data-element="header" class="sortable-table__header sortable-table__row">
           ${this.headerConfig.map(({id, title, sortable}) => (`
              <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="">
                <span>${title}</span>
              </div>
            `)).join('')
    }
       </div>
          `);
  }

  buildTableRowTemplate(data) {
    return (`
      <a href="/products/${data.id}" class="sortable-table__row">
        ${this.columns.map(item => {
      if (item.template) {
        return item.template(data);
      }
      return (`
                  <div class="sortable-table__cell">${data[item.id]}</div>
              `);
    }).join('')}
      </a>
    `);
  }

  buildTableTemplate() {
    return this.data.map((rowData) => this.buildTableRowTemplate(rowData)).join('');
  }

  buildTemplate() {
    return (`
      <div data-element="productsContainer" class="products-list__container">
        ${this.buildHeaderTemplate()}
        <div data-element="body" class="sortable-table__body">
          ${this.buildTableTemplate()}
        </div>
      </div>
    `);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.buildTemplate();

    this.element = wrapper.firstElementChild;

    this.defineSubElements();

  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}

