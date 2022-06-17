import { AppError } from '../errors/AppError'
import {
  getBarCodeFromBankPaymentTicket,
  validateBankDigitableCode,
} from '../utils/BarCodeUtils/BankPaymentTicketUtils'

describe('BankPaymentTicketUtils tests', () => {
  it('should validate digitable line correctly', () => {
    const nonNumberDigitable = 'abcdefghijklmnopqrstuvwxyz'
    expect(() => validateBankDigitableCode(nonNumberDigitable)).toThrowError(
      AppError
    )

    const digitableWithWrongLength = '21290001192110001210904475617'
    expect(() =>
      validateBankDigitableCode(digitableWithWrongLength)
    ).toThrowError(AppError)

    const digitableWithWrongDV =
      '21290001132110001210904475617405975870000002000'
    expect(() => validateBankDigitableCode(digitableWithWrongDV)).toThrowError(
      AppError
    )

    const correctDigitable = '21290001192110001210904475617405975870000002000'
    expect(() => validateBankDigitableCode(correctDigitable)).not.toThrow()
  })

  it('should get bar code from bank payment digitable line correctly', () => {
    const digitable = '21290001192110001210904475617405975870000002000'
    const expectedBarCode = '21299758700000020000001121100012100447561740'

    const result = getBarCodeFromBankPaymentTicket(digitable)

    expect(result).toBe(expectedBarCode)
  })
})
