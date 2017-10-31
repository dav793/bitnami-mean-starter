import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

//import {wsServer, broadcast} from './wsServer';

import IndexRouter from './routes/IndexRouter';

const mongoIpAddr = process.env.MONGO_IPADDR || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const dbName = process.env.DB_NAME || 'alnitzi';

class App {

	// ref to Express instance
	public express: express.Application;

	// Run configuration methods on the Express instance.
	constructor() {
		this.express = express();
		this.database();
		this.middleware();
        this.authentication();
		this.routes();
	}

	// Configure database connection.
	private database(): void {
		/*(<any>mongoose).Promise = global.Promise;

		let url = 'mongodb://'+mongoIpAddr+':'+mongoPort+'/'+dbName;
		mongoose.connect(url, { useMongoClient: true });

		let db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function () {
		    console.log("Connected correctly to db server");
		});*/
	}

	// Configure Express middleware.
	private middleware(): void {
		this.express.use(cors());		 // cross-origin resource sharing
		this.express.use(logger('dev'));
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
	}

    // Configure user authentication.
    private authentication(): void {
        /*require('./models/UserModel').User;
        require('../config/passport');
        this.express.use(passport.initialize());

        // protect api routes
        const expressJwt = require('express-jwt');
        const authenticate = expressJwt({secret : 'MY_SECRET_KEY_LepI61NIoK1qG6UYtlO3rms5h1b0qVA7'});
        this.express.use('/api/projects', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/persons', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/plots', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/requirements', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/purchaseOrders', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/providers', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/users', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/validateUserToken', authenticate, (req, res, next) => { next(); });
        this.express.use('/api/logs', authenticate, (req, res, next) => { next(); });*/
    }

	// Configure API endpoints.
	private routes(): void {
		// this.express.use('/', express.static(path.join(__dirname, '../../client/src', '')));
		// this.express.use('/node_modules', express.static(path.join(__dirname, '../../client/src', 'node_modules')));

		// Index Router, serves the angular app
		this.express.use('/', IndexRouter);

		// // 404 response
		// this.express.all('*', (req: any, res: any) => {
		// 	console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
		// 	res.status(200).sendFile(path.join(__dirname, '../../client/src', 'index.html'));		
		// });


	}

}

// wsServer.clients.forEach(function each(client) {});

export default new App().express;
