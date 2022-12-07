export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = (input) => input
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.render();
  }

  buildChartsTemplate() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map(item => {
      const value = String(Math.floor(item * scale));
      const percent = (item / maxValue * 100).toFixed(0);
      return (`<div style="--value: ${value}" data-tooltip="${percent}%"></div>`);
    }).join('');

  }

  buildMainTemplate() {
    const formattedHeading = this.formatHeading ? this.formatHeading(this.value) : this.value;

    return (`
      <div class="column-chart column-chart_loading" style="--chart-height: 50">
        <div class="column-chart__title">
          Total ${this.label}
          <a href="/${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${formattedHeading}</div>
          <div data-element="body" class="column-chart__chart">
            ${this.buildChartsTemplate()}
          </div>
        </div>
      </div>
    `);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.buildMainTemplate();

    this.element = wrapper.firstElementChild;

    this.toggleLoadingStatus();
  }

  update(newData) {
    this.data = newData;
    this.toggleLoadingStatus();
    const currentChart = this.element.querySelector('.column-chart__chart');
    currentChart.innerHTML = this.buildChartsTemplate();
  }

  toggleLoadingStatus() {
    if (!this.element) {
      return;
    }
    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    } else {
      this.element.classList.add('column-chart_loading');
    }
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
  }
}
