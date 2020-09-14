const views = require('koa-views');
const path = require('path');

module.exports = views('./views', {
    map: { html: 'swig' }
});
