import { OrderModule } from "@modules/orders/order.module";
import { Module } from "@nestjs/common";
import { MoMoController } from "./controllers/momo.controller";
import { MoMoService } from "./services/momo/momo.service";

@Module({
  imports: [
    OrderModule
  ],
  controllers: [MoMoController],
  providers: [
    {
      provide: 'IMoMoService',
      useClass: MoMoService
    }
  ],
  exports: [
    'IMoMoService'
  ]
})
export class ExternalModule {}