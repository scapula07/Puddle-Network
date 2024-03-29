const NodeMediaServer = require('node-media-server');
const PORT =process.Env || 8000


const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: PORT ,
    allow_origin: '*'
  },
};

var nms = new NodeMediaServer(config)
nms.run();