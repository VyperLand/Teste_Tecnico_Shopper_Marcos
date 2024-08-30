export interface MeasureDTO{
    id: string,
    measure_type: string,
    measure_datetime: Date,
    customer_code: string,
    image_url: string,
    measure_value: number,
    measure_confirmed: boolean,
    image: string
}