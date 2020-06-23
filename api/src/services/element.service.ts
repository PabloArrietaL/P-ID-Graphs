import {getManager, UpdateResult, DeleteResult} from "typeorm";
import { Element } from '../models/entities/Element';
import { Singleton } from "typescript-ioc";
import { IElement } from "../models/interfaces/IElement";

@Singleton 
export class ElementService{
    createElement(element: IElement, file: any): Promise<Element>{
        return getManager().getRepository(Element).save(element);
    }

    getAllElements(): Promise<Element[]>{        
        return getManager().getRepository(Element).find()
    }

    updateElement(id: number, element: IElement): Promise<UpdateResult>{
        return getManager().getRepository(Element).update({ id: id }, element);
    }
    deleteElement(id: number):Promise<DeleteResult>{
        return getManager().getRepository(Element).delete({ id: id});
    }
}