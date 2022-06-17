import { getDateByDays } from '../utils/DateUtils'

import { ReadDigitableBarCodeResponse } from '../types/ReadDigitableBarCodeResponse'
import {
  digitableCodeToBarCode,
  getPaymentTicketAmount,
  getPaymentTicketType,
  validateDigitableCode,
} from '../utils/BarCodeUtils'
import { PaymentTicketType } from '../types/PaymentTicketType'

export class ReadDigitableBarCodeUseCase {
  execute(digitableBarCode: string) {
    const { validatedDigitable, type } = this.validate(digitableBarCode)

    const response: ReadDigitableBarCodeResponse = {
      barCode: this.extractBarCode(validatedDigitable, type),
      amount: this.extractAmount(validatedDigitable, type),
      expirationDate: this.extractExpirationDate(validatedDigitable, type),
    }

    return response
  }

  private validate(digitableBarCode: string) {
    const validatedDigitable = validateDigitableCode(digitableBarCode)
    const type = getPaymentTicketType(digitableBarCode)

    return {
      validatedDigitable,
      type,
    }
  }

  private extractAmount(digitableBarCode: string, type: PaymentTicketType) {
    return getPaymentTicketAmount(digitableBarCode, type)
  }

  private extractExpirationDate(
    digitableBarCode: string,
    type: PaymentTicketType
  ) {
    const startsAt = 33
    const endsAt = 37

    let expirationFactor = 0

    if (type === 'BANCO' || type === 'OUTROS') {
      expirationFactor = Number(digitableBarCode.substring(startsAt, endsAt))
    }

    return getDateByDays(expirationFactor)
  }

  private extractBarCode(digitableBarCode: string, type: PaymentTicketType) {
    return digitableCodeToBarCode(digitableBarCode, type)
  }
}
