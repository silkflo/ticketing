//refresh the website every 300ms , to help next to refresh
//kill client pod , skaffold will regenerate a pod with this script in consideration
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
