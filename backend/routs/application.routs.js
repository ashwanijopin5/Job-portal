import express from "express"
import { applyjob, getApplicant, getAppliedjobs, updateStatus } from "../controllers/appliaction.controllers.js"
import isAuthanticated from "../middlewares/isAuthanticated.js"
const router=express.Router()


router.route("/apply/:id").get(isAuthanticated,applyjob)
router.route("/get").get(isAuthanticated,getAppliedjobs)
router.route("/:id/applicant").get(isAuthanticated,getApplicant)
router.route("/status/:id/update").post(isAuthanticated,updateStatus)

export default router

