import { AppError } from '../errors/AppError'
import {
  getBarCodeFromGovernmentPaymentTicket,
  validateGovernmentDigitableCode,
} from '../utils/BarCodeUtils/GovernmentPaymentTicketUtils'

describe('GovernmentPaymentTicketUtils tests', () => {
  it('should get bar code from government payment digitable line correctly', () => {
    const digitable = '818000000004651928332023206020000008005739093852'
    const expectedBarCode = '81800000000651928332022060200000000573909385'

    const result = getBarCodeFromGovernmentPaymentTicket(digitable)

    expect(result).toBe(expectedBarCode)
    expect(result.length).toBe(44)
  })

  it('should validate DV for government payment digitable line correctly', () => {
    const digitableWithWrongDV =
      '818000000004651928332023206020000008005739093859'

    expect(() =>
      validateGovernmentDigitableCode(digitableWithWrongDV)
    ).toThrowError(AppError)

    const digitableWithWrongLength = '818000000004651928332023206020000008005'

    expect(() =>
      validateGovernmentDigitableCode(digitableWithWrongLength)
    ).toThrowError(AppError)
  })
})
