import express from "express"
import { Company } from "../models/company.modal.js"
import { companyRegister,getCompany,getCompanyById,updateCompany } from "../controllers/company.controller.js"
import isAuthanticated from "../middlewares/isAuthanticated.js"
import { singleUpload } from "../middlewares/multer.js"
const router=express.Router()


router.route("/register").post(isAuthanticated,companyRegister)
router.route("/get").get(isAuthanticated,getCompany)
router.route("/get/:id").get(isAuthanticated,getCompanyById)
router.route("/update/:id").put(isAuthanticated,singleUpload ,updateCompany)

export default router

