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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureService = void 0;
const models_1 = __importDefault(require("../database/models"));
const MeasureCadastradoDTO_1 = require("../DTO/MeasureCadastradoDTO");
class MeasureService {
    /**
     *
     */
    constructor() {
        this.modelName = 'Measure';
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.default[this.modelName].findAll();
        });
    }
    getMeasureByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield models_1.default[this.modelName].findByPk(id);
        });
    }
    getByFilter_Customer_Code(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const measures = yield models_1.default[this.modelName].findAll({
                where: filter,
                attributes: {
                    exclude: ['image', 'createdAt', 'updatedAt', 'deletedAt']
                }
            });
            const measuresData = measures.map((measure) => measure.dataValues);
            return { measuresData };
        });
    }
    insertMeasure(cadastrarMeasureDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            //Inserir medição
            try {
                const newMeasure = yield models_1.default[this.modelName].create(cadastrarMeasureDTO);
                const retorno = (0, MeasureCadastradoDTO_1.mapMeasureCadastradoDTO)(newMeasure);
                return retorno;
            }
            catch (error) {
                console.log(error);
            }
            return null;
        });
    }
    updateMeasureById(measure, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listadeRegistrosAtualizados = yield models_1.default[this.modelName].update(measure, {
                    where: {
                        id
                    }
                });
                console.log(listadeRegistrosAtualizados);
                if (listadeRegistrosAtualizados[0] === 0) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    }
}
exports.MeasureService = MeasureService;
