import resources from '../resources.json'
import settings from '../settings'
import * as fs from 'fs'
import * as path from 'path'
import * as uglifycss from 'uglifycss'
const static_url = settings.get("static_url")
const scripts = [static_url + resources['external.js'], static_url + resources['app.js']]
let styleSheet = fs.readFileSync(path.resolve(__dirname, '../client' + resources['app.css']), 'utf-8');

// let fonts = `@font-face {
//     font-family: 'icomoon';
//     src:  url('${static_url}/fonts/ico-moon.eot?iagvkv');
//     src:  url('${static_url}/fonts/ico-moon.eot?iagvkv#iefix') format('embedded-opentype'),
//       url('${static_url}/fonts/ico-moon.ttf?iagvkv') format('truetype'),
//       url('${static_url}/fonts/ico-moon.woff?iagvkv') format('woff'),
//       url('${static_url}/fonts/ico-moon.svg?iagvkv#icomoon') format('svg');
//     font-weight: normal;
//     font-style: normal;
//   }`
// styleSheet = fonts + styleSheet
const styles = uglifycss.processString(styleSheet)

const staticMiddleware  = async function(ctx, next){
    ctx.resources = {
        static_url: static_url,
        scripts: scripts,
        styles: styles,
        styleSheets: ['https://fonts.googleapis.com/css?family=Poppins:300,400,600,700'] //styleSheets
    };
    await next();
};

export default staticMiddleware;