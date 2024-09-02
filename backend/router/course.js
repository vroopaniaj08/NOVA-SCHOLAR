const express = require('express')
const {Course,Admission_fee,Role} = require('../models/index')
const { where } = require('sequelize')
const router = express.Router()

/**
 * @swagger
 * /user/course/save:
 *   post:
 *     summary: Create a new course and associated admission fee
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - course_name
 *               - description
 *               - fee
 *               - fee2
 *               - is_active
 *               - created_by
 *               - updated_by
 *             properties:
 *               course_name:
 *                 type: string
 *               description:
 *                 type: string
 *               fee:
 *                 type: number
 *               fee2:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               created_by:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Course and admission fee creation result
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
 *                     course_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     fee:
 *                       type: number
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *                 data2:
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

router.post('/save',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            let {course_name,description,fee,fee2,is_active,created_by,updated_by} = request.body
            let data = await Course.create({course_name,description,fee,is_active,created_by,updated_by})
            console.log(data)
            if(data){
                let data2 = await Admission_fee.create({course_id:data.id,fee:fee2,description,is_active,created_by,updated_by})
                if(data2){
                    response.json({status:true,data,data2})
                }
                else{
                    response.json({status:false,data})
                }
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
 * /user/course/courseList:
 *   get:
 *     summary: Retrieve a list of all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of courses
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
 *                       course_name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       fee:
 *                         type: number
 *                       is_active:
 *                         type: boolean
 *                       created_by:
 *                         type: integer
 *                       updated_by:
 *                         type: integer
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

router.get('/courseList',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            let data = await Course.findAll()
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
 * /user/course/showOne/{id}:
 *   get:
 *     summary: Retrieve a specific course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     responses:
 *       200:
 *         description: Course details
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
 *                     course_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     fee:
 *                       type: number
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *       404:
 *         description: Course not found
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
            const pid = request.params.id
            let data = await Course.findOne({
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
 * /user/course/update/{id}:
 *   put:
 *     summary: Update a specific course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               course_name:
 *                 type: string
 *               description:
 *                 type: string
 *               fee:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Course update result
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
 *         description: Course not found or no updates made
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
            let data = await Course.update(request.body,{
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