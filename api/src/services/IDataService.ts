import { ElementService } from "./element.service";
import { ProcessService } from "./process.service";
import { RelationService } from "./relation.service";
import { StatusService } from "./status.service";

export interface IDataService {
    elementService: ElementService;
    processService: ProcessService;
    relationService: RelationService;
    statusService: StatusService;
}