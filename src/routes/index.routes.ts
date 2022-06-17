import { Router } from 'express'
import { ReadDigitableBarCodeController } from '../controllers/ReadDigitableBarCodeController'

export const router = Router()

router.get('/boleto/:digitableBarCode', ReadDigitableBarCodeController.handle)
