"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.CadastraMeasureDTO = void 0;
exports.mapCadastraMeasureDTO = mapCadastraMeasureDTO;
exports.validadeCadastraMeasureDTO = validadeCadastraMeasureDTO;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CadastraMeasureDTO {
}
exports.CadastraMeasureDTO = CadastraMeasureDTO;
__decorate([
    (0, class_validator_1.IsBase64)(),
    __metadata("design:type", String)
], CadastraMeasureDTO.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CadastraMeasureDTO.prototype, "customer_code", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CadastraMeasureDTO.prototype, "measure_datetime", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['WATER', 'GAS'], { message: 'O tipo de medição só pode ser WATER ou GAS' }),
    __metadata("design:type", String)
], CadastraMeasureDTO.prototype, "measure_type", void 0);
function mapCadastraMeasureDTO(obj) {
    return {
        image: obj.image,
        customer_code: obj.customer_code,
        measure_datetime: obj.measure_datetime,
        measure_type: obj.measure_type
    };
}
function validadeCadastraMeasureDTO(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const cadastraMeasureDTO = (0, class_transformer_1.plainToInstance)(CadastraMeasureDTO, obj);
        const errors = yield (0, class_validator_1.validate)(cadastraMeasureDTO);
        if (errors.length > 0) {
            errors.forEach(error => {
                console.log(`Erro na propriedade: ${error.property}`);
                console.log(`Valor recebido: ${error.value}`);
                if (error.constraints) {
                    for (const [constraint, message] of Object.entries(error.constraints)) {
                        console.log(`- Tipo de erro: ${constraint}`);
                        console.log(`- Mensagem: ${message}`);
                    }
                }
                console.log('---');
            });
        }
        else {
            console.log('Validação bem-sucedida:');
        }
        return { isValid: errors.length === 0, erros: errors };
    });
}
