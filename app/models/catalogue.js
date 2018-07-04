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

	tags: {
        type: String,
        default: ''
    },

	img_content: {
        type: String,
        default: ''
    },

	analysis: {
        type: String,
        default: ''
    }
});