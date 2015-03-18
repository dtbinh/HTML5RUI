/*
CODE ADAPTED TO ANGULARJS FROM ORIGINAL WORK by Dominic Szablewski - phoboslab.org, github.com/phoboslab:
http://phoboslab.org/log/2013/09/html5-live-video-streaming-via-websockets/ 
*/
app.controller('LiveVideoController', ['$scope', 'SocketSrv',
    function(scope, SocketSrv) {
        var WSPORT = 3000;
        var videoCanvas = document.getElementById('videoCanvas');
        var ctx = videoCanvas.getContext('2d');
        videoCanvas.width = 320;
        videoCanvas.height = 240;
        ctx.fillStyle = '#444';
        ctx.fillText('Loading...', videoCanvas.width / 2 - 30, videoCanvas.height / 3);
        // get URL
        var wsurl = 'ws'.concat(document.URL.slice(4, document.URL.lastIndexOf('/')).concat(':' + WSPORT + '/'));
        // Setup the WebSocket connection and start the player        
        SocketSrv.videowsocket = new WebSocket(wsurl);
        var player = new jsmpeg(SocketSrv.videowsocket, {
            canvas: videoCanvas
        });
    }
]);