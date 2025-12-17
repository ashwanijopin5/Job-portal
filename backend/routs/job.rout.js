import express from "express"


import { getAdminjobs, getAllJob, getJObById, postJob } from "../controllers/job.controllers.js"
import isAuthanticated from "../middlewares/isAuthanticated.js"
const router=express.Router()


router.route("/post").post(isAuthanticated,postJob)
router.route("/get").get(getAllJob)
router.route("/getadminjobs").get(isAuthanticated,getAdminjobs)
router.route("/get/:id").get(isAuthanticated,getJObById)



export default router