set -e
function ensure_success {
        return_status="$1"
        error_message="$2"
        if [ "$return_status" -ne 0  ];then
                echo "$error_message"
                exit
        fi  
}

rm -rf dist
yarn install --production=false --force --frozen-lockfile
ensure_success "$?" "error installing npms"

npm run build-client-prod
ensure_success "$?" "Client build failed"

npm run build-server-prod
ensure_success "$?" "Server build failed"

cp -r ./src/fonts/ ./dist/client/fonts/
ensure_success "$?" "font copy failed"

cp -r ./src/images/ ./dist/client/images/
ensure_success "$?" "images copy failed"

cp -r ./node_modules/@mxplay/player/public/* ./dist/client/js/
ensure_success "$?" "player copy failed"

cp -r ./node_modules/@mxplay/video-player/dist/video/* ./dist/client/video/
ensure_success "$?" "video file copy failed"
