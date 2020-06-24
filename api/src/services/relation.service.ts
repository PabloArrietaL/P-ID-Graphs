import { getManager, UpdateResult, DeleteResult, getRepository } from "typeorm";
import { Relation } from "../models/entities/Relation";
import { Singleton } from "typescript-ioc";
import { IRelation } from "../models/interfaces/IRelation";

@Singleton
export class RelationService {

    createRelation(relation: IRelation): Promise<Relation> {
        return getManager().getRepository(Relation).save(relation);
    }

    async getAllRelationsByProcess(elementId: number): Promise<Relation[]> {
        const relations = await getRepository(Relation).createQueryBuilder("relation")
        .where("relation.element_source = :element OR relation.element_target = :element")
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