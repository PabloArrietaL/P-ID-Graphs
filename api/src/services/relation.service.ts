import { getManager, UpdateResult, getRepository } from "typeorm";
import { Relation } from "../models/entities/Relation";
import { Singleton } from "typescript-ioc";
import { IRelation } from "../models/interfaces/IRelation";
import { Response } from "express";

@Singleton
export class RelationService {

    async createRelation(relation: IRelation, res: Response): Promise<void | (IRelation & Relation) | undefined>{

        const query = await getRepository(Relation).createQueryBuilder("relation")
        .where("relation.processId = :process")
        .andWhere(`(relation.elementSourceId = :elementS AND relation.elementTargetId = :elementT) OR 
        (relation.elementSourceId = :elementT AND relation.elementTargetId = :elementS)`)
        .setParameters({process: relation.process, elementS: relation.element_source, elementT: relation.element_target})
        .getMany();

        if (query.length == 0) {
            return getManager().getRepository(Relation).save(relation);
        } else {
            res.status(400).json({message: "Esta combinación de elementos ya se encuentra en el proceso"})
        }
        
    }

    async getAllRelationsByProcess(processId: number): Promise<Relation[]> {
        const relations = await getRepository(Relation).createQueryBuilder("relation")
        .where("relation.process = :process")
        .leftJoinAndSelect("relation.element_source", "element_source")
        .leftJoinAndSelect("relation.element_target", "element_target")
        .setParameters({process: processId}).getMany();

        return relations;
    }

    updateRelation(id: number, relation: IRelation): Promise<UpdateResult> {
        return getManager().getRepository(Relation).update({ id: id }, relation);
    }

    deleteRelation(id: number, res: Response): Promise<Response> | Response {
        return getManager().getRepository(Relation).delete({ id: id }).then( data => {
            return res.status(200).json({ message: 'Relación eliminada'});
        }).catch (error => {
            return res.status(500).json({ message: 'Ha ocurrido un error', data: error});
        });
    }
}