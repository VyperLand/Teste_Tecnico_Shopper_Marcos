import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { Utils } from "../utils/utils";


const ApiKey: string = process.env.GEMINI_API_KEY || "null";
const fileManager = new GoogleAIFileManager(ApiKey);

const genAI = new GoogleGenerativeAI(ApiKey);
const model = genAI.getGenerativeModel({model: "gemini-1.5-pro"})

export class GeminiServices{
    /**
     *
     */
    constructor() {
        
    }

    async uploadImage_Get_Output(imageBase64: string, imageName: string): Promise<number>{

        try {

            const filePath:string =  await Utils.convertBase64ToImage(imageBase64,imageName);

            const uploadResponse = await fileManager.uploadFile(filePath,{
                mimeType: "image/png",
                displayName: imageName
            });
            
            const getResponse = await fileManager.getFile(uploadResponse.file.name);

            if ((uploadResponse.file.displayName == getResponse.displayName) && (uploadResponse.file.uri == getResponse.uri)){
                console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
                console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);

                const result = await model.generateContent([
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

        } catch (error) {
            console.log(error);
            
        }

        

        return 0;
    }
    
}


