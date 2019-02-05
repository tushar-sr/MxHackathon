import path from 'path'
import * as http from 'http'
import Koa from 'koa'
import Pug from 'koa-pug'
import viewHandler from './viewhandler'
import staticMiddleware from './middleware/static'
import serve from 'koa-static'
import settings from './settings'
import socketIO from 'socket.io'
import videoData from '../app/data'

export async function createServer() {
    const app = new Koa();
    const pug = new Pug({
        viewPath: path.resolve(__dirname, 'templates'),
        debug: false,
        pretty: false,
        compileDebug: false,
        app: app // equals to pug.use(app) and app.use(pug.middleware)
    });

    app.use(staticMiddleware)
    app.use(serve('dist/client')) // Static File Handler
    app.use(viewHandler) // All the react routes handlers

    app.use(async function(ctx, next){
        ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        ctx.set('Pragma', 'no-cache');
        ctx.set('Expires', 0)
        await next()
    })

    const server = http.createServer(app.callback());
    var io = socketIO(server)
    io.on('connection', function(socket){
        socket.on('activity', function(data){
            let video = videoData[data.id]
            let activities = video.activities
            let time = Math.floor(data.time)
            if(!activities[time]){
                activities[time] = []
            }
            activities[time].push(data.emojiID)
            io.emit('activity', data)
            io.emit('videoActivities', {id: data.id,activities: activities})
            })

            socket.on('getActivities', function(id){
                let video = videoData[id]
                let activities = video.activities
                io.emit('videoActivities', {id: id,activities: activities})
            })
        });

    server.on('close', () => {
        logger.debug('Server closing, bye!')
    });
    return server
}