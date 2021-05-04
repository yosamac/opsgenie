export default () => ({
  api: {
    host: process.env.API_HOST || '0.0.0.0',
    port: parseInt(process.env.API_PORT, 10) || 3000,
    context: process.env.ENDPOINT_ROUTE 
  },
  logger: {
    level: process.env.LOG_LEVEL || process.env.LOGGING_LEVEL || 'INFO'
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/opsgenie_pager'
  },
  mesh: {
    ep: {
      host: process.env.EP_MESH_HOST || '0.0.0.0',
      port: parseInt(process.env.EP_MESH_PORT, 10) || 4001
    },
  },
  times: {
    ack_timeout: process.env.TIMES_ACK_TIMEOUT || 15 // 15 minutes
  }
});