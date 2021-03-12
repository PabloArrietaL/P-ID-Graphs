import { Container } from 'typescript-ioc';
import {
  JsonController,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Res,
} from 'routing-controllers';
import { DataService } from '../services/data.service';
import { Response } from 'express';
import { IProcessDetail } from '../models/interfaces/IProcessDetail';

@JsonController()
export class ProcessDetailController {
  public dataService: DataService;
  constructor() {
    this.dataService = Container.get(DataService);
  }

  @Get('/process-detail/:id')
  async getAll(@Param('id') id: number) {
    const data = await this.dataService.processDetailService.getAllDetails(id);
    return data;
  }

  @Get('/process-detail/:id/:type')
  async getByType(@Param('id') id: number, @Param('type') type: string) {
    const data = await this.dataService.processDetailService.getByType(
      id,
      type
    );
    return data;
  }

  @Post('/process-detail')
  async post(@Body() detail: IProcessDetail, @Res() res: Response) {
    const data = await this.dataService.processDetailService.createDetail(
      detail,
      res
    );
    return data;
  }

  @Delete('/process-detail/:id')
  remove(@Param('id') id: number, @Res() res: Response) {
    return this.dataService.processDetailService.deleteDetail(id, res);
  }
}
