import express from "express"
const userRouter = express.Router();

import {signUp,logIn,resetPassword,verifyAccount,updateAccount,deleteAccount} from "../controllers/usercontroller.js"

userRouter.post('/signup',signUp)

userRouter.post('/login',logIn)

userRouter.put('/resetpassword',resetPassword)

userRouter.post('/verify',verifyAccount)

userRouter.put('/update/:id',updateAccount)

userRouter.delete('/delete/:id',deleteAccount)

export default userRouter;