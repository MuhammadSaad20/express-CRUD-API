const moment = require('moment') //npm i moment


const looger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
}

module.exports=looger;