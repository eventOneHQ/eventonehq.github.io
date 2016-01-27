var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + "/www")).listen(80);
console.log("Server listening on port: 80")