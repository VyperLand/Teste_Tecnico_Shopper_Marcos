import { MeasureService } from "../services/MeasureServices";
import { GeminiServices } from "../services/GeminiServices";
import { Response, Request } from "express";
import { Utils } from "../utils/utils";
import {CadastraMeasureDTO, validadeCadastraMeasureDTO} from "../DTO/CadastraMeasureDTO";
import { MeasureDTO } from "../DTO/MeasureDTO";

import {v4} from 'uuid';
import { Model } from "sequelize";

const measureServices = new MeasureService();
const geminiServices = new GeminiServices();

export class MeasureController{
    /**
     *
     */
    constructor() {

    }

    async uploadMeasure(req: Request, res: Response){
        try {
            var body = req.body;

            const bodyValidate = await validadeCadastraMeasureDTO(body);

            if(bodyValidate.isValid){

                var measure_value:number = 0;

                const imageBase64: string = body.image;
                const imageBase64Valid = await Utils.validateBase64Image(imageBase64);

                if(!imageBase64Valid.isValid){
                    res.status(400).send({error_code: "INVALID_DATA", error_description: "Imagem em formato invalido"});
                }

                const nameImage: string = body.customer_code + "-" + body.measure_type  + "-" + body.measure_datetime.substr(0,10) + "medicao." + (imageBase64Valid.mimeType || ".png");
                
                
                measure_value = await geminiServices.uploadImage_Get_Output(imageBase64,nameImage,(imageBase64Valid.mimeType || ".png"));

                const imageUrl = `${req.protocol}://${req.get('host')}/images/${nameImage}`;

                const measure: MeasureDTO = {
                    ...body,
                    measure_value: measure_value,
                    measure_confirmed: false,
                    image_url: imageUrl,
                    id: v4()
                }

                const measure_cadastrado = await measureServices.insertMeasure(measure);

                res.status(200).send({measure_cadastrado});
            }else{
                res.status(400).send({error_code: "INVALID_DATA", error_description: bodyValidate.erros});
            }

        } catch (error) {
            res.status(500).send({message: 'Erro interno do servidor'});
        }
    }

    async updateMeasure(req: Request, res: Response){
        try {
            const body = req.body;

            const measure: any = await measureServices.getMeasureByID(body.measure_uuid);

            if(measure != null){
                if(!measure.measure_confirmed){

                    measure.measure_value = body.confirmed_value;
                    measure.measure_confirmed = true;

                    const responseSave = await measure.save();
                    
                    console.log(responseSave);

                    if(responseSave){
                        res.status(200).send({success: true});
                    }else{
                        res.status(500).send({success: false, message: "Erro interno do servidor"});
                    }


                }else{
                    res.status(409).send({error_code: "CONFIRMATION_DUPLICATE",error_description: "Leitura do mês já realizada"});
                }
            }else{
                res.status(404).send({error_code: "MEASURE_NOT_FOUND", error_description: "Leitura do mês não encontrada"});
            }
            
        } catch (error) {
            console.log(error);
            res.status(400).send({});
        }
    }

    async getAllMeasure(req: Request, res: Response){
        try {
            const { customer_code } = req.params;

            const {measure_type} = req.query;

            var filter: {customer_code: string, measure_type?:string};

            filter = {customer_code}

            if(measure_type){
                filter.measure_type = measure_type.toString().toUpperCase();
            }
            
            const measures = await measureServices.getByFilter_Customer_Code(filter);

            res.status(200).send(measures);
        } catch (error) {
            res.status(400).send({});
        }
    }
}