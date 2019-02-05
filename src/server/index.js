import path from 'path'
import * as http from 'http'
import Koa from 'koa'
import Pug from 'koa-pug'
import viewHandler from './viewhandler'
import staticMiddleware from './middleware/static'
import serve from 'koa-static'
import settings from './settings'

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

    // Add a `close` event listener so we can clean up resources.
    server.on('close', () => {
        // Handler to tear down database connections, TCP connections, etc
        logger.debug('Server closing, bye!')
    });
    return server
}