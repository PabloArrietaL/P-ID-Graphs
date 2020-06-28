import { getManager } from "typeorm";
import { ElementDetails } from "../models/entities/Detail";
import { Singleton } from "typescript-ioc";
import { IElementDetails } from "../models/interfaces/IDetail";
import { Response } from "express";

@Singleton 
export class ElementDetailService{
    
    createDetail(detail: IElementDetails): Promise<ElementDetails>{
        return getManager().getRepository(ElementDetails).save(detail);
    }

    getAllDetails(id: number): Promise<ElementDetails[]>{        
        return getManager().getRepository(ElementDetails).find({
            where: {
                element: id
            }
        })
    }

    deleteDetail(id: number, res: Response): Promise<Response> | Response{
        return getManager().getRepository(ElementDetails).delete({ id: id}).then( data => {
            return res.status(200).json({ message: 'Detalle eliminado'});
        }).catch( error => {
            return res.status(500).json({ message: 'Ha ocurrido un error', data: error});
        });
    }
}