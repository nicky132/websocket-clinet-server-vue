const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('open', function open() {
    console.log('connected');
});
server.on('close', function close() {
    console.log('disconnected');
});

server.on('connection', function connection(ws, req) {
    console.log('%s is connected', '链接成功');

    // 发送欢迎信息给客户端
    ws.send('Welcome ' + 'nicky ' + new Date().toDateString());

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // 广播消息给所有客户端
        server.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send('广播给所有的客户端' + ' -> ' + message);
            }
        });
    });
});
