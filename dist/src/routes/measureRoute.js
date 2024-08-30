"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MeasureController_1 = require("../controllers/MeasureController");
const router = (0, express_1.Router)();
const measureController = new MeasureController_1.MeasureController();
router.post('/upload', (req, res) => measureController.uploadMeasure(req, res));
router.patch('/confirm', (req, res) => measureController.updateMeasure(req, res));
router.get('/:customer_code/list', (req, res) => measureController.getAllMeasure(req, res));
exports.default = router;
