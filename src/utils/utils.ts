import fs from 'fs';
import path from 'path'

export class Utils{
    static async  convertBase64ToImage(image64: string, nameImage: string): Promise<string>{
        const base64Image = image64;

        const filePath = './temp_img/' + nameImage;

        fs.writeFile(filePath,base64Image,'base64', (err)=>{
            if(err){
                console.log(err);
                //tratar erro da escrita
                return ""
            }
        });

        return filePath;
    }

    static async validateBase64Image(base64: string): Promise<{ isValid: boolean, mimeType?: string }> {
        
        const buffer = Buffer.from(base64, 'base64');
    
        
        const getMimeType = (buffer: Buffer): string | undefined => {
            const signatures: { [key: string]: string } = {
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
        } else {
            return { isValid: false };
        }
    }

}