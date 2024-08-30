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

    static async convertImageToBase64(): Promise<string>{
        
        const imagePath = './medidor.png';

        const image = fs.readFileSync(imagePath);
        
        
        const base64String = image.toString('base64');

        return base64String;
    }

    static async validateBase64Image(base64: string): Promise<{ isValid: boolean, mimeType?: string }> {
        // Decodifica a string Base64 para um Buffer
        const buffer = Buffer.from(base64, 'base64');
    
        // Função auxiliar para identificar o tipo de imagem a partir dos primeiros bytes
        const getMimeType = (buffer: Buffer): string | undefined => {
            const signatures: { [key: string]: string } = {
                '89504E47': 'png', // PNG
                'FFD8FF': 'jpeg', // JPEG
                '47494638': 'gif', // GIF
                '424D': 'bmp', // BMP
                '52494646': 'webp', // WEBP
            };
    
            // Converte os primeiros bytes do buffer para hexadecimal
            const header = buffer.toString('hex', 0, 4).toUpperCase();
    
            // Busca a assinatura correspondente
            for (const [signature, mimeType] of Object.entries(signatures)) {
                if (header.startsWith(signature)) {
                    return mimeType;
                }
            }
    
            return undefined;
        };
    
        // Verifica o tipo da imagem
        const mimeType = getMimeType(buffer);
    
        // Retorna se é válido e o tipo MIME
        if (mimeType) {
            return { isValid: true, mimeType };
        } else {
            return { isValid: false };
        }
    }

}