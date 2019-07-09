const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .default('development'),
    SERVER_PORT: Joi.number()
        .default(4040),
    MONGOOSE_DEBUG: Joi.boolean()
        .when('NODE_ENV', {
            is: Joi.string().equal('development'),
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false)
        }),
    JWT_SECRET: Joi.string().default('asdsd')
        .description('JWT Secret required to sign'),
    MONGO_HOST: Joi.string().required()
        .description('Mongo DB host url'),
    MONGO_PORT: Joi.number()
        .default(27017)
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const swagger_config = {
    swaggerDefinition: {
        info: {
            description: 'This is a sample server',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: envVars.SERVER_HOST + ':' + envVars.SERVER_PORT,
        basePath: '/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['./routes/*.js'] //Path to the API handle folder
};

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    frontend: envVars.MEAN_FRONTEND || 'angular',
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT
    },
};


module.exports = { config, swagger_config};