import { IsNumber, IsString, IsUUID, validate } from "class-validator";
import { MeasureDTO } from "./MeasureDTO"
import { plainToInstance } from "class-transformer";

export class MeasureCadastradoDTO {
    @IsString()
    image_url!: string;
    @IsNumber()
    measure_value!: number
    @IsUUID()
    measure_uuid!: string
}

export function mapMeasureCadastradoDTO(model: MeasureDTO){
    return {
        image_url:model.image_url,
        measure_value: model.measure_value,
        measure_uuid: model.id
    }
}

export async function validadeMeasureCadastradoDTO(obj:any): Promise<boolean>{
    
    const userDTO = plainToInstance(MeasureCadastradoDTO, obj);

    const errors = await validate(userDTO);

    return errors.length === 0;
}