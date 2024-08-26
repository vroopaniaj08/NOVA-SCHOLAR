const express = require('express')
const router = express.Router()
const {Recipt,Role} = require('../models/index')

/**
 * @swagger
 * /user/recipts/save:
 *   post:
 *     summary: Save a new receipt
 *     tags: [Receipts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - amount
 *               - student_id
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Receipt date
 *               amount:
 *                 type: number
 *                 description: Receipt amount
 *               student_id:
 *                 type: integer
 *                 description: ID of the associated student
 *     responses:
 *       200:
 *         description: Receipt saved successfully
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
 *                     date:
 *                       type: string
 *                       format: date
 *                     amount:
 *                       type: number
 *                     student_id:
 *                       type: integer
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
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
 *       401:
 *         description: Unauthorized
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
 *                   example: unauthorized access
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

router.post('/save',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name=='Admin' || dataa[0].role_name == 'Parent' || dataa.role_name == 'teacher'){
            const {date,amount,student_id} = request.body
            const data = await Recipt.create({date,amount,student_id})
            if(data){
                response.json({status:true,data,msg:"saved..."})
            }
            else{
                response.json({status:false})
            }
        }
        else{
            response.json({status:false,msg:"unauthorized access"})
        }
    }
    catch(err){
        response.json({status:false,error:err.message})
    }
})

/**
 * @swagger
 * /user/recipts/showAllRecipt/{id}:
 *   get:
 *     summary: Get all receipts for a given student
 *     tags: [Receipts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Receipt'
 *                 msg:
 *                   type: string
 *       400:
 *         description: Bad request
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
 *       401:
 *         description: Unauthorized
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
 *                   example: unauthorized access
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

router.get('/showAllRecipt/:id1',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        const id1= request.params.id1;
        if(dataa[0].role_name == 'Admin'){
            const data = await Recipt.findAll({
                where:{student_id:id1}
            })
            if(data.length >0){
                response.status(200).json({status:true,data,msg:"all recipts"})
            }
            else{
                response.status(200).json({status:false})
            }
        }
        else{
            response.json({status:false,msg:"unauthorized access"})
        }
    }
    catch(err){
        response.json({status:false,error:err.message})
    }
})

/**
 * @swagger
 * /user/recipts/duefee/{id}:
 *   get:
 *     summary: Get total due fee for a student
 *     description: Retrieves the sum of all amounts in receipts for a specific student. Only accessible by Admin.
 *     tags: [DueFees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: number
 *                   description: Total due fee amount
 *       401:
 *         description: Unauthorized access
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
 *                   example: "unauthorized access"
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

router.get('/duefee/:id',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        let pid = request.params.id;
        if(dataa[0].role_name == 'Admin'){
            const data = await Recipt.sum('amount',{
                where:{student_id:pid}
            })
            if(data){
                response.status(200).json({status:true,data})
            }
            else{
                response.status(200).json({status:false})
            }
        }
        else{
            response.json({status:false,msg:"unauthorized access"})
        }
    }
    catch(err){
        response.json({status:false,error:err.message})
    }
})


module.exports = router