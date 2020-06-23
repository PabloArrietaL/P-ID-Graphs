import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Put, Delete, UploadedFile } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IElement } from "../models/interfaces/IElement";

@JsonController()
export class ElementController {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/api/element")
    async getAll() {
        const data = await this.dataService.elementService.getAllElements();
        return data;
    }

    @Post("/api/element")
    async post(@UploadedFile("img") file: any, @Body() element: IElement) {
        const data = await this.dataService.elementService.createElement(element, file);
        if (data.id) {
            return data;
        }
    }

    @Put("/api/element/:id")
    put(@Param("id") id: number, @Body() element: IElement) {
        return this.dataService.elementService.updateElement(id, element).then( _ => {
            return true;
        });
    }

    @Delete("/api/element/:id")
    remove(@Param("id") id: number) {
        return this.dataService.elementService.deleteElement(id).then( _ => {
            return true;
        });
    }

}
