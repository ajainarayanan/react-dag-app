var koa = require('koa');
var router = require('koa-router')();
var fs = require('co-fs');
var app = koa();
var serveStatic = require('koa-static');

router.get('/', function *(next) {
  this.type = 'text/html';
  this.body = yield fs.readFile('./dist/index.html');
});
app.use(router.routes());
app.use(serveStatic(__dirname + '/dist'));
app.listen(3000);
