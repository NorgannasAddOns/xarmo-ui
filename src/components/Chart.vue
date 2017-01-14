<template>
  <canvas class="chartjs" :id="chartId" :width="width" :height="height"></canvas>
</template>

<script>
import Chart from 'chart.js'; // With moment.js
import merge from 'lodash/fp/merge';

function mergeOptions(obj, src) {
  return merge(obj, src);
}

const types = ['line', 'bar', 'radar', 'polarArea', 'pie', 'doughnut', 'bubble'];

export default {
  props: {
    chartId: {
      default: 'chart',
      type: String,
    },
    width: {
      default: 400,
      type: Number,
    },
    height: {
      default: 400,
      type: Number,
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return types.indexOf(value) > -1;
      },
    },
    data: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chart != null) {
        this.chart.destroy();
      }
      if (types.indexOf(this.type) === -1) {
        return;
      }
      let chartOptions = this.options;
      if (this.type in this.defaultOptions) {
        chartOptions = mergeOptions(this.defaultOptions[this.type], this.options);
      }
      this.chart = new Chart(this.$el, {
        type: this.type,
        data: this.data,
        options: chartOptions,
      });
    },
  },
  data() {
    return {
      chart: null,
      defaultOptions: {
        line: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
        bar: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
            xAxes: [{
              categoryPercentage: 0.5,
              barPercentage: 0.2,
            }],
          },
        },
        radar: {
        },
        polarArea: {
        },
        pie: {
        },
        doughnut: {
        },
        bubble: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
            xAxes: [{
              categoryPercentage: 0.5,
              barPercentage: 0.2,
            }],
          },
        },
      },
    };
  },
  watch: {
    data(newData, oldData) {
      this.$nextTick(() => {
        const newDataLabels = newData.datasets.map(dataset => dataset.label);
        const oldDataLabels = oldData.datasets.map(dataset => dataset.label);
        if (JSON.stringify(newDataLabels) === JSON.stringify(oldDataLabels)) {
          // this.chart.data.datasets = newData.datasets;
          const datasets = this.chart.data.datasets;
          for (const [i, dataset] of newData.datasets.entries()) {
            datasets[i].data = dataset.data;
          }
          this.chart.data.labels = newData.labels;
          this.chart.update();
        } else {
          this.renderChart();
        }
      });
    },
  },
};
</script>

<style>
canvas.chartjs {
  max-width: 100%;
}
</style>
