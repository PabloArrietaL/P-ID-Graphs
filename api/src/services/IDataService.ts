import { ElementService } from "./element.service";
import { ProcessService } from "./process.service";

export interface IDataService {
    elementService: ElementService;
    processService: ProcessService;
}