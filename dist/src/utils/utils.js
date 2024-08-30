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
exports.Utils = void 0;
const fs_1 = __importDefault(require("fs"));
class Utils {
    static convertBase64ToImage(image64, nameImage) {
        return __awaiter(this, void 0, void 0, function* () {
            const base64Image = image64;
            const filePath = './temp_img/' + nameImage;
            fs_1.default.writeFile(filePath, base64Image, 'base64', (err) => {
                if (err) {
                    console.log(err);
                    //tratar erro da escrita
                    return "";
                }
            });
            return filePath;
        });
    }
    static validateBase64Image(base64) {
        return __awaiter(this, void 0, void 0, function* () {
            const buffer = Buffer.from(base64, 'base64');
            const getMimeType = (buffer) => {
                const signatures = {
                    '89504E47': 'png', // PNG
                    'FFD8FF': 'jpeg', // JPEG
                    '47494638': 'gif', // GIF
                    '424D': 'bmp', // BMP
                    '52494646': 'webp', // WEBP
                };
                const header = buffer.toString('hex', 0, 4).toUpperCase();
                for (const [signature, mimeType] of Object.entries(signatures)) {
                    if (header.startsWith(signature)) {
                        return mimeType;
                    }
                }
                return undefined;
            };
            const mimeType = getMimeType(buffer);
            if (mimeType) {
                return { isValid: true, mimeType };
            }
            else {
                return { isValid: false };
            }
        });
    }
}
exports.Utils = Utils;
