"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureController = void 0;
const MeasureServices_1 = require("../services/MeasureServices");
const GeminiServices_1 = require("../services/GeminiServices");
const utils_1 = require("../utils/utils");
const CadastraMeasureDTO_1 = require("../DTO/CadastraMeasureDTO");
const uuid_1 = require("uuid");
const measureServices = new MeasureServices_1.MeasureService();
const geminiServices = new GeminiServices_1.GeminiServices();
class MeasureController {
    /**
     *
     */
    constructor() {
    }
    uploadMeasure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var body = req.body;
                const bodyValidate = yield (0, CadastraMeasureDTO_1.validadeCadastraMeasureDTO)(body);
                if (bodyValidate.isValid) {
                    var measure_value = 0;
                    const imageBase64 = body.image;
                    const imageBase64Valid = yield utils_1.Utils.validateBase64Image(imageBase64);
                    if (!imageBase64Valid.isValid) {
                        res.status(400).send({ error_code: "INVALID_DATA", error_description: "Imagem em formato invalido" });
                    }
                    const nameImage = body.customer_code + "-" + body.measure_type + "-" + body.measure_datetime.substr(0, 10) + "medicao." + (imageBase64Valid.mimeType || ".png");
                    measure_value = yield geminiServices.uploadImage_Get_Output(imageBase64, nameImage);
                    const imageUrl = `${req.protocol}://${req.get('host')}/images/${nameImage}`;
                    const measure = Object.assign(Object.assign({}, body), { measure_value: measure_value, measure_confirmed: false, image_url: imageUrl, id: (0, uuid_1.v4)() });
                    const measure_cadastrado = yield measureServices.insertMeasure(measure);
                    res.status(200).send({ measure_cadastrado });
                }
                else {
                    res.status(400).send({ error_code: "INVALID_DATA", error_description: bodyValidate.erros });
                }
            }
            catch (error) {
                res.status(500).send({ message: 'Erro interno do servidor' });
            }
        });
    }
    updateMeasure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const measure = yield measureServices.getMeasureByID(body.measure_uuid);
                if (measure != null) {
                    if (!measure.measure_confirmed) {
                        measure.measure_value = body.confirmed_value;
                        measure.measure_confirmed = true;
                        const responseSave = yield measure.save();
                        console.log(responseSave);
                        if (responseSave) {
                            res.status(200).send({ success: true });
                        }
                        else {
                            res.status(500).send({ success: false, message: "Erro interno do servidor" });
                        }
                    }
                    else {
                        res.status(409).send({ error_code: "CONFIRMATION_DUPLICATE", error_description: "Leitura do mês já realizada" });
                    }
                }
                else {
                    res.status(404).send({ error_code: "MEASURE_NOT_FOUND", error_description: "Leitura do mês não encontrada" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(400).send({});
            }
        });
    }
    getAllMeasure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer_code } = req.params;
                const { measure_type } = req.query;
                var filter;
                filter = { customer_code };
                if (measure_type) {
                    filter.measure_type = measure_type.toString().toUpperCase();
                }
                const measures = yield measureServices.getByFilter_Customer_Code(filter);
                console.log(measures);
                res.status(200).send(measures);
            }
            catch (error) {
                res.status(400).send({});
            }
        });
    }
}
exports.MeasureController = MeasureController;
