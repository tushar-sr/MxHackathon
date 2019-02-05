import { createServer } from './index'

createServer().then(
    app =>{
        const PORT = process.env.PORT ||9000;
        const mode = process.env.NODE_ENV || "development";
        app.listen(PORT, () => {
            console.log("Server started in " + mode + " mode on port " + PORT);
        })},
    err => {
        console.log(err);
        process.exit(1)
    }
);