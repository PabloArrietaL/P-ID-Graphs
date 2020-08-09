import { getManager } from "typeorm";
import { Singleton } from "typescript-ioc";
import { Response } from "express";
import { ISynchronousRelation } from "../models/interfaces/ISynchronousRelation";
import { SynchronousRelation } from "../models/entities/SynchronousRelation";


@Singleton 
export class SynchronousRelationService{

    createSynchronous(synchronous: ISynchronousRelation): Promise<SynchronousRelation>{
        return getManager().getRepository(SynchronousRelation).save(synchronous);
    }

    getAllSynchronous(): Promise<SynchronousRelation[]>{        
        return getManager().getRepository(SynchronousRelation).find()
    }

    deleteSynchronous(id: number, res: Response): Promise<Response> | Response{
        return getManager().getRepository(SynchronousRelation).delete({ id: id}).then( data => {
            return res.status(200).json({ message: 'Relación eliminada'});
        }).catch( error => {
            return res.status(500).json({ message: 'Ha ocurrido un error', data: error});
        });
    }

}