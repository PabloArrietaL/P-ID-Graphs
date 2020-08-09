import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Delete, Res } from "routing-controllers";
import { DataService } from "../services/data.service";
import { Response } from "express";
import { IPermissiveRelation } from "../models/interfaces/IPermissiveRelation";

@JsonController()
export class PermissiveController {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/permissive")
    async getAll() {
        const data = await this.dataService.permissiveRelationService.getAllPermissives();
        return data;
    }

    @Post("/permissive")
    async post(@Body() permissive: IPermissiveRelation) {
        const data = await this.dataService.permissiveRelationService.createPermissive(permissive);
        return data;
    }

    @Delete("/permissive/:id")
    remove(@Param("id") id: number, @Res() res: Response) {
        return this.dataService.permissiveRelationService.deletePermissive(id, res);
    }

}
