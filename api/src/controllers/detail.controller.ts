import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Delete, Res, Put } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IElementDetail } from "../models/interfaces/IDetail";


@JsonController()
export class DetailController {

    public dataService: DataService

    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Put("/element-details/:id")
    put(@Param("id") id: number, @Body() detail: IElementDetail) {
        const data = this.dataService.elementDetailService.updateDetail(id, detail);
        return data;
    }


}
