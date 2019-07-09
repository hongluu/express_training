const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const apiRoutes = require('../routes/api.router');
const webRoutes = require('../routes/web.router');
const { config, swagger_config} = require('./config');
// const passport = require('./passport')
var createError = require('http-errors');

const app = express();

if (config.env === 'development') {
    app.use(logger('dev'));
}

const dirName = __dirname + '../../../'
// view engine setup
app.set('views', path.join(dirName, '/views'));
app.set('view engine', 'pug');

// config static file
app.use(express.static(path.join(dirName, 'public')));
app.use('/lib', express.static(path.join(dirName, '/node_modules/@coreui/coreui/dist/')));
app.use('/lib', express.static(path.join(dirName, '/node_modules/jquery/dist/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// app.use(passport.initialize());

//swagger
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(swagger_config);

// router
app.use('/api/', apiRoutes);
app.use('/web/', webRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;