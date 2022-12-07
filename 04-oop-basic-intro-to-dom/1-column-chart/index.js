export default class ColumnChart {
  constructor({data = [], label = '', value, link, formatHeading = (val) => val} = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.chartHeight = 50;
    this.render();
  }

  isDataLoading() {
    return this.data.length === 0;
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  getColumnsChartBars() {
    if (this.data.length > 0) {
      const calculatedData = this.getColumnProps(this.data);
      return Object.entries(calculatedData).map(([_, {percent, value}]) => (
        `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
      )).join('');
    }
  }

  renderCharts() {
    const formattedHeading = this.formatHeading ? this.formatHeading(this.value) : this.value;

    if (this.isDataLoading()) {
      return ('<img src="./charts-skeleton.svg" alt="My Happy SVG"/>');
    }

    return (`
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${formattedHeading}</div>
          <div data-element="body" class="column-chart__chart">
             ${this.getColumnsChartBars()}
          </div>
        </div>
      `);
  }

  buildTemplate() {
    const formattedHeading = this.formatHeading ? this.formatHeading(this.value) : this.value;
    return (`
      <div class="column-chart ${this.isDataLoading() && 'column-chart_loading'}" style="--chart-height: 50">
        <div class="column-chart__title column-chart__${this.label}">
          Total ${this.label}
          <a href="/${this.label}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${formattedHeading}</div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnsChartBars()}
          </div>
        </div>
      </div>`
    );
  }

  update(newData) {
    this.data = newData;
    const currentChart = this.element.querySelector('.column-chart__container');
    const updatedChart = document.createElement('div');
    updatedChart.innerHTML = this.renderCharts();
    currentChart.parentNode.replaceChild(updatedChart.firstElementChild, currentChart);
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.buildTemplate();

    this.element = wrapper.firstElementChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
