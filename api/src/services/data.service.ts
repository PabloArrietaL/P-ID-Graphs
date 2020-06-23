import { IDataService } from "./IdataService";
import { Inject } from "typescript-ioc";
import { ElementService } from "./element.service";
import { ProcessService } from "./process.service";

export class DataService implements IDataService {

    constructor(
        @Inject public elementService : ElementService,
        @Inject public processService: ProcessService){
    }

}