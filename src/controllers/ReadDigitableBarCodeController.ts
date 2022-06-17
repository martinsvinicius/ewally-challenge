import { Request, Response } from 'express'
import { ReadDigitableBarCodeUseCase } from '../useCases/ReadDigitableBarCodeUseCase'

export class ReadDigitableBarCodeController {
  static async handle(req: Request, res: Response) {
    const { digitableBarCode } = req.params

    console.log(`Reading digitable bar code: ${digitableBarCode}`)

    const useCase = new ReadDigitableBarCodeUseCase()

    return res.json(useCase.execute(digitableBarCode))
  }
}
