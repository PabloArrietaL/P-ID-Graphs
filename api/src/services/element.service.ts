import { getManager, UpdateResult, DeleteResult } from "typeorm";
import { Element } from '../models/entities/Element';
import { Singleton } from "typescript-ioc";
import { IElement } from "../models/interfaces/IElement";
import fs from 'fs-extra';
import { Response } from "express";
import _ from "underscore";

@Singleton
export class ElementService {

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
            console.log(file);
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
        })
    }

    updateElement(id: number, element: IElement): Promise<UpdateResult> {
        return getManager().getRepository(Element).update({ id: id }, element);
    }

    deleteElement(id: number): Promise<DeleteResult> {
        return getManager().getRepository(Element).delete({ id: id });
    }
}