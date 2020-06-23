import { Container } from "typescript-ioc";
import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { DataService } from "../services/data.service";
import { IProcess } from "../models/interfaces/IProcess";
import { ProcessMiddleware } from "../middlewares/process.middleware";

@JsonController()
export class ProcessController {

    public dataService: DataService
    constructor() {
        this.dataService = Container.get(DataService);
    }

    @Get("/api/process")
    async getAll() {
        const data = await this.dataService.processService.getAllProcess();
        return data;
    }

    @Post("/api/process")
    @UseBefore(ProcessMiddleware)
    async post(@Body() process: IProcess) {
        const data = await this.dataService.processService.createProcess(process);
        if (data.id) {
            return data.id;
        }
    }

    @Put("/api/process/:id")
    put(@Param("id") id: number, @Body() process: IProcess) {
        return this.dataService.processService.updateProcess(id, process).then( data => {
            return data;
        });
    }

    @Delete("/api/process/:id")
    remove(@Param("id") id: number) {
        return this.dataService.processService.deleteProcess(id).then( _ => {
            return true;
        });
    }

}
