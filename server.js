var koa = require('koa');
var router = require('koa-router')();
var fs = require('co-fs');
var app = koa();
var serveStatic = require('koa-static');

app.use(serveStatic(__dirname + '/dist'));

router.get('*', function *(next) {
  this.type = 'text/html';
  this.body = yield fs.readFile('./dist/index.html');
});
app.use(router.routes());
app.listen(3000);
console.log('Server listening at 3000');
