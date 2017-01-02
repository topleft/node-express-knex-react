(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/routes');

    // *** register routes *** //
    app.use('/', routes.index);
    app.use('/', routes.auth);

  };

})(module.exports);
