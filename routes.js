module.exports = function (stockRepository) {

    return {
        stockUp: function (req, res, next) {
            var isbn = req.body.isbn;
            var count = req.body.count;

            stockRepository.
            stockUp(isbn, count).
            catch(next);

            res.json({isbn: isbn, count: count});
        },
        findAll: function (req, res, next) {
            stockRepository.findAll().
            then(function (docs) {
                console.log("Retrieving all books - thor marius")

                res.json(docs);
            }).
            catch(next);
        },
        getCount: function (req, res) {
            stockRepository.getCount(req.params.isbn).then(function (result) {
                if (result !== null) {
                    console.log("Retrieving count " + result + " - thor marius");
                    res.format({
                        "text/html": function () {
                            res.status(200).send("<div style='color: red; font-weight: 'bold'>" + result + "</div>");
                        },
                        "application/json": function () {
                            res.status(200).json({count: result});
                        },
                        "default": function () {
                            res.status(406).send("Not acceptable")
                        }
                    });
                } else {
                    console.log("Book with isbn: " + req.params.isbn);
                    res.format({
                        "text/html": function () {
                            res.staus(200).send("<div style='color: red; font-weight: 'bold'> No book with ISBN: " + req.params.isbn + "</div>");
                        },
                        "application/json": function () {
                            res.status(404).json({error: 'No book with ISBN: ' + req.params.isbn});
                        },
                        "default": function () {
                            res.status(406).send("Not acceptable")
                        }
                    });


                }
            });
        }
    };
};