import { IDataService } from "./IdataService";
import { Inject } from "typescript-ioc";
import { ElementService } from "./element.service";
import { ProcessService } from "./process.service";
import { RelationService } from "./relation.service";
import { StatusService } from "./status.service";
import { ElementDetailService } from "./detail.service";

export class DataService implements IDataService {

    constructor(
        @Inject public elementService : ElementService,
        @Inject public processService: ProcessService,
        @Inject public relationService: RelationService,
        @Inject public statusService: StatusService,
        @Inject public elementDetailService: ElementDetailService){
    }

}