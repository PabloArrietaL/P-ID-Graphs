import { getManager, UpdateResult, DeleteResult, DeepPartial, getRepository } from "typeorm";
import { Element } from '../models/entities/Element';
import { Singleton, Container } from "typescript-ioc";
import { IElement } from "../models/interfaces/IElement";
import fs from 'fs-extra';
import { Response } from "express";
import _ from "underscore";
import path from "path";
import { ElementDetailService } from "./element_detail.service";

@Singleton
export class ElementService {

    public detail: ElementDetailService;

    constructor() {
        this.detail = Container.get(ElementDetailService);
    }

    async createElement({ element, file, res }: { element: IElement; file: any; res: Response; }) {

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

        return getManager().getRepository(Element).save(toSaveElement).then(  async data => {

            const detail =  await this.detail.createDetail(data);
            data.detail = detail;
            return this.updateElement(data.id, data);
        }).catch( error => {
            fs.unlink(file.path);
            return res.status(400).json({message: 'Ha ocurrido un error', data: error});
        });

    }

    async getAllElements() {
        const query = await getRepository(Element).createQueryBuilder("element")
        .leftJoinAndSelect("element.first_status", "first_status")
        .leftJoinAndSelect("element.second_status", "second_status")
        .leftJoinAndSelect("element.third_status", "third_status")
        .leftJoinAndSelect("element.detail", "detail")
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
        .leftJoinAndSelect("element.detail","detail")
        .leftJoinAndSelect("element.first_status", "first_status")
        .leftJoinAndSelect("element.second_status", "second_status")
        .leftJoinAndSelect("element.third_status", "third_status")
        .setParameter('id', id)
        .getMany();
        
        return query;
    }

    async getByType(type: string) {
        const query = await getRepository(Element).createQueryBuilder("element")
        .where("element.type = :type")
        .leftJoinAndSelect("element.first_status", "first_status")
        .leftJoinAndSelect("element.second_status", "second_status")
        .leftJoinAndSelect("element.third_status", "third_status")
        .leftJoinAndSelect("element.detail", "detail")
        .setParameter('type', type)
        .getMany();
        
        return query;
    }

    updateElement(id: number, element: IElement) {
        return getManager().getRepository(Element).update({ id: id }, element);
    }

    getElementById(id: number){
        return getManager().getRepository(Element).findOne({id: id});
    }

    async deleteElement(id: number, res: Response) {

        try {
            const element = await this.getElementById(id);
            try {
                return getManager().getRepository(Element).delete({ id: id }).then(data => {
                    try {
                        fs.unlink(path.resolve(__dirname, `../../uploads/${element?.img}`));
                    } catch (_) { }
                    return res.status(200).json({ message: 'Elemento eliminado' });
                }).catch(__1 => {
                    return res.status(500).json({ message: "El elemento se está utilizando en un proceso" });
                });
            }
            catch (error) {
                return res.status(500).json({ message: "Ha ocurrido un error", data: error });
            }
        } catch (error_1) {
            return res.status(500).json({ message: "Ha ocurrido un error", data: error_1 });
        }
    }
}