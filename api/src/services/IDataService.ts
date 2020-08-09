import { ElementService } from "./element.service";
import { ProcessService } from "./process.service";
import { StatusService } from "./status.service";
import { ElementDetailService } from "./element_detail.service";
import { ProcessDetailService } from "./process_detail.service";
import { PermisiveRelationService } from "./permissive_relation.service";
import { SynchronousRelationService } from "./synchronous_relation.service";

export interface IDataService {
    elementService: ElementService;
    processService: ProcessService;
    statusService: StatusService;
    processDetailService: ProcessDetailService;
    elementDetailService: ElementDetailService;
    permissiveRelationService: PermisiveRelationService;
    synchronousRelationService: SynchronousRelationService;
}