module.exports = function (err, req, res, next) {
    console.error(err);
    res.status(400).send('Bad Request')
}