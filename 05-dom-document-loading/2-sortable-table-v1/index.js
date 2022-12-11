export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.defineColumns();
    this.render();
  }

  defineColumns() {
    this.columns = this.headerConfig.map(item => ({id: item.id, template: item.template}));
  }

  buildHeaderRowTemplate() {
    return (`
       <div data-element="header" class="sortable-table__header sortable-table__row">
           ${this.headerConfig.map(({id, title, sortable}) => (`
              <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="asc">
                <span>${title}</span>
              </div>
            `)).join('')
    }
       </div>
          `);
  }

  buildRowTemplate(data) {
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

  buildTemplate() {
    return (`
      <div data-element="productsContainer" class="products-list__container">
        ${this.buildHeaderRowTemplate()}
        <div data-element="body" class="sortable-table__body">
          ${this.data.map((rowData) => this.buildRowTemplate(rowData)).join('')}
        </div>
      </div>
    `);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.buildTemplate();

    this.element = wrapper.firstElementChild;
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

