import express, { Application } from 'express';
import bodyParser from "body-parser";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import {createConnection} from "typeorm";
import { ProcessController } from './controllers/process.controller';
import { ElementController } from './controllers/element.controller';
import { RelationController } from './controllers/relation.controller';

export class App {

    private app: Application;
    //private o:Connection=null ;
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.routes();
        //this.middlewares();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }


    async listen() {
        this.app.listen(this.app.get('port'));
        createConnection().then(async _ => {
            console.log(`Server running in port ${this.app.get('port')}`)
        }).catch(error => console.log(error));  
    }





    routes() {
        //this.app.use(IndexRoutes);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        useExpressServer(this.app, {
            controllers: [
                ProcessController,
                ElementController,
                RelationController
            ] 
        });
    }


}