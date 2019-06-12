const fetchData = async (asset) => {
  try {
    const res = await fetch(`/api/v1/${asset}`);
    if (res.status !== 200) {
      console.log(res);
    }
    const res_1 = await res.json();
    const p = res_1[0].cpu_used;
    return p;
  }
  catch (error) {
    return console.log(error);
  }
}

const makeChart = async (container, asset, title) => {
  try {
    return Highcharts.chart(container, {

      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        backgroundColor: '#000000'
      },

      title: {
        text: title
      },

      pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#FFF'],
              [1, '#333']
            ]
          },
          borderWidth: 0,
          outerRadius: '109%'
        }, {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#333'],
              [1, '#FFF']
            ]
          },
          borderWidth: 1,
          outerRadius: '107%'
        }, {
          // default background
        }, {
          backgroundColor: '#DDD',
          borderWidth: 0,
          outerRadius: '105%',
          innerRadius: '103%'
        }]
      },

      // the value axis
      yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: '%'
        },
        plotBands: [{
          from: 0,
          to: 60,
          color: '#55BF3B' // green
        }, {
          from: 60,
          to: 80,
          color: '#DDDF0D' // yellow
        }, {
          from: 80,
          to: 100,
          color: '#DF5353' // red
        }]
      },

      series: [{
        name: 'cpu_used ',
        data: [0],
        tooltip: {
          valueSuffix: ' %'
        }
      }]

    },
      // Add some life
      function (chart) {
        if (!chart.renderer.forExport) {
          setInterval(async function () {
            var point = chart.series[0].points[0]
            p = await fetchData(asset);
            console.log(point['y']);
            point['y'] = p;
            point.update();

          }, 3000);
        }
      });
  }
  catch (error) {
    return console.log(error);
  }
};

makeChart('container1', 'server1', 'Server CPU usage'); 
makeChart('container2', 'pc1', 'PC CPU usage');
