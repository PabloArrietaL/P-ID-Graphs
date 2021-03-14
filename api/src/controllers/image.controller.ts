import { Param, Get, Res, JsonController } from "routing-controllers";
import path from "path";
import { Response } from "express";
import fs from "fs-extra";

@JsonController()
export class ImageController {

    @Get("/image/:img")
    async getImage(@Param("img") img: string, @Res() res: Response) {
        let pathImage = path.resolve(__dirname, `../../uploads/${img}`);

        try {
            await new Promise((resolve, reject) => {
              if(fs.existsSync(pathImage)){
                res.status(200).sendFile(pathImage);
              }
              else {
                res.status(404).json({message: 'No se encontró la imagen'});
              }
              
            });
          } catch (error) {
            res.status(500).json({message: 'Ha ocurrido un error', data: error.message});
            // throw new Error('No se encontró la imagen');
          }

        return ;
    }


}
