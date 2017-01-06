var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
	name: String,
	description: String
}, { versionKey: false });

module.exports = mongoose.model('Product', ProductSchema);