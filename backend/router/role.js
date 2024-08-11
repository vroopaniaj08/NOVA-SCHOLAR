const express = require('express')
const router = express.Router()
const {Role} = require('../models/index')
// const { where } = require('sequelize')
// const { where } = require('sequelize')

/**
 * @swagger
 * /user/role/save:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role_name
 *               - description
 *               - is_active
 *               - created_by
 *               - updated_by
 *             properties:
 *               role_name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               created_by:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Role creation result
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
 *                     role_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *       400:
 *         description: Role creation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized
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
            let {role_name,description,is_active,created_by,updated_by} = request.body
            let data = await Role.create({role_name,description,is_active,created_by,updated_by})
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
 * /user/role/showAll:
 *   get:
 *     summary: Retrieve all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all roles
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
 *                       role_name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       is_active:
 *                         type: boolean
 *                       created_by:
 *                         type: integer
 *                       updated_by:
 *                         type: integer
 *       404:
 *         description: No roles found
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

router.get('/showAll',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin'){
            let data = await Role.findAll()
            console.log(data)
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
 * /user/role/showOne/{id}:
 *   get:
 *     summary: Retrieve a specific role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     responses:
 *       200:
 *         description: Role details
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
 *                     role_name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *       404:
 *         description: Role not found
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
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            const pid = request.params.id
            let data = await Role.findOne({
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

/**
 * @swagger
 * /user/role/update/{id}:
 *   put:
 *     summary: Update a specific role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role_name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Role update result
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
 *         description: Role not found or no updates made
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
            let data = await Role.update(request.body,{
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