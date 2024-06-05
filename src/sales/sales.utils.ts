// src/sales/sales.utils.ts
import { Sale } from  './entities/sale.entity';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';
import { ResponseSaleDetailDto } from 'src/sale-details/dto/response-sale-detail.dto';
import { ResponseSaleDto } from './dto/response-sale.dto';
export function toSaleDTO(sale: Sale): ResponseSaleDto {
    return {
        id: sale.id,
        totalValue: sale.totalValue,
        saleDetails: sale.saleDetails.map(toSaleDetailDTO)
    };
}

export function toSaleDetailDTO(detail: SaleDetail): ResponseSaleDetailDto {
    return {
        id: detail.id,
        productId: detail.product.id,
        quantity: detail.quantity,
        unitValue: detail.unitValue,
        subtotal: detail.subtotal
    };
}
