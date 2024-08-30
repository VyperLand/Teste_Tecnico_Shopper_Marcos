import { Request, Response, Router } from "express";
import { MeasureController } from "../controllers/MeasureController";

const router: Router = Router();
const measureController = new MeasureController();

router.post('/upload', (req: Request, res: Response)=> measureController.uploadMeasure(req, res));
router.patch('/confirm', (req: Request, res: Response)=> measureController.updateMeasure(req, res));
router.get('/:customer_code/list', (req: Request, res: Response)=> measureController.getAllMeasure(req,res));

export default router;