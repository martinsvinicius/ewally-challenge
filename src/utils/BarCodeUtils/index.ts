import { AppError } from '../../errors/AppError'
import { PaymentTicketType } from '../../types/PaymentTicketType'
import {
  getBarCodeFromBankPaymentTicket,
  validateBankDigitableCode,
} from './BankPaymentTicketUtils'
import {
  effectiveAmountAndReferenceMap,
  GOVERNMENT_CONSTANT_CODE,
  paymentTicketTypeMap,
  Reference,
} from './constants'
import {
  getBarCodeFromGovernmentPaymentTicket,
  validateGovernmentDigitableCode,
} from './GovernmentPaymentTicketUtils'

export const digitableCodeToBarCode = (
  digitableBarCode: string,
  type: PaymentTicketType
) => {
  let barCode = ''

  if (type === 'BANCO' || type === 'OUTROS') {
    barCode = getBarCodeFromBankPaymentTicket(digitableBarCode)
  } else {
    barCode = getBarCodeFromGovernmentPaymentTicket(digitableBarCode)
  }

  if (barCode.length !== 44) {
    throw new Error('Ocorreu um erro ao tentar gerar o código de barras')
  }

  return barCode
}

export const getPaymentTicketType = (
  digitableCode: string
): PaymentTicketType => {
  const productId = digitableCode.substring(0, 1)

  if (productId !== GOVERNMENT_CONSTANT_CODE) return 'BANCO'

  const segmentId = digitableCode.substring(1, 2)

  return paymentTicketTypeMap[segmentId] || 'OUTROS'
}

export const getPaymentTicketAmount = (
  digitableCode: string,
  type: PaymentTicketType
) => {
  if (type === 'BANCO' || type === 'OUTROS') {
    const amountInCents = digitableCode.substring(37)
    const finalAmount = Number(amountInCents) / 100

    return finalAmount.toFixed(2)
  }

  const { isEffectiveAmount } = getEffectiveAmountOrReference(digitableCode)

  if (!isEffectiveAmount) return '0'

  const firstAmountSection = digitableCode.slice(4, 11)
  const secondAmountSection = digitableCode.slice(12, 16)
  const amountInCents = firstAmountSection + secondAmountSection

  const finalAmount = Number(amountInCents) / 100

  return finalAmount.toFixed(2)
}

export const getEffectiveAmountOrReference = (
  digitableCode: string
): Reference => {
  const reference = digitableCode.substring(2, 3)

  return (
    effectiveAmountAndReferenceMap[reference] ||
    effectiveAmountAndReferenceMap.defaultValue
  )
}

export const validateDigitableCode = (digitableBarCode: string) => {
  const regex = /[^0-9]/g // regex to find non-numeric characters

  const replacedDigitable = digitableBarCode.replace(regex, '')

  if (!replacedDigitable) {
    throw new AppError('Linha digitável inválida')
  }

  const firstDigit = replacedDigitable.substring(0, 1)

  if (firstDigit === GOVERNMENT_CONSTANT_CODE) {
    validateGovernmentDigitableCode(replacedDigitable)
  } else {
    validateBankDigitableCode(replacedDigitable)
  }

  return replacedDigitable
}
