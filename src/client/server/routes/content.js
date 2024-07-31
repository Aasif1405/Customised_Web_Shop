import express from 'express';

export const contentRouter = express.Router();

contentRouter.get('/', (request, response, next) => {
    const{url, method} = request;
    console.log(method, url);
    const headers = {'Content-type' : 'text/plain'};
    response.writeHead(200, headers);
    response.end('home page');
    

});

contentRouter.get('/about', (request, response, next) => {
    const{url, method} = request;
    console.log(method, url);
    const headers = {'Content-type' : 'text/plain'};
    response.writeHead(200, headers);
    response.end('About Me');
    

});

contentRouter.get('/contact', (request, response, next) => {
    const{url, method} = request;
    console.log(method, url);
    const headers = {'Content-type' : 'text/plain'};
    response.writeHead(200, headers);
    response.end('Contact Page');


});
