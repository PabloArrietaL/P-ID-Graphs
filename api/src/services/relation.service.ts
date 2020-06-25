import { getManager, UpdateResult, DeleteResult, getRepository } from "typeorm";
import { Relation } from "../models/entities/Relation";
import { Singleton } from "typescript-ioc";
import { IRelation } from "../models/interfaces/IRelation";
import { Response } from "express";

@Singleton
export class RelationService {

    createRelation(relation: IRelation, res: Response): Promise<Relation> | Response{

        getRepository(Relation).createQueryBuilder("relation")
        .where("relation.process = :process")
        .andWhere(`(relation.element_source = :elementS AND relation.element_target = :elementT) OR 
        (relation.element_source = :elementT AND relation.element_target = :elementS)`)
        .setParameters({process: relation.process, elementS: relation.element_source, elementT: relation.element_target})
        .getMany().then( data => {
            if(data.length > 0) {
                res.status(400).json({message: "Esta combinación de elementos ya se encuentra en el proceso"})
            }
        });
        return getManager().getRepository(Relation).save(relation);
    }

    async getAllRelationsByProcess(elementId: number): Promise<Relation[]> {
        const relations = await getRepository(Relation).createQueryBuilder("relation")
        .where("relation.element_source = :element OR relation.element_target = :element")
        .leftJoinAndSelect("relation.element_source", "element_source")
        .leftJoinAndSelect("relation.element_target", "element_target")
        .setParameters({element: elementId}).getMany();

        return relations;
    }

    updateRelation(id: number, relation: IRelation): Promise<UpdateResult> {
        return getManager().getRepository(Relation).update({ id: id }, relation);
    }

    deleteRelation(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Relation).delete({ id: id });
    }
}