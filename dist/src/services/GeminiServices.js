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
exports.GeminiServices = void 0;
const generative_ai_1 = require("@google/generative-ai");
const server_1 = require("@google/generative-ai/server");
const utils_1 = require("../utils/utils");
const ApiKey = process.env.GEMINI_API_KEY || "null";
const fileManager = new server_1.GoogleAIFileManager(ApiKey);
const genAI = new generative_ai_1.GoogleGenerativeAI(ApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
class GeminiServices {
    /**
     *
     */
    constructor() {
    }
    uploadImage_Get_Output(imageBase64, imageName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = yield utils_1.Utils.convertBase64ToImage(imageBase64, imageName);
                const uploadResponse = yield fileManager.uploadFile(filePath, {
                    mimeType: "image/png",
                    displayName: imageName
                });
                const getResponse = yield fileManager.getFile(uploadResponse.file.name);
                if ((uploadResponse.file.displayName == getResponse.displayName) && (uploadResponse.file.uri == getResponse.uri)) {
                    console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
                    console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);
                    const result = yield model.generateContent([
                        {
                            fileData: {
                                mimeType: uploadResponse.file.mimeType,
                                fileUri: uploadResponse.file.uri
                            }
                        },
                        { text: "Describe only the numeric value, no text of this meter in the image in the uri:" + getResponse.uri },
                    ]);
                    // Output the generated text to the console
                    console.log(result.response.text());
                    return Number(result.response.text());
                }
            }
            catch (error) {
                console.log(error);
            }
            return 0;
        });
    }
}
exports.GeminiServices = GeminiServices;
