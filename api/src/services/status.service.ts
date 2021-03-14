import { getManager } from 'typeorm';
import { Status } from '../models/entities/Status';
import { Singleton } from 'typescript-ioc';
import { Response } from 'express';
import { IStatus } from '../models/interfaces/IStatus';

@Singleton
export class StatusService {
  async createStatus(status: IStatus, res: Response): Promise<Response<any>> {
    try {
      await getManager()
        .getRepository(Status)
        .save(status);
      return res.status(200).json({ message: 'Estado creado correctamente' });
    } catch (error) {
      return res.status(500).json({
        message: 'Ya hay un estado con este nombre',
        data: error.message,
      });
    }
  }

  getAllStatus(): Promise<Status[]> {
    return getManager().getRepository(Status).find();
  }

  getByName(name: string) {
    return getManager()
      .getRepository(Status)
      .find({
        where: {
          name: name,
        },
      });
  }

  updateStatus(
    id: number,
    status: IStatus,
    res: Response
  ): Promise<Response<any>> {
    return getManager()
      .getRepository(Status)
      .update({ id: id }, status)
      .then(() => {
        return res
          .status(200)
          .json({ message: 'Estado actualizado correctamente' });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: 'Ha ocurrido un error', data: error.message });
      });
  }

  async deleteStatus(id: number, res: Response): Promise<Response> {
    try {
      await getManager().getRepository(Status).delete(id);
      return res
        .status(200)
        .json({ message: 'Estado eliminado correctamente' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'El estado se está utilizando actualmente' });
    }
  }
}
