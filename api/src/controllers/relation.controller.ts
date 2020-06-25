import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Put, Delete, Res } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IRelation } from "../models/interfaces/IRelation";
import { Response } from "express";

@JsonController()
export class RelationController {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/relation/:id")
    async getAll(@Param("id") id: number) {
        const data = await this.dataService.relationService.getAllRelationsByProcess(id);
        return data;
    }

    @Post("/relation")
    async post(@Body() relation: IRelation, @Res() res: Response) {
        const data = await this.dataService.relationService.createRelation(relation, res);
        return data;
    }

    @Put("/relation/:id")
    put(@Param("id") id: number, @Body() relation: IRelation) {
        return this.dataService.relationService.updateRelation(id, relation).then( data => {
            return data;
        });
    }

    @Delete("/relation/:id")
    remove(@Param("id") id: number) {
        return this.dataService.relationService.deleteRelation(id).then( data => {
            return data;
        });
    }

}
