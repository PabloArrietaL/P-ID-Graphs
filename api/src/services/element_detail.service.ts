import { getManager, UpdateResult } from "typeorm";
import { ElementDetail } from "../models/entities/ElementDetail";
import { Singleton } from "typescript-ioc";
import { IElementDetail } from "../models/interfaces/IElementDetail";
import { IElement } from "../models/interfaces/IElement";

@Singleton 
export class ElementDetailService{

    async createDetail(element: IElement): Promise<ElementDetail>{

        const detail: IElementDetail = {
            element: element,
            first_status: {},
            second_status: {}
        };


        if(element.third_status !== undefined) {
            detail.first_status = {
                second_status: {
                    checked: false,
                    status: {}
                },
                third_status: {
                    checked: false,
                    status: {}
                }
            },
            detail.second_status = {
                first_status: {
                    checked: false,
                    status: {}
                },
                third_status: {
                    checked: false,
                    status: {}
                }
            },
            detail.third_status = {
                first_status: {
                    checked: false,
                    status: {}
                },
                second_status: {
                    checked: false,
                    status: {}
                }
            }
        } else {
            detail.first_status = {
                second_status: {
                    checked: false,
                    status: {}
                }
            },
            detail.second_status = {
                first_status: {
                    checked: false,
                    status: {}
                }
            }
        }

        const data = await getManager().getRepository(ElementDetail).save(detail);
        return data;
    }
    
    updateDetail(id: number, detail: IElementDetail): Promise<UpdateResult> {
        return getManager().getRepository(ElementDetail).update({ id: id }, detail);
    }
    
}