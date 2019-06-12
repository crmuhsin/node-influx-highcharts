#!/usr/bin/env python

import psutil
from influxdb import InfluxDBClient


client = InfluxDBClient(host='192.168.0.155', port=8086)

# client.create_database('lumonitor')
client.switch_database('lumonitor')

# cpu_core = str(psutil.cpu_count())
cpu_used = str(psutil.cpu_percent(interval=1))
# total_ram = str(psutil.virtual_memory().total/(1024**2))
used_ram = str(psutil.virtual_memory().used/(1024**2))
free_ram = str(psutil.virtual_memory().free/(1024**2))

json_body = [
    {
        "measurement": "cpu_usage",
       	"tags": {
            "assetId":"pc1"
	    },
	    "fields": {
            # "cpu_core": cpu_core,
            "cpu_used": cpu_used,
            # "total_ram": total_ram,
            "used_ram": used_ram,
            "free_ram": free_ram,
        }
    }
]

client.write_points(json_body)
