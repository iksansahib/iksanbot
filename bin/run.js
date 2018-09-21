'use strict';

const service = require('../server/service');
const http = require('http');
const { token } = require('../global');
const slackClient = require('../server/slackClient');
const logLevel = 'error';

const rtm = slackClient.init(token, logLevel);
rtm.start().then().catch(err=>console.log(err)); 

const server = http.createServer(service);
server.listen(3000);

server.on('listening', () => {
    console.log('Listening');
});