import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Delete, Res } from "routing-controllers";
import { DataService } from "../services/data.service";
import { Response } from "express";
import { ISynchronousRelation } from "../models/interfaces/ISynchronousRelation";

@JsonController()
export class SynchronousController {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/synchronous")
    async getAll() {
        const data = await this.dataService.synchronousRelationService.getAllSynchronous();
        return data;
    }

    @Post("/synchronous")
    async post(@Body() synchronous: ISynchronousRelation) {
        const data = await this.dataService.synchronousRelationService.createSynchronous(synchronous);
        return data;
    }

    @Delete("/synchronous/:id")
    remove(@Param("id") id: number, @Res() res: Response) {
        return this.dataService.synchronousRelationService.deleteSynchronous(id, res);
    }

}
