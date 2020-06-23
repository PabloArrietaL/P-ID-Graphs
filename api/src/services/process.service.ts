import {getManager, UpdateResult, DeleteResult} from "typeorm";
import { Process } from "../models/entities/Process";
import { Singleton } from "typescript-ioc";
import { IProcess } from "../models/interfaces/IProcess";

@Singleton 
export class ProcessService{
    
    createProcess(process: IProcess): Promise<Process>{
        process.created_date = new Date();
        return getManager().getRepository(Process).save(process);
    }

    getAllProcess(): Promise<Process[]>{        
        return getManager().getRepository(Process).find()
    }

    getByName(name: string){        
        return getManager().getRepository(Process).find({
            where:{
                name: name
            }
        })
    }

    updateProcess(id: number, process: IProcess):Promise<UpdateResult>{
        return getManager().getRepository(Process).update({ id: id }, process);
    }
    deleteProcess(id: number):Promise<DeleteResult>{
        return getManager().getRepository(Process).delete({ id: id});
    }
}