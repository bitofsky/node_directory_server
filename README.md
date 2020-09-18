# node_directory_server

This is a file server. compresses specific directory into compressed file and provide download.

# env / default
```env
SERV_DIR=Error (Directory path to compress)
SERV_ADDR=0.0.0.0 (File serving address)
SERV_PORT=1080 (File serving port)
SERV_PATH=/download (URL Path to serve file)
SERV_MD5_PATH=/md5 (URL path to md5 value. empty=off)
SERV_INFO_PATH=/info (URL path to info value. empty=off)
SERV_INFO_VALUE=0.0.1 (info value)
```

METRICS_PORT=1080 (PrometheusMetrics Port. empty=off)
METRICS_PATH=/metrics (PrometheusMetrics Path)

NODE_DEBUG=ERROR,WARN (Activate Nodejs debugger)

# Local development environment
```
> npm i
> code .
[press F5 to run debugger] or
> npm run debug
```

# BUILD tsc
> npm run build

# BUILD docker
> docker build .
