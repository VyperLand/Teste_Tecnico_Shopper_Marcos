import { Model, where } from "sequelize";

import db from '../database/models';
import {CadastraMeasureDTO} from "../DTO/CadastraMeasureDTO";
import {mapMeasureCadastradoDTO, MeasureCadastradoDTO} from "../DTO/MeasureCadastradoDTO";
import { MeasureDTO } from "../DTO/MeasureDTO";

export class MeasureService{
    modelName: string;
    /**
     *
     */
    constructor() {
        this.modelName = 'Measure'
    }

    async getAll():Promise<Array<Model> | null>{
        return await db[this.modelName].findAll();
    }

    async getMeasureByID(id: string): Promise<Model | null>{
        return await db[this.modelName].findByPk(id);
    }

    async getByFilter_Customer_Code(filter: {}): Promise<any>{
        const measures = await db[this.modelName].findAll({
            where: filter,
            attributes: {
                exclude: ['image', 'createdAt','updatedAt','deletedAt']
            }
        });

        const measuresData = measures.map((measure:any) => measure.dataValues);

        return {measuresData};
    }

    
    async insertMeasure(cadastrarMeasureDTO: CadastraMeasureDTO): Promise<MeasureCadastradoDTO | null>{
        //Inserir medição
        try {
            
            const newMeasure:MeasureDTO = await db[this.modelName].create(cadastrarMeasureDTO);
            const retorno: MeasureCadastradoDTO = mapMeasureCadastradoDTO(newMeasure);
            return retorno;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async updateMeasureById(measure: MeasureDTO,id: string): Promise<boolean>{
        try {
            const listadeRegistrosAtualizados = await db[this.modelName].update(
                measure,
                {
                    where: {
                        id
                    }
                }
            );

            console.log(listadeRegistrosAtualizados);
            if (listadeRegistrosAtualizados[0] === 0) {
                return false;
            }
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}