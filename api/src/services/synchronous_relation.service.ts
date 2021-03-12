import { getManager, getRepository } from 'typeorm';
import { Singleton } from 'typescript-ioc';
import { Response } from 'express';
import { ISynchronousRelation } from '../models/interfaces/ISynchronousRelation';
import { SynchronousRelation } from '../models/entities/SynchronousRelation';

@Singleton
export class SynchronousRelationService {
  async createSynchronous(
    synchronous: ISynchronousRelation,
    res: Response
  ): Promise<Response<any>> {
    try {
      await getManager().getRepository(SynchronousRelation).save(synchronous);
      return res.status(200).json({ message: 'Relación creada correctamente' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Ha ocurrido un error', data: error.message });
    }
  }

  async getAllSynchronous(id: number): Promise<SynchronousRelation[]> {
    const query = await getRepository(SynchronousRelation)
      .createQueryBuilder('synchronous')
      .where('synchronous.process = :process')
      .leftJoinAndSelect('synchronous.process', 'process')
      .leftJoinAndSelect('synchronous.initial_controlled', 'initial_controlled')
      .leftJoinAndSelect('synchronous.end_controlled', 'end_controlled')
      .setParameter('process', id)
      .getMany();

    return query;
  }

  deleteSynchronous(id: number, res: Response): Promise<Response> | Response {
    return getManager()
      .getRepository(SynchronousRelation)
      .delete({ id: id })
      .then((data) => {
        return res.status(200).json({ message: 'Relación eliminada' });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: 'Ha ocurrido un error', data: error });
      });
  }
}
