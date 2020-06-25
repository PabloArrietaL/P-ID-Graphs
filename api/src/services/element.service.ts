import { getManager, UpdateResult, DeleteResult } from "typeorm";
import { Element } from '../models/entities/Element';
import { Singleton, Container } from "typescript-ioc";
import { IElement } from "../models/interfaces/IElement";
import fs from 'fs-extra';
import { Response } from "express";
import _ from "underscore";
import { RelationService } from "./relation.service";

@Singleton
export class ElementService {
    
    public relationService: RelationService;
    constructor() {
        this.relationService = Container.get(RelationService);
    }

    createElement(element: IElement, file: any, res: Response): Response | Promise<Element> {

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

        return getManager().getRepository(Element).save(toSaveElement);

    }

    getAllElements(): Promise<Element[]> {
        return getManager().getRepository(Element).find()
    }

    getByName(name: string) {
        return getManager().getRepository(Element).find({
            where: {
                name: name
            }
        });
    }

    updateElement(id: number, element: IElement): Promise<UpdateResult> {
        return getManager().getRepository(Element).update({ id: id }, element);
    }

    deleteElement(id: number, res: Response): Promise<Response> | Response {

        try {
            return getManager().getRepository(Element).delete({ id: id }).then( data => {
                return res.status(200).json({message: 'Elemento eliminado', data});
            }).catch( _ => {
                return res.status(500).json({message: "El elemento se está utilizando en un proceso"});
            });
        }
        catch(error) {
            return res.status(500).json({message: "Ha ocurrido un error", data: error});
        }
    }
}