import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Delete, Res } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IElementDetails } from "../models/interfaces/IDetail";
import { Response } from "express";


@JsonController()
export class DetailController {

    public dataService: DataService

    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/element-details/:id")
    async getAll(@Param("id") id: number) {
        const data = await this.dataService.elementDetailService.getAllDetails(id);
        return data;
    }

    @Post("/element-details")
    async post(@Body() detail: IElementDetails) {
        const data = await this.dataService.elementDetailService.createDetail(detail);
        return data;
    }


    @Delete("/element-details/:id")
    async remove(@Param("id") id: number, @Res() res: Response) {
        const data = await this.dataService.elementDetailService.deleteDetail(id, res);
        return data;
    }

}
