import { AppError } from '../errors/AppError'
import {
  getPaymentTicketAmount,
  getPaymentTicketType,
} from '../utils/BarCodeUtils'

describe('BarCodeUtils tests', () => {
  it('should get the payment ticket amount from bank payments correctly', () => {
    const digitable = '21290001192110001210904475617405975870000002000'
    const type = getPaymentTicketType(digitable)

    const result = getPaymentTicketAmount(digitable, type)

    expect(result).toBe('20.00')
  })

  it('should get the payment ticket amount from government payments correctly', () => {
    const digitable = '818000000004651928332023206020000008005739093852'
    const type = getPaymentTicketType(digitable)

    const result = getPaymentTicketAmount(digitable, type)

    expect(result).toBe('65.19')
  })
})
