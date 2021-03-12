import { Container } from 'typescript-ioc';
import { JsonController, Param, Body, Res, Put } from 'routing-controllers';
import { DataService } from '../services/data.service';
import { IElementDetail } from '../models/interfaces/IElementDetail';
import { Response } from 'express';

@JsonController()
export class ElementDetailController {
  public dataService: DataService;

  constructor() {
    this.dataService = Container.get(DataService);
  }

  @Put('/element-details/:id')
  put(
    @Param('id') id: number,
    @Body() detail: IElementDetail,
    @Res() res: Response
  ) {
    const data = this.dataService.elementDetailService.updateDetail(
      id,
      detail,
      res
    );
    return data;
  }
}
