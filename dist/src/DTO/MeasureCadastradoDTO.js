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
exports.MeasureCadastradoDTO = void 0;
exports.mapMeasureCadastradoDTO = mapMeasureCadastradoDTO;
exports.validadeMeasureCadastradoDTO = validadeMeasureCadastradoDTO;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class MeasureCadastradoDTO {
}
exports.MeasureCadastradoDTO = MeasureCadastradoDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MeasureCadastradoDTO.prototype, "image_url", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MeasureCadastradoDTO.prototype, "measure_value", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MeasureCadastradoDTO.prototype, "measure_uuid", void 0);
function mapMeasureCadastradoDTO(model) {
    return {
        image_url: model.image_url,
        measure_value: model.measure_value,
        measure_uuid: model.id
    };
}
function validadeMeasureCadastradoDTO(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDTO = (0, class_transformer_1.plainToInstance)(MeasureCadastradoDTO, obj);
        const errors = yield (0, class_validator_1.validate)(userDTO);
        return errors.length === 0;
    });
}
