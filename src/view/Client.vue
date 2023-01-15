<template>
    <div class="home">
        <h1>WebSocket服务</h1>
        <button @click="send">发送消息</button>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: 'Home',
    data() {
        return {
            ws: null,
            lockReconnect: false, //是否真正建立连接
            reconnectTimer: null, //断开 重连倒计时
            startHeartTimer: null, //60s固定发送心跳定时器
            serverTimeoutObj: null
        };
    },
    created() {
        this.connect();
    },
    methods: {
        // ws连接
        connect() {
            this.ws = new WebSocket('ws:127.0.0.1:8080');
            // 监听连接开启,
            this.ws.addEventListener('open', () => {
                //开启心跳
                this.startHeart();
            });
            this.ws.addEventListener('message', (e) => {
                // 收到服务器信息，心跳重置,上报
                console.log('message', e.data);
                this.startHeart();
            });
            this.ws.addEventListener('error', (e) => {
                //重连
                console.log('error', e);
                this.reconnect();
            });
            this.ws.addEventListener('close', (e) => {
                //重连
                console.log('close', e);
                this.reconnect();
            });
        },
        //重新连接  3000-5000之间，设置延迟避免请求过多
        reconnect() {
            //设置lockReconnect变量避免重复连接
            if (this.lockReconnect) return;
            this.lockReconnect = true;
            this.reconnectTimer && clearTimeout(this.reconnectTimer);
            this.reconnectTimer = setTimeout(() => {
                this.connect();
                this.lockReconnect = false;
            }, parseInt(Math.random() * 2000 + 3000));
        },
        //重置心跳
        reset() {
            clearTimeout(this.serverTimeoutObj);
            clearTimeout(this.startHeartTimer);
        },
        // 60s固定发送心跳
        startHeart() {
            this.reset();
            this.startHeartTimer = setTimeout(() => {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                this.ws.send({
                    cmd: 1100
                });
                //如果超过一定时间还没重置，说明后端主动断开了
                self.serverTimeoutObj = setTimeout(() => {
                    //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                    this.ws.close();
                }, 60000);
            }, 60000);
        },
        send() {
            this.ws.send(JSON.stringify({ name: 'nicky' }));
        }
    }
};
</script>
