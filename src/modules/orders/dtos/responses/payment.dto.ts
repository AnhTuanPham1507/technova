import { AbstractDTO } from "@common/dtos/abstract.dto";
import { PaymentEntity } from "@modules/orders/database/entities/payment.entity";
import { ApiProperty } from "@nestjs/swagger";


export class PaymentDTO extends AbstractDTO{

    @ApiProperty({
        name: 'momoId'
    })
    momoId: number;

   constructor(payment: PaymentEntity){
    super(payment);
    this.momoId = payment.momoId;
   }
}
