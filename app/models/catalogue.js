var mongoose = require('mongoose');

module.exports = mongoose.model('Catalogue', {
    origin: {
        type: String,
        default: ''
    },

	date: {
        type: String,
        default: ''
    },

	format: {
        type: String,
        default: ''
    },

	img_content: {
        type: String,
        default: ''
    },

	gene: {
        type: String,
        default: ''
    }
});