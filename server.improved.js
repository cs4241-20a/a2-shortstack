/* Copyright Zach Hilman - All Rights Reserved
 * -------------------------------------------
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and Confidential.
 *
 *
 *
 * Written By Zach Hilman <zachhilman@gmail.com>, September 2020
 */

const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    dir = 'public/',
    port = 3000;

const server = http.createServer(function (request, response) {
    if (request.method === 'GET') {
        handleGet(request, response);
    } else if (request.method === 'POST') {
        handlePost(request, response);
    }
});

let data = [];
let id = 0;

const handleGet = function (request, response) {
    const filename = dir + request.url.slice(1);

    if (request.url === '/') {
        sendFile(response, 'public/index.html');
    } else if (request.url === '/messages') {
        response.writeHeader(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(data));
    } else {
        sendFile(response, filename);
    }
};

const handlePost = function (request, response) {
    if (request.url === '/create') {
        let d = [];
        request.on('data', c => d.push(c));

        request.on('end', () => {
                let object = JSON.parse(d);

                data[id] = {
                    id: id,
                    data: object.data,
                    secrecy: object.secrecy,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * (4 - +object.secrecy)),
                };

                ++id;
            }
        );
        response.end();
    } else if (request.url === '/edit') {
        let d = [];
        request.on('data', c => d.push(c));
        request.on('end', () => {
            let object = JSON.parse(d);
            data[object.index].data = object.data;
        });
        response.end();
    } else if (request.url === '/remove') {
        let d = []
        request.on('data', c => d.push(c));
        request.on('end', () => {
            let object = JSON.parse(d);
            data[object.index] = null;
        });
        response.end();
    } else {
        response.writeHeader(404);
        response.end('Not Found');
    }
}

const sendFile = function (response, filename) {
    const type = mime.getType(filename);

    fs.readFile(filename, function (err, content) {
        if (err === null) {
            response.writeHeader(200, {'Content-Type': type});
            response.end(content);
        } else {
            response.writeHeader(404);
            response.end('404 Error: File Not Found');
        }
    });
};

server.listen(process.env.PORT || port);
