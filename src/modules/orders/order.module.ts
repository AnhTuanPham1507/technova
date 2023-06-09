import { AuthModule } from "@modules/auth/auth.module";
import { ClientModule } from "@modules/clients/client.module";
import { MailModule } from "@modules/mail/mail.module";
import { NotificationModule } from "@modules/notification/notification.module";
import { ProductModule } from "@modules/products/product.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderController } from "./controllers/order.controller";
import { StatisticController } from "./controllers/statistic.controller";
import { OrderDetailEntity } from "./database/entities/order-detail.entity";
import { OrderEntity } from "./database/entities/order.entity";
import { PaymentEntity } from "./database/entities/payment.entity";
import { OrderDetailRepository } from "./database/repositories/order-detail.repository";
import { OrderRepository } from "./database/repositories/order.repository";
import { PaymentRepository } from "./database/repositories/payment.repository";
import { OrderService } from "./services/order.service";
import { PaymentService } from "./services/payment.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            OrderEntity,
            OrderDetailEntity,
            PaymentEntity
        ]),
        ProductModule,
        ClientModule,
        NotificationModule,
        MailModule,
        AuthModule
    ],
    controllers: [OrderController, StatisticController],
    providers: [
        {
            provide: 'IOrderRepository',
            useClass: OrderRepository
        },
        {
            provide: 'IOrderDetailRepository',
            useClass: OrderDetailRepository
        },
        {
            provide: 'IPaymentRepository',
            useClass: PaymentRepository
        },
        {
            provide: 'IOrderService',
            useClass: OrderService
        },
        {
            provide: 'IPaymentService',
            useClass: PaymentService
        },
    ],
    exports: [
        'IOrderRepository',
        'IOrderDetailRepository',
        'IPaymentRepository',
        'IOrderService',
        'IPaymentService'
    ]
})
export class OrderModule {}