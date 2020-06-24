import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Put, Delete, UploadedFile, Res, UseBefore } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IElement } from "../models/interfaces/IElement";
import path from "path";
import multer from "multer";
import { Response } from "express";
import fs from "fs";


export const fileUploadOptions =  {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "../../uploads"),
        filename: (req, file, cb) => {
            let fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
            cb(null, fileName);
        },
    }),
    limits: { fileSize: 1000000 }
};

@JsonController()
export class ElementController {

    public dataService: DataService

    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Put("/api/image/:img")
    Get(@Param("img") img: string, @Res() res: Response) {
        
        let pathImage = path.resolve(__dirname, `../../uploads/${img}`);
        if (fs.existsSync(pathImage)) {
          return res.sendFile(pathImage); 
        }
    }

    @Get("/api/element")
    async getAll() {
        const data = await this.dataService.elementService.getAllElements();
        return data;
    }

    @Post("/api/element")
    async post(@UploadedFile("img", {options: fileUploadOptions}) file: any, @Body() element: IElement,@Res() res: Response) {
        const data = await this.dataService.elementService.createElement(element, file, res);
        return data;
    }

    @Put("/api/element/:id")
    put(@Param("id") id: number, @Body() element: IElement) {
        const data = this.dataService.elementService.updateElement(id, element);
        return data;
    }

    @Delete("/api/element/:id")
    async remove(@Param("id") id: number, @Res() res: Response) {
        const data = await this.dataService.elementService.deleteElement(id, res);

        return data;
    }

}
