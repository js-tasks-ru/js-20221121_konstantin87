export default class ColumnChart {
  constructor({data = [], label = '', value, link, formatHeading = (val) => val} = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.isDataLoading = data.length === 0;
    this.chartHeight = 50;
    this.render();
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

  getColumnsHtml() {
    if (this.data.length > 0) {
      const calculatedData = this.getColumnProps(this.data);
      return Object.entries(calculatedData).map(([_, {percent, value}]) => (
        `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
      )).join('');
    }
  }

  renderCharts() {
    const formattedHeading = this.formatHeading ? this.formatHeading(this.value) : this.value;

    return (`
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${formattedHeading}</div>
          <div data-element="body" class="column-chart__chart">
            ${this.isDataLoading ? '<img src="./charts-skeleton.svg" alt="My Happy SVG"/>' : this.getColumnsHtml()}
          </div>
        </div>
      `);
  }

  buildTemplate() {
    return `
    <div class="dashboard__chart_${this.label} ${this.isDataLoading && 'column-chart_loading'}">
    <div class="column-chart " style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label}
        <a href="/${this.label}" class="column-chart__link">View all</a>
      </div>
     ${this.renderCharts()}
      </div>
    </div>
    `;
  }

  update(newData) {
    this.data = newData;
    this.isDataLoading = newData.length === 0;
    // this.render();
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

  destroy() {
    this.element.remove();
  }

  remove() {
    this.element.remove();
  }
}
