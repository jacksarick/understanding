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

	content: {
        type: String,
        default: ''
    },

	genealogy: {
        type: String,
        default: ''
    }
});