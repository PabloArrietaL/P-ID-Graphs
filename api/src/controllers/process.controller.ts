import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore, Res } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IProcess } from "../models/interfaces/IProcess";
import { ProcessMiddleware } from "../middlewares/process.middleware";
import { Response } from "express";

@JsonController()
export class ProcessController {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/process")
    async getAll() {
        const data = await this.dataService.processService.getAllProcess();
        return data;
    }

    @Post("/process")
    @UseBefore(ProcessMiddleware)
    async post(@Body() process: IProcess) {
        const data = await this.dataService.processService.createProcess(process);
        return data;
    }

    @Get("/process/graph/:id")
    async getGraph(@Param("id") id: number) {
        const data = await this.dataService.processService.getGraphData(id);
        return data;
    }

    @Get("/process/petri/:id")
    async getPetri(@Param("id") id: number) {
        const data = await this.dataService.processService.getPetriData(id);
        return data;
    }

    @Put("/process/:id")
     async put(@Param("id") id: number, @Body() process: IProcess) {
        const data = await this.dataService.processService.updateProcess(id, process);
        return data;
    }

    @Delete("/process/:id")
    remove(@Param("id") id: number, @Res() res: Response) {
        return this.dataService.processService.deleteProcess(id, res);
    }

}
