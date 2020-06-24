import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IRelation } from "../models/interfaces/IRelation";

@JsonController()
export class RelationController {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/api/relation:id")
    async getAll(@Param("id") id: number) {
        const data = await this.dataService.relationService.getAllRelationsByProcess(id);
        return data;
    }

    @Post("/api/relation")
    async post(@Body() relation: IRelation) {
        const data = await this.dataService.relationService.createRelation(relation);
        return data;
    }

    @Put("/api/relation/:id")
    put(@Param("id") id: number, @Body() relation: IRelation) {
        return this.dataService.relationService.updateRelation(id, relation).then( data => {
            return data;
        });
    }

    @Delete("/api/relation/:id")
    remove(@Param("id") id: number) {
        return this.dataService.relationService.deleteRelation(id).then( data => {
            return data;
        });
    }

}
