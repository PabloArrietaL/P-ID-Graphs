import { IDataService } from "./IdataService";
import { Inject } from "typescript-ioc";
import { ElementService } from "./element.service";
import { ProcessService } from "./process.service";
import { StatusService } from "./status.service";
import { ElementDetailService } from "./element_detail.service";
import { ProcessDetailService } from "./process_detail.service";

export class DataService implements IDataService {

    constructor(
        @Inject public elementService : ElementService,
        @Inject public processService: ProcessService,
        @Inject public statusService: StatusService,
        @Inject public processDetailService: ProcessDetailService,
        @Inject public elementDetailService: ElementDetailService){
    }

}