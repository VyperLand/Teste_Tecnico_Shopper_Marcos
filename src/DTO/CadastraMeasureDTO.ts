import { plainToInstance } from "class-transformer"
import { IsBase64, IsDate, IsDateString, IsIn, IsString, validate } from "class-validator"

export class CadastraMeasureDTO {
    @IsBase64()
    image!: string
    @IsString()
    customer_code!: string
    @IsDateString()
    measure_datetime!: Date
    @IsString()
    @IsIn(['WATER','GAS'], {message: 'O tipo de medição só pode ser WATER ou GAS'})
    measure_type!: string
}

export function mapCadastraMeasureDTO(obj:any){
    return {
        image: obj.image,
        customer_code: obj.customer_code,
        measure_datetime: obj.measure_datetime,
        measure_type: obj.measure_type
    }
}

export async function validadeCadastraMeasureDTO(obj:any): Promise<{ isValid: boolean, erros: any }>{
    
    const cadastraMeasureDTO = plainToInstance(CadastraMeasureDTO, obj);

    const errors = await validate(cadastraMeasureDTO);

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
      } else {
        console.log('Validação bem-sucedida:');
    }

    return {isValid: errors.length === 0, erros: errors};
}