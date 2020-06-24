import { ExpressMiddlewareInterface } from "routing-controllers";
import { DataService } from "../services/data.service";
import { Container } from "typescript-ioc";

export class ProcessMiddleware implements ExpressMiddlewareInterface {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    use(request: any, response: any, next?: any): any {

        const name = request.body.name;
        this.dataService.processService.getByName(name).then( (data) => {
            if( data.length) {
                return response.status(400).json({ message: 'El nombre del proceso no está disponible' });
            } else {
                next();
            }
        })
    }

}