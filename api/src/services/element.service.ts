import { getManager, UpdateResult, DeleteResult, DeepPartial, getRepository } from "typeorm";
import { Element } from '../models/entities/Element';
import { Singleton, Container } from "typescript-ioc";
import { IElement } from "../models/interfaces/IElement";
import fs from 'fs-extra';
import { Response } from "express";
import _ from "underscore";
import { RelationService } from "./relation.service";
import path from "path";

@Singleton
export class ElementService {

    public relationService: RelationService;
    constructor() {
        this.relationService = Container.get(RelationService);
    }

    createElement({ element, file, res }: { element: IElement; file: any; res: Response; }): Response | Promise<Response<any>|(IElement & Element)> {

        const toSaveElement: IElement = _.pick(element, [
            "name",
            "first_status",
            "second_status",
            "third_status",
            "initial_condition",
            "type",
            "description"
        ]);

        if (file !== undefined) {
            let CutName = file.originalname.split(".");
            let extension = CutName[CutName.length - 1].toLowerCase();

            let ExtensionsValidated = ["png", "jpg", "jpeg", "svg"];
            if (ExtensionsValidated.indexOf(extension) < 0) {
                let extensions = ExtensionsValidated.join(", ");
                fs.unlink(file.path);
                return res.status(400).json({
                    message: `Las extensiones permitidas son ${extensions}`,
                });
            }
            toSaveElement.img = file.filename;
        }
        toSaveElement.created_date = new Date();

        console.log(toSaveElement);

        return getManager().getRepository(Element).save(toSaveElement).then( data => {
            return data
        }).catch( error => {
            fs.unlink(file.path);
            return res.status(400).json({message: 'Ha ocurrido un error', data: error});
        });

    }

    async getAllElements(): Promise<Element[]> {
        const query = await getRepository(Element).createQueryBuilder("element")
        .leftJoinAndSelect("element.first_status", "first_status")
        .leftJoinAndSelect("element.second_status", "second_status")
        .leftJoinAndSelect("element.third_status", "third_status")
        .getMany();
        
        return query;
    }

    getByName(name: string) {
        return getManager().getRepository(Element).find({
            where: {
                name: name
            }
        });
    }

    async getById(id: number) {
        const query = await getRepository(Element).createQueryBuilder("element")
        .where("element.id = :id")
        .leftJoinAndSelect("element.details","details")
        .leftJoinAndSelect("element.first_status", "first_status")
        .leftJoinAndSelect("element.second_status", "second_status")
        .leftJoinAndSelect("element.third_status", "third_status")
        .setParameter('id', id)
        .getMany();
        
        return query;
    }

    updateElement(id: number, element: IElement): Promise<UpdateResult> {
        return getManager().getRepository(Element).update({ id: id }, element);
    }

    getElementById(id: number): Promise<IElement[]> {
        return getManager().getRepository(Element).find({
            where: {
                id: id
            }
        });
    }

    deleteElement(id: number, res: Response): Promise<Response> | Response {

        return this.getElementById(id).then((element: IElement[]) => {
            try {
                return getManager().getRepository(Element).delete({ id: id }).then(data => {
                    try{
                        fs.unlink(path.resolve(__dirname, `../../uploads/${element[0].img}`));
                    } catch(_){}
                    return res.status(200).json({ message: 'Elemento eliminado'});
                }).catch(_ => {
                    return res.status(500).json({ message: "El elemento se está utilizando en un proceso" });
                });
            }
            catch (error) {
                return res.status(500).json({ message: "Ha ocurrido un error", data: error });
            }
        }).catch((error) => {
            return res.status(500).json({ message: "Ha ocurrido un error", data: error });
        });
    }
}