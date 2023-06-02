import { ApiProperty } from "@nestjs/swagger";

export class DeleteProductDTO {
    @ApiProperty({
        name: 'id',
        example: 'ff852415-ff06-47d3-a33b-4ad4782cc664'
    })
    id: string;
}