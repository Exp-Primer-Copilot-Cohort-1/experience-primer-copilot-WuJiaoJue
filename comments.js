// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                console.log(err);
                response.end('Internal Server Error');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (pathname === '/submit') {
        var comment = urlObj.query;
        comments.push(comment);
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(JSON.stringify(comments));
    } else if (pathname === '/getComments') {
        var commentStr = JSON.stringify(comments);
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(commentStr);
    } else {
        var ext = path.extname(pathname);