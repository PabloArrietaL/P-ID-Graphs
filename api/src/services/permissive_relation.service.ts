import { getManager, getRepository } from "typeorm";
import { Singleton } from "typescript-ioc";
import { Response } from "express";
import { IPermissiveRelation } from "../models/interfaces/IPermissiveRelation";
import { PermissiveRelation } from "../models/entities/PermissiveRelation";


@Singleton 
export class PermisiveRelationService{

    createPermissive(permissive: IPermissiveRelation): Promise<PermissiveRelation>{
        return getManager().getRepository(PermissiveRelation).save(permissive);
    }

    async getAllPermissives(id: number): Promise<PermissiveRelation[]>{        

        const query = await getRepository(PermissiveRelation).createQueryBuilder("permissive")
        .where("permissive.process = :process")
        .leftJoinAndSelect("permissive.process", "process")
        .leftJoinAndSelect("permissive.actuator", "actuator")
        .leftJoinAndSelect("permissive.controlled", "controlled")
        .leftJoinAndSelect("permissive.status", "status")
        .setParameter('process', id)
        .getMany();
        
        return query;
    }

    deletePermissive(id: number, res: Response): Promise<Response> | Response{
        return getManager().getRepository(PermissiveRelation).delete({ id: id}).then( data => {
            return res.status(200).json({ message: 'Relación eliminada'});
        }).catch( error => {
            return res.status(500).json({ message: 'Ha ocurrido un error', data: error});
        });
    }

}