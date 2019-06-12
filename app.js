const Influx = require('influx');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', 3000);

const influx = new Influx.InfluxDB({
  host: '192.168.0.155',
  database: 'lumonitor'
});

app.get('/api/v1/:asset', (request, response) => {
  const { asset } = request.params;
  influx.query(`
    select cpu_used from cpu_usage where assetId = '${asset}' order by desc limit 1
  `)
  .then(result => {
    response.status(200).json(result)
  })
  .catch(error => {
    response.status(500);
    console.log(error);
  });
});

app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}.`);
});