var Catalogue = require('./models/catalogue');

function getCatalogue(res) {
    Catalogue.find(function (err, memes) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(memes); // return all memes in JSON format
    });
};

module.exports = function (app) {

    // api
    // get all memes
    app.get('/api/memes', function (req, res) {
        // use mongoose to get all memes in the database
        getCatalogue(res);
    });

    // create meme and send back all memes after creation
    app.post('/api/memes', function (req, res) {

        // create a meme, information comes from AJAX request from Angular
        Catalogue.create({
            origin: req.body.origin,
            date: req.body.date,
            format: req.body.format,
            img_content: req.body.img_content,
            gene: req.body.gene,
            done: false
        }, function (err, meme) {
            if (err)
                res.send(err);

            // get and return all the memes after you create another
            getCatalogue(res);
        });

    });

    // delete a meme
    app.delete('/api/memes/:meme_id', function (req, res) {
        Catalogue.remove({
            _id: req.params.meme_id
        }, function (err, meme) {
            if (err)
                res.send(err);

            getCatalogue(res);
        });
    });

    // application
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
