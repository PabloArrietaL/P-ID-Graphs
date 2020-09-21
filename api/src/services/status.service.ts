import { getManager, UpdateResult } from "typeorm";
import { Status } from "../models/entities/Status";
import { Singleton } from "typescript-ioc";
import { Response } from "express";
import { IStatus } from "../models/interfaces/IStatus";

@Singleton
export class StatusService {


    async createStatus(status: IStatus, res: Response){   
        try {
            const data = await getManager().getRepository(Status).save(status);
            return data;
        } catch (error) {
            return res.status(400).json({ message: 'Ya hay un estado con este nombre', data: error });
        }
    }

    getAllStatus(){
        return getManager().getRepository(Status).find()
    }

    getByName(name: string){        
        return getManager().getRepository(Status).find({
            where:{
                name: name
            }
        })
    }

    updateStatus(id: number, status: IStatus){
        return getManager().getRepository(Status).update({ id: id }, status);
    }


    async deleteStatus(id: number, res: Response) {

        try {
            const data = await getManager().getRepository(Status).delete(id);
            return res.status(200).json({ message: 'Estado eliminado correctamente' });
        }
        catch (error) {
            return res.status(500).json({ message: 'El estado se está utilizando actualmente' });
        }
    }
}