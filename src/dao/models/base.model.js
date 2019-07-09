var mongoose = require('mongoose'),
var Schema = mongoose.Schema;
var BaseSchema = new Schema({
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at', }});

module.exports = BaseSchema;