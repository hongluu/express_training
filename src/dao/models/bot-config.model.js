var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
const BaseSchema = require('./base.model')

var BotConfigSchema = BaseSchema.extend({
    

});

var BotConfig = mongoose.model("BotConfig", BotConfigSchema);
module.exports = BotConfig;
