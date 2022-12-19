export default class SortableTable {
  constructor(headerConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.sorted = sorted;
    this.sortOrder = sorted.order;
    this.sortId = sorted.id;
    this.headerConfig = headerConfig;
    this.data = data;
    this.configureColumns();
    if (this.sorted) {
      this.sortData();
    }
    this.render();
  }


  sortAndRender() {
    this.sortData();
    this.subElements.body.innerHTML = this.buildTableTemplate();
  }

  sortData() {
    if (!this.sortOrder) {
      return;
    }
    this.data = this.sortRows(this.data, this.sortOrder, this.sortId);
  }

  sortRows(arr, sortOrder, value) {
    const options = {caseFirst: 'upper', numeric: true};
    const collator = new Intl.Collator(['ru', 'en'], options);
    const modifier = sortOrder === 'asc' ? 1 : -1;
    const sortCallback = (a, b) => collator.compare(a[value], b[value]) * modifier;

    return [...arr].sort(sortCallback);
  }

  sortEventHandler = (event) => {
    const target = event.target.closest('[data-sortable]');
    if (target?.dataset.sortable === 'true') {
      const {id, order} = target.dataset;
      this.sortId = id;
      this.subElements.arrow.remove();
      if (!order || order === 'desc') {
        target.dataset.order = 'asc';
        this.sortOrder = 'asc';
      } else {
        target.dataset.order = 'desc';
        this.sortOrder = 'desc';
      }
      this.sortAndRender();
      this.setArrowIcon();
    }
  };

  setArrowIcon() {
    const target = this.element.querySelector(`[data-id=${this.sortId}]`);
    target.append(this.subElements.arrow);
  }


  configureColumns() {
    this.columns = this.headerConfig.map(item => ({
      id: item.id,
      template: item.template,
      sortable: item.sortable
    }));
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
    // TODO: add proper arrow render
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

    this.subElements.header.addEventListener('pointerdown', this.sortEventHandler);


  }

  remove() {
    this.subElements.header.removeEventListener('pointerdown', this.sortEventHandler);
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
