const express = require('express');
const router = express.Router()
const {Teacher,Role} = require('../models/index');

/**
 * @swagger
 * /user/teacher/save:
 *   post:
 *     summary: Save a new parent
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - father_name
 *               - date_of_joinning
 *               - salary
 *               - degree
 *               - mobile
 *               - address
 *               - gender
 *               - is_active
 *               - created_by
 *               - updated_by
 *             properties:
 *               name:
 *                 type: string
 *                 description: Parent's name
 *               father_name:
 *                 type: string
 *                 description: Father's name
 *               date_of_joinning:
 *                 type: string
 *                 format: date
 *                 description: Date of joining
 *               salary:
 *                 type: number
 *                 description: Salary
 *               degree:
 *                 type: string
 *                 description: Educational degree
 *               mobile:
 *                 type: string
 *                 description: Mobile number
 *               address:
 *                 type: string
 *                 description: Address
 *               gender:
 *                 type: string
 *                 description: Gender
 *               is_active:
 *                 type: boolean
 *                 description: Active status
 *               created_by:
 *                 type: integer
 *                 description: ID of user who created the record
 *               updated_by:
 *                 type: integer
 *                 description: ID of user who last updated the record
 *     responses:
 *       200:
 *         description: Parent saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 msg:
 *                   type: string
 *                   example: "saved..."
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
        if(dataa[0].role_name == 'Admin'){
            let {name,father_name,date_of_joinning,salary,degree,mobile,address,gender,is_active,created_by,updated_by} = request.body
            console.log(request.body)
            let data = await Teacher.create({name,father_name,date_of_joinning,salary,degree,mobile,address,gender,is_active,created_by,updated_by})
            if(data){
                response.json({status:true,msg:"saved..."})
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
 * /user/teacher/showAll:
 *   get:
 *     summary: Retrieve all teachers
 *     description: Fetches a list of all teachers. Only accessible by Admin.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       # Add other teacher properties here
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

router.get('/showAll',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin'){
            let data = await Teacher.findAll();
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
 * /user/teacher/showOne/{id}:
 *   get:
 *     summary: Retrieve a single teacher
 *     description: Fetches details of a specific teacher by ID. Only accessible by Admin.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the teacher
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     # Add other teacher properties here
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
 *       404:
 *         description: Teacher not found
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


router.get('/showOne/:id',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        let pid = request.params.id
        if(dataa[0].role_name == 'Admin'){
            let data = await Teacher.findOne({
                where:{id:pid}
            });
            if(data){
                response.json({status:true,data})
            }
            else{
                response.json({status:false,msg:"data not found..."})
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
 * /user/teacher/update/{id}:
 *   put:
 *     summary: Update a teacher's information
 *     description: Updates the details of a specific teacher by ID. Only accessible by Admin.
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique ID of the teacher to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Teacher's name
 *               father_name:
 *                 type: string
 *                 description: Teacher's father's name
 *               date_of_joinning:
 *                 type: string
 *                 format: date
 *                 description: Date when the teacher joined
 *               salary:
 *                 type: number
 *                 description: Teacher's salary
 *               degree:
 *                 type: string
 *                 description: Teacher's degree
 *               mobile:
 *                 type: string
 *                 description: Teacher's mobile number
 *               address:
 *                 type: string
 *                 description: Teacher's address
 *               gender:
 *                 type: string
 *                 description: Teacher's gender
 *               is_active:
 *                 type: boolean
 *                 description: Whether the teacher is active
 *               updated_by:
 *                 type: integer
 *                 description: ID of user who last updated the record
 *     responses:
 *       200:
 *         description: Successful update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: Array containing the number of affected rows
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
 *       404:
 *         description: Update unsuccessful
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
 *                   example: "update unsuccessful..."
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
        let pid = request.params.id
        if(dataa[0].role_name == 'Admin'){
            let data = await Teacher.update(request.body,{
                where:{id:pid}
            });
            if(data){
                response.json({status:true,data})
            }
            else{
                response.json({status:false,msg:"update unsuccessful..."})
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