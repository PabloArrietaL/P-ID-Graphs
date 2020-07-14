import {getManager, UpdateResult, getRepository } from "typeorm";
import { Singleton } from "typescript-ioc";
import { Response } from "express";
import { IProcessDetail } from "../models/interfaces/IProcessDetail";
import { ProcessDetail } from "../models/entities/ProcessDetail";

@Singleton 
export class ProcessDetailService{
    
    createDetail(detail: IProcessDetail): Promise<ProcessDetail>{
        return getManager().getRepository(ProcessDetail).save(detail);
    }

    async getAllDetails(id: number): Promise<ProcessDetail[]>{        


        const query = await getRepository(ProcessDetail).createQueryBuilder("detail")
        .leftJoinAndSelect("detail.element", "element")
        .leftJoinAndSelect("element.first_status", "first_status")
        .leftJoinAndSelect("element.second_status", "second_status")
        .leftJoinAndSelect("element.third_status", "third_status")
        .where({process: id})
        .getMany();
        
        return query;
    }

    deleteDetail(id: number, res: Response): Promise<Response> | Response{
        return getManager().getRepository(ProcessDetail).delete({ id: id}).then( data => {
            return res.status(200).json({ message: 'Elemento del proceso eliminado'});
        }).catch( error => {
            return res.status(500).json({ message: 'Ha ocurrido un error', data: error});
        });
    }
}