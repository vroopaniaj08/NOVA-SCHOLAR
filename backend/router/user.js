const express = require('express');
const {User,Role,User_role} = require('../models/index');
const router = express.Router()
const jwtobj = require('../config/jwt');
const transportRouter = require('./transportation')
const courseRouter = require('./course')
const admissionRouter = require('./admission_fee')
const roleRouter = require('./role')
const userRoleRouter = require('./user_role');
const { where } = require('sequelize');
const studentRouter = require('./student')
// const jwt = require('../config/jwt');
/**
 * @swagger
 * /user/save:
 *   post:
 *     summary: Create a new user and associated user role
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               created_by:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *               role_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     password:
 *                       type: string
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *                 data3:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     role_id:
 *                       type: integer
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */

router.post('/save',async(request,response)=>{
    try{
        const {username,password,is_active,created_by,updated_by,role_id} = request.body
        let data = await User.create({username,password,is_active,created_by,updated_by})
        if(data){
            let data3 = await User_role.create({user_id:data.id,role_id,is_active,created_by,updated_by})
            if(data3){
                response.json({status:true,data,data3})
            }
            else{
                response.json({status:false})
            }
        }
        else{
            response.json({status:false})
        }
    }
    catch(err){
        response.json({status:false,error:err.message})
    }
})

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Authenticate a user and generate a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     # Add other user properties here
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated requests
 *       401:
 *         description: Login unsuccessful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: login unsuccessful
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 */
router.post('/login',async(request,response)=>{
    try{
        let {username,password} = request.body
        let data = await User.findOne({where:{username,password}})
        console.log(data);
        if(data){
            let data2 = await User_role.findOne({where:{user_id:data.id}})
            console.log(data2.user_id,data2.role_id)
            let token = await jwtobj.generateToken(data2.user_id,data2.role_id);
            response.json({status:true,data,msg:"login successful",token})
        }
        else{
            response.json({status:false,msg:"login unsuccessful"})
        }
    }
    catch(err){
        response.json({status:false,error:err.message})
    }
})

router.use((req,res,next)=>{
    jwtobj.authenticatetoken(req,(result)=>{
        if(result.status){
            next();
        }
        else{
            res.json(result);
        }
    })
})


router.use('/transport',transportRouter)
router.use('/course',courseRouter)
router.use('/admission',admissionRouter)
router.use('/role',roleRouter)
router.use('/userrole',userRoleRouter)
router.use('/student',studentRouter)
module.exports = router