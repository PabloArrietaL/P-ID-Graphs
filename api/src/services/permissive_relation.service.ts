import { getManager } from "typeorm";
import { Singleton } from "typescript-ioc";
import { Response } from "express";
import { IPermissiveRelation } from "../models/interfaces/IPermissiveRelation";
import { PermissiveRelation } from "../models/entities/PermissiveRelation";


@Singleton 
export class PermisiveRelationService{

    createPermissive(permissive: IPermissiveRelation): Promise<PermissiveRelation>{
        return getManager().getRepository(PermissiveRelation).save(permissive);
    }

    getAllPermissives(): Promise<PermissiveRelation[]>{        
        return getManager().getRepository(PermissiveRelation).find()
    }

    deletePermissive(id: number, res: Response): Promise<Response> | Response{
        return getManager().getRepository(PermissiveRelation).delete({ id: id}).then( data => {
            return res.status(200).json({ message: 'Relación eliminada'});
        }).catch( error => {
            return res.status(500).json({ message: 'Ha ocurrido un error', data: error});
        });
    }

}