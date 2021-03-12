import { getManager, UpdateResult } from 'typeorm';
import { ElementDetail } from '../models/entities/ElementDetail';
import { Singleton } from 'typescript-ioc';
import { IElementDetail } from '../models/interfaces/IElementDetail';
import { IElement } from '../models/interfaces/IElement';
import { Response } from 'express';

@Singleton
export class ElementDetailService {
  async createDetail(element: IElement): Promise<ElementDetail> {
    const detail: IElementDetail = {
      element: element,
      first_status: {},
      second_status: {},
    };

    if (element.third_status !== undefined) {
      (detail.first_status = {
        second_status: {
          checked: false,
          status: {},
        },
        third_status: {
          checked: false,
          status: {},
        },
      }),
        (detail.second_status = {
          first_status: {
            checked: false,
            status: {},
          },
          third_status: {
            checked: false,
            status: {},
          },
        }),
        (detail.third_status = {
          first_status: {
            checked: false,
            status: {},
          },
          second_status: {
            checked: false,
            status: {},
          },
        });
    } else {
      (detail.first_status = {
        second_status: {
          checked: false,
          status: {},
        },
      }),
        (detail.second_status = {
          first_status: {
            checked: false,
            status: {},
          },
        });
    }

    const data = await getManager().getRepository(ElementDetail).save(detail);
    return data;
  }

  async updateDetail(
    id: number,
    detail: IElementDetail,
    res: Response
  ): Promise<Response<any>> {
    try {
      await getManager()
        .getRepository(ElementDetail)
        .update({ id: id }, detail);
      return res
        .status(200)
        .json({ message: 'Detalle actualizado correctamente' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Ha ocurrido un error', data: error.message });
    }
  }
}
