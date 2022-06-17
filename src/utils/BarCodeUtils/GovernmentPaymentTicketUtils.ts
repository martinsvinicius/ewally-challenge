import { getEffectiveAmountOrReference } from '.'
import { AppError } from '../../errors/AppError'
import {
  validateVerificationDigitForMod10,
  validateVerificationDigitForMod11,
} from './ModUtils'

export const getBarCodeFromGovernmentPaymentTicket = (
  digitableBarCode: string
) => {
  const digitableArray = digitableBarCode.split('')

  const digitsPositions = [11, 22, 33, 44]

  // remove the digits that are not part of the bar code
  digitsPositions.forEach((position) => {
    digitableArray.splice(position, 1)
  })

  const barCode = digitableArray.join('')

  return barCode
}

export const validateGovernmentDigitableCode = (digitableBarCode: string) => {
  if (digitableBarCode.length !== 48) {
    throw new AppError(
      'A linha digitável do pagamento de concessionárias deve conter 48 caracteres numéricos'
    )
  }

  if (!validateVerificationDigitForGovernmentDigitable(digitableBarCode)) {
    throw new AppError('O dígito verificador da linha digitável é inválido')
  }
}

export const validateVerificationDigitForGovernmentDigitable = (
  digitableBarCode: string
) => {
  const reference = getEffectiveAmountOrReference(digitableBarCode)

  if (reference.mod === 10) {
    return validateVerificationDigitForMod10(digitableBarCode)
  }

  return validateVerificationDigitForMod11(digitableBarCode)
}
