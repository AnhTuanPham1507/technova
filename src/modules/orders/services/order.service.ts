import { Moment } from "@/utils/my-moment.util";
import { PageDTO } from "@common/dtos/responses/page.dto";
import { OrderStatusEnum } from "@constants/enums/order-status.enum";
import { RoleEnum } from "@constants/enums/role.enum";
import { AccountDTO } from "@modules/auth/dtos/responses/account.dto";
import { IEmployeeService } from "@modules/clients/services/employee.service";
import { IUserService } from "@modules/clients/services/user.service";
import { SendEmailPayloadDTO } from "@modules/mail/dtos/requests/send-email-payload.dto";
import { IMailService } from "@modules/mail/services/mail.service";
import { NotificationEntity } from "@modules/notification/database/entities/notification.entity";
import { CreateNotificationDTO } from "@modules/notification/dtos/requests/create-notification.dto";
import { INotificationService } from "@modules/notification/services/notification.service";
import { IProductPackageService } from "@modules/products/services/product-package.service";
import { EnvConfigService } from "@modules/shared/services/api-config.service";
import {  Inject, Injectable } from "@nestjs/common";
import { OrderDetailEntity } from "../database/entities/order-detail.entity";
import { OrderEntity } from "../database/entities/order.entity";
import { IOrderDetailRepository } from "../database/repositories/order-detail.repository";
import { IOrderRepository } from "../database/repositories/order.repository";
import { CreateOrderDTO } from "../dtos/requests/create-order.dto";
import { OrderPageOptionsDTO } from "../dtos/requests/order-page-options.dto";
import { UpdateOrderDTO } from "../dtos/requests/update-order.dto";
import { OrderDetailDTO } from "../dtos/responses/order-detail.dto";
import { OrderDTO } from "../dtos/responses/order.dto";


