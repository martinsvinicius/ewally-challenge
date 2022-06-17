import { AppError } from '../../errors/AppError'
import { validateVerificationDigitForMod10 } from './ModUtils'

export const validateBankDigitableCode = (digitableBarCode: string) => {
  const digitableLength = digitableBarCode.length

  if (digitableLength !== 47) {
    throw new AppError(
      'A linha digitável do boleto de cobrança deve ter 47 caracteres'
    )
  }

  if (!validateVerificationDigitForMod10(digitableBarCode)) {
    throw new AppError('O dígito verificador da linha digitável é inválido')
  }
}

export const getBarCodeFromBankPaymentTicket = (digitableBarCode: string) => {
  const barCode =
    digitableBarCode.substring(0, 4) +
    digitableBarCode.substring(32, 33) +
    digitableBarCode.substring(33) +
    digitableBarCode.substring(4, 9) +
    digitableBarCode.substring(10, 20) +
    digitableBarCode.substring(21, 31)

  return barCode
}
