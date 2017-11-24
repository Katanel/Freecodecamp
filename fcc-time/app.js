// basic required imports for node.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

//create an instance of express, body-parser, cors
const app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', function(req, res) {
    res.send({
        'message': 'This /GET call came in!'
    })
})

//GET call to format UNIX and natural dates
app.get('/dateValue/:dateVal', function(req, res, next) {
    const dateVal = req.params.dateVal;

    const dateFormat = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'


    };

    if (isNaN(dateVal)) {
        var naturalDate = new Date(dateVal);
        naturalDate = naturalDate.toLocaleDateString('en-GB', dateFormat);
        var unixDate = new Date(dateVal).getTime() / 1000;
    } else {
        var unixDate = dateVal;
        var naturalDate = new Date(dateVal * 1000);
        naturalDate = naturalDate.toLocaleDateString("en-GB", dateFormat);
    }

    res.json({
        unix: unixDate,
        natural: naturalDate
    });
    return console.log('i was called')
});

app.listen(9999, function() {
    console.log('I\'Working with ')
});