export interface IOrderService {
    getAll(pageOptionsDTO: OrderPageOptionsDTO): Promise<PageDTO<OrderDTO>>;
    create(createOrder: CreateOrderDTO,  account: AccountDTO): Promise<OrderDTO>;
    update(id: string, updateOrder: UpdateOrderDTO, account: AccountDTO): Promise<OrderDTO>;
    delete(id: string, userId: string): Promise<OrderDTO>;
    statistic();
}

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        @Inject('IOrderRepository')
        private readonly orderRepo: IOrderRepository,
        @Inject('IOrderDetailRepository')
        private readonly orderDetailRepo: IOrderDetailRepository,
        @Inject('IProductPackageService')
        private readonly productPackageService: IProductPackageService,
        @Inject('IEmployeeService')
        private readonly employeeService: IEmployeeService,
        @Inject('IUserService')
        private readonly userService: IUserService,
        @Inject('INotificationService')
        private readonly notificationService: INotificationService,
        private readonly configService: EnvConfigService,
        @Inject('IMailService')
        private readonly mailService: IMailService
    ){}
   


    async update(id: string, updateOrder: UpdateOrderDTO, account: AccountDTO): Promise<OrderDTO> {
        const foundOrder = await this.orderRepo.getById(id);

        foundOrder.isPaid = updateOrder.isPaid ? updateOrder.isPaid : foundOrder.isPaid;
        foundOrder.status = updateOrder.status ? updateOrder.status : foundOrder.status;
    
        foundOrder.updatedBy = account.id;

        const updatedOrder = await this.orderRepo.save(foundOrder);
        const detailsDTO = foundOrder.details.map(detail => new OrderDetailDTO(detail));

        const translateStatus = updatedOrder.status === OrderStatusEnum.failed ? 'Thất bại' : 
        updatedOrder.status === OrderStatusEnum.pending ? 'Chờ duyệt' : 'Thành công';
const translateIsPaid = updatedOrder.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'


        const contentNotification = 
        `<div>
            <p>
               Đơn hàng <strong><${updatedOrder.id}/strong> vừa cập nhật trạng thái đơn hàng  vào lúc <i>${Moment.getCurrentStringDate()}</i>.
            </p>           
            <p>Tình trạng đơn hàng: <i>${translateStatus} - ${translateIsPaid}</i></p>
        </div>`
        const updateOrderNotification = new CreateNotificationDTO(contentNotification);
        await this.notificationService.create(updateOrderNotification, account, foundOrder.user ? foundOrder.id: null);

        return  new OrderDTO(updatedOrder, detailsDTO);
    }


    getAll(pageOptionsDTO: OrderPageOptionsDTO): Promise<PageDTO<OrderDTO>>{
        return this.orderRepo.getAll(pageOptionsDTO);
    }

    async create(createOrder: CreateOrderDTO,  account: AccountDTO): Promise<OrderDTO> {
        let creatorName = '';
        const createOrderDetails = await Promise.all(
            createOrder.details.map(
                async detail => {
                    const createOrderDetail = new OrderDetailEntity();
                    createOrderDetail.price = detail.price;
                    createOrderDetail.productName = detail.productName;
                    createOrderDetail.quantity = detail.quantity;
                    createOrderDetail.createdBy = account.id;
                    createOrderDetail.updatedBy = account.id;
                    createOrderDetail.productPackage = await this.productPackageService.getById(detail.productPackageId);
                    return this.orderDetailRepo.save(createOrderDetail);
                }
            )
        )

        const order = new OrderEntity();
        order.customerName = createOrder.customerName;
        order.details = createOrderDetails;
        order.email = createOrder.email;
        order.phone = createOrder.phone;
        order.totalPrice = createOrderDetails.reduce((total, detail) => total + (detail.price * detail.quantity),0);
        
        if(account.role === RoleEnum.EMPLOYEE){
            order.employee = await this.employeeService.getEntityByAccountId(account.id);
            order.user = await this.userService.getEntityById(createOrder.userId);
            order.createdBy = account.id;
            order.updatedBy = account.id;

        }
        if(account.role === RoleEnum.USER){
            order.user = await this.userService.getEntityByAccountId(account.id);
            order.createdBy = account.id;
            order.updatedBy = account.id;
        }

        const createdOrder = await this.orderRepo.save(order);

        const orderDTO = new OrderDTO(
            createdOrder,
            createOrderDetails.map(
                detail => new OrderDetailDTO(detail)
            )
        )

        const translateStatus = order.status === OrderStatusEnum.failed ? 'Thất bại' : 
                order.status === OrderStatusEnum.pending ? 'Chờ duyệt' : 'Thành công';
        const translateIsPaid = order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'

        const contentNotification = 
        `<div>
            <p>
               Đơn hàng vừa tạo một đơn hàng vào lúc <i>${Moment.getCurrentStringDate()}</i>. Đơn hàng bảo gồm: 
            </p>        
            <ul style="padding-left: 10px">
                ${
                    createOrderDetails.map(detail => (
                        `<li><i>${detail.productName}</i> số lượng <i>${detail.quantity}</i></li>`
                        ))
                }
            </ul>
            <p>Tình trạng đơn hàng: <i>${translateStatus} - ${translateIsPaid}</i></p>
        </div>`
        const createOrderNotification = new CreateNotificationDTO(contentNotification);
        await this.notificationService.create(createOrderNotification, account, createdOrder.user ? createdOrder.user.id: null);

        const emailPayload = new SendEmailPayloadDTO(
            createOrder.email,
            this.configService.mailConfig.user,
            "Đơn đặt hàng mới",
            "create-order.hbs",
            {
                createdAt: Moment.getDateString(createdOrder.createdAt),
                customerName: createOrder.customerName, 
                phone: createOrder.phone, 
                email: createOrder.email, 
                orderId: createdOrder.id, 
                products: createOrderDetails, 
                status: translateStatus, 
                isPaid: translateIsPaid
            }
        )
        await this.mailService.sendMail(emailPayload);
        return orderDTO;
    }

    async delete(id: string, userId: string): Promise<OrderDTO>{
        const foundOrder = await this.orderRepo.getById(id);

        const foundOrderDetails = await this.orderDetailRepo.getByOrderId(id);

        const order = Object.assign(foundOrder,{
            deletedAt: Moment.getCurrentDate(),
            deletedBy:userId
        })
        const deletedDetailPromises = foundOrderDetails.map(
            detail => {
                const deletedDetail = Object.assign(detail,{
                    deletedAt: Moment.getCurrentDate(),
                    deletedBy:userId
                })
                return this.orderDetailRepo.save(deletedDetail);
            }
        )

        const deletedOrder = await this.orderRepo.save(order);
        const deletedOrderDetails = await Promise.all(deletedDetailPromises)

        const detailsDTO = deletedOrderDetails.map(detail => new OrderDetailDTO(detail));
        const orderDTO = new OrderDTO(deletedOrder, detailsDTO);

        return orderDTO;
    }

    async statistic(){
        const currentYear = Moment.getCurrentYear();
        const pastYear = currentYear - 1;
        const startTime = Moment.getStartTimeOfYear(pastYear);
        const endTime = Moment.getEndTimeOfYear(currentYear);
        
        const orders = await this.orderRepo.getAllByRangeTime(startTime, endTime);
        const revenue = { InThePast: 0, Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, June: 0, July: 0, Aug: 0, Sept: 0, Oct: 0, Nov: 0, Dec: 0 }
        
        orders.forEach(order => {
            const month = Moment.getMonthFromDate(order.createdAt)
            const year= Moment.getYearFromDate(order.createdAt)
            if (year !== currentYear){
                revenue.InThePast += order.totalPrice
            }
            else {
                revenue[month] += order.totalPrice
            }
        })

        return revenue
    }
}
