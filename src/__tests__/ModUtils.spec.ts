import {
  mod10Calculation,
  mod11Calculation,
} from '../utils/BarCodeUtils/ModUtils'

describe('ModUtils tests', () => {
  it('should calculate DV with mod 10 correctly', () => {
    const field = '001905009'
    const expectedDigit = 5

    const result = mod10Calculation(field)

    expect(result).toBe(expectedDigit)
  })

  it('should calculate DV with mod 11 correctly', () => {
    const field = '81800000000'
    const expectedDigit = 4

    const result = mod11Calculation(field)

    expect(result).toBe(expectedDigit)
  })
})
