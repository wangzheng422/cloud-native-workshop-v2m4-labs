//  OpenShift sample Node application
var express = require('express'),
    http = require('http'),
    request = require('request'),
    fs = require('fs'),
    app = express(),
    path = require("path"),
    keycloakConfig = require('./app/keycloak.config.js'),
    coolstoreConfig = require('./app/coolstore.config.js'),
    Keycloak = require('keycloak-connect'),
    cors = require('cors');


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    secport = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8443;

// Enable CORS support
app.use(cors());

// error handling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

// keycloak config server
app.get('/keycloak.json', function (req, res, next) {
    res.json(keycloakConfig);
});
// coolstore config server
app.get('/coolstore.json', function (req, res, next) {
    res.json(coolstoreConfig);
});

app.use(express.static(path.join(__dirname, '/views')));
app.use('/app', express.static(path.join(__dirname, '/app')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

app.use('/jquery-dist-3.4.1', express.static(path.join(__dirname, '/jquery-dist-3.4.1')));
app.use('/bower-angular-1.5.10', express.static(path.join(__dirname, '/bower-angular-1.5.10')));
app.use('/bower-angular-route-1.5.10', express.static(path.join(__dirname, '/bower-angular-route-1.5.10')));
app.use('/bower-angular-sanitize-1.5.10', express.static(path.join(__dirname, '/bower-angular-sanitize-1.5.10')));
app.use('/imagesloaded-4.1.1', express.static(path.join(__dirname, '/imagesloaded-4.1.1')));
app.use('/keycloak-js-bower-1.9.8', express.static(path.join(__dirname, '/keycloak-js-bower-1.9.8')));

console.log("coolstore config: " + JSON.stringify(coolstoreConfig));
console.log("keycloak config: " + JSON.stringify(keycloakConfig));


http.createServer(app).listen(port);

console.log('HTTP Server running on http://%s:%s', ip, port);

module.exports = app;