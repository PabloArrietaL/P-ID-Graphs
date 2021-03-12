import { Container } from 'typescript-ioc';
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  UseBefore,
  Res,
} from 'routing-controllers';
import { DataService } from '../services/data.service';
import { IProcess } from '../models/interfaces/IProcess';
import { ProcessMiddleware } from '../middlewares/process.middleware';
import { Response } from 'express';

@JsonController()
export class ProcessController {
  public dataService: DataService;
  constructor() {
    this.dataService = Container.get(DataService);
  }

  @Get('/process')
  async getAll() {
    const data = await this.dataService.processService.getAllProcess();
    return data;
  }

  @Post('/process')
  @UseBefore(ProcessMiddleware)
  async post(@Body() process: IProcess, @Res() res: Response) {
    const data = await this.dataService.processService.createProcess(
      process,
      res
    );
    return data;
  }

  @Get('/process/:id')
  async getGraph(@Param('id') id: number) {
    const data = await this.dataService.processService.getGraphData(id);
    return data;
  }

  @Put('/process/:id')
  put(
    @Param('id') id: number,
    @Body() process: IProcess,
    @Res() res: Response
  ) {
    return this.dataService.processService
      .updateProcess(id, process, res)
      .then((data) => {
        return data;
      });
  }

  @Delete('/process/:id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.dataService.processService.deleteProcess(id, res);
  }
}
