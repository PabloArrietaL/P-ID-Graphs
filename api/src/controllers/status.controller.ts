import { Container } from 'typescript-ioc';
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Res,
} from 'routing-controllers';
import { DataService } from '../services/data.service';
import { IStatus } from '../models/interfaces/IStatus';
import { Response } from 'express';

@JsonController()
export class StatusController {
  public dataService: DataService;
  constructor() {
    this.dataService = Container.get(DataService);
  }

  @Get('/status')
  async getAll() {
    const data = await this.dataService.statusService.getAllStatus();
    return data;
  }

  @Post('/status')
  async post(@Body() status: IStatus, @Res() res: Response) {
    const data = await this.dataService.statusService.createStatus(status, res);
    return data;
  }

  @Put('/status/:id')
  async put(
    @Param('id') id: number,
    @Body() status: IStatus,
    @Res() res: Response
  ) {
    const data = await this.dataService.statusService.updateStatus(
      id,
      status,
      res
    );
    return data;
  }

  @Delete('/status/:id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.dataService.statusService.deleteStatus(id, res);
  }
}
