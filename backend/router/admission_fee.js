const express = require('express');
const {Admission_fee,Role,Course} = require('../models/index');
const { where } = require('sequelize');
const router = express.Router();


/**
 * @swagger
 * /user/admission/showAll:
 *   get:
 *     summary: Retrieve all admission fees
 *     tags: [Admission Fees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admission fees
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       course_id:
 *                         type: string
 *                       fee:
 *                         type: number
 *                       description:
 *                         type: string
 *                       is_active:
 *                         type: boolean
 *                       created_by:
 *                         type: integer
 *                       updated_by:
 *                         type: integer
 *       404:
 *         description: No admission fees found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
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
 */

router.get('/showAll',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            let data = await Admission_fee.findAll(
                {
                include:[{
                model:Course,
                as:"course_info",
                attributes:{
                    exclude:['created_by','updated_by']
                }

            }]}
        )
            if(data){
                response.json({status:true,data})
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
 * /user/admission/showOne/{id}:
 *   get:
 *     summary: Retrieve a specific admission fee by ID
 *     tags: [Admission Fees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The admission fee ID
 *     responses:
 *       200:
 *         description: Admission fee details
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
 *                       type: string
 *                     course_id:
 *                       type: string
 *                     fee:
 *                       type: number
 *                     description:
 *                       type: string
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *       404:
 *         description: Admission fee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
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
 */

router.get('/showOne/:id',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            let pid = request.params.id
            let data = await Admission_fee.findOne({
                where:{id:pid}
            })
            if(data){
                response.json({status:true,data})
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
        response.json({status:false})
    }
})

/**
 * @swagger
 * /user/admission/update/{id}:
 *   put:
 *     summary: Update a specific admission fee by ID
 *     tags: [Admission Fees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The admission fee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_id:
 *                 type: string
 *               fee:
 *                 type: number
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Admission fee update result
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
 *                     type: number
 *                   description: An array with a single element indicating the number of rows affected
 *       404:
 *         description: Admission fee not found or no updates made
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
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

router.put('/update/:id',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            const pid = request.params.id
            let data = await Admission_fee.update(request.body,{
                where:{id:pid}
            })
            if(data){
                response.json({status:true,data})
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

module.exports = router