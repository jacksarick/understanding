var mongoose = require('mongoose');

module.exports = mongoose.model('Catalogue', {
    text: {
        type: String,
        default: ''
    }
});