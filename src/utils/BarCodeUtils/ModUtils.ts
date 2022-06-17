export const validateVerificationDigitForMod11 = (digitableBarCode: string) => {
  const fields = {
    first: digitableBarCode.substring(0, 11),
    second: digitableBarCode.substring(12, 23),
    third: digitableBarCode.substring(24, 35),
    fourth: digitableBarCode.substring(36, 47),
  }

  const digits = {
    first: Number(digitableBarCode.substring(11, 12)),
    second: Number(digitableBarCode.substring(23, 24)),
    third: Number(digitableBarCode.substring(35, 36)),
    fourth: Number(digitableBarCode.substring(47, 48)),
  }

  const modules = {
    first: mod11Calculation(fields.first),
    second: mod11Calculation(fields.second),
    third: mod11Calculation(fields.third),
    fourth: mod11Calculation(fields.fourth),
  }

  // compare modules with digits
  let isValid = true
  Object.keys(digits).forEach((key) => {
    if (digits[key] !== modules[key]) {
      isValid = false
    }
  })

  return isValid
}

export const validateVerificationDigitForMod10 = (digitableBarCode: string) => {
  const fields = {
    first:
      digitableBarCode.substring(0, 9) +
      mod10Calculation(digitableBarCode.substring(0, 9)),
    second:
      digitableBarCode.substring(10, 20) +
      mod10Calculation(digitableBarCode.substring(10, 20)),
    third:
      digitableBarCode.substring(21, 31) +
      mod10Calculation(digitableBarCode.substring(21, 31)),
    fourth: digitableBarCode.substring(32, 33),
    fifth: digitableBarCode.substring(33),
  }

  const result = Object.values(fields).join('')

  return result === digitableBarCode
}

export const mod10Calculation = (value: string) => {
  let multiplier = 2
  let sum = 0
  let numbersToSum = ''

  for (let i = value.length - 1; i >= 0; i--) {
    numbersToSum = multiplier * Number(value[i]) + numbersToSum

    if (--multiplier < 1) {
      multiplier = 2
    }
  }

  for (let i = 0; i < numbersToSum.length; i++) {
    sum += Number(numbersToSum[i])
  }

  sum = sum % 10

  if (sum !== 0) {
    sum = 10 - sum
  }

  return sum
}

export const mod11Calculation = (value: string) => {
  let sequence = [4, 3, 2, 9, 8, 7, 6, 5]
  let digit = 0
  let DAC = 0

  let j = 0

  for (let i = 0; i < value.length; i++) {
    const multiplier = sequence[j]

    j++
    j %= sequence.length

    digit += Number(value[i]) * multiplier
  }

  DAC = digit % 11

  if (DAC === 0 || DAC === 1) return 0
  if (DAC === 10) return 1

  return 11 - DAC
}
