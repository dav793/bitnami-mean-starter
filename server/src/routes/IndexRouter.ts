import {Router, Request, Response, NextFunction} from 'express';
import * as path from 'path';

export class IndexRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', (req, res) => {
            res.send('Hello World');
            // res.sendFile(path.join(__dirname, '../../../client/src', 'index.html'));   // serve the angular app
        });
    }
}

export default new IndexRouter().router;