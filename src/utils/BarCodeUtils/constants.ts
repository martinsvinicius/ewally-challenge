import { PaymentTicketType } from '../../types/PaymentTicketType'

export const GOVERNMENT_CONSTANT_CODE = '8'

export type PaymentTicketTypeMap = {
  [key: string]: PaymentTicketType
}

export type Reference = {
  mod: 10
  isEffectiveAmount: true
}

export const paymentTicketTypeMap: PaymentTicketTypeMap = {
  '1': 'PREFEITURAS',
  '2': 'SANEAMENTO',
  '3': 'ENERGIA_ELETRICA_E_GAS',
  '4': 'TELECOMUNICACOES',
  '5': 'ORGAOS_GOVERNAMENTAIS',
  '6': 'CARNES_E_ASSEMELHADOS',
  '7': 'MULTAS_DE_TRANSITO',
}

export const effectiveAmountAndReferenceMap = {
  '6': {
    mod: 10,
    isEffectiveAmount: true,
  },
  '7': {
    mod: 10,
    isEffectiveAmount: false,
  },
  '8': {
    mod: 11,
    isEffectiveAmount: true,
  },
  '9': {
    mod: 11,
    isEffectiveAmount: false,
  },
  defaultValue: {
    mod: 10,
    isEffectiveAmount: false,
  },
}
