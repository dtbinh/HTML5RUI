/*
    HTML5 Robot User Interface Web Application
    An ASLab Project,
    Developed by Daniel Peiró
    ETSII, UPM 2014-2015    
*/

//Sharing service for controllers to push and pull Profile data
app.service('ProfileSrv', function() {
    this.profile = {};
});
//Websocket server (for livevideo/audio and Socket.io) shared between controllers
app.service('SocketSrv', function() {
    //open WebSocket
    this.socket = io.connect();
    //streaming Params
    this.VIDEOWSPORT = 3000;
    this.AUDIOWSPORT = 4000;
    this.VIDEODEVICE = 0;
    this.videowsocket;
    this.wsAudioPlayer;

});
//Service with typical drawing methods shared between controllers
app.service('DrawSrv', function() {
    return {
        drawCircle: function(ctx, x, y, radius, fillColor) {
            ctx.beginPath();
            ctx.lineWidth = 1.1;
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            if (!!fillColor) { //if fillColor arg given, fill in circle.
                ctx.fillStyle = fillColor;
                ctx.fill();
            };
            ctx.stroke();
        },
        drawLineFromCenter: function(ctx, x, y) {
            ctx.beginPath();
            ctx.lineWidth = 1.1;
            ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2);
            ctx.lineTo(x, y);
            ctx.stroke();
        },
        writeInCanvas: function(ctx, font, text, x, y) {
            ctx.font = font;
            ctx.fillText(text, x, y);
        },
    }
});
//Service with typical Geometric methods shared between controllers
app.service('GeometrySrv', function() {
    return {
        isInsideCircle: function(x, y, radius) {
            return ((x * x + y * y) <= (radius * radius));
        },
        forceIntoCircle: function(x, y, radius) {
            var a = y / x;
            if (x > 0) {
                x = radius / Math.sqrt(1 + a * a);
            } else {
                x = -radius / Math.sqrt(1 + a * a);
            }
            if (y > 0) {
                y = radius / Math.sqrt(1 + 1 / (a * a));
            } else {
                y = -radius / Math.sqrt(1 + 1 / (a * a));
            }
            return {
                x: x,
                y: y
            };
        },
        centerCoord: function(point, canvas) {
            return {
                x: point.x - canvas.width / 2,
                y: canvas.height / 2 - point.y,
            };
        },
        canvasCoord: function(point, canvas) {
            return {
                x: point.x + canvas.width / 2,
                y: canvas.height / 2 - point.y,
            };
        },

        forceDirectionLock: function(x, y, lockMode) {
            var angle = Math.atan2(Math.abs(y), Math.abs(x));
            switch (lockMode) {
                case "lock8ways":
                    if (angle > 30 * Math.PI / 180 && angle < 60 * Math.PI / 180) {
                        if (x * y > 0) {
                            y = x;
                        } else {
                            y = -x;
                        }
                    } else if (angle < 30 * Math.PI / 180) {
                        y = 0;
                    } else if (angle > 60 * Math.PI / 180) {
                        x = 0;
                    }
                    break;
                case "lock4ways":
                    if (angle < 45 * Math.PI / 180) {
                        y = 0;
                    } else {
                        x = 0;
                    }
                    break;
                case "lock2ways":
                    x = 0;
                    break;
            }
            return {
                x: x,
                y: y
            };
        },
    }
});