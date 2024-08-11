const express = require('express')
const router = express.Router()
const {Transportation,Role,User} = require('../models/index');
const { Model } = require('sequelize');
// const { where } = require('sequelize')
// const { where } = require('sequelize')

/**
 * @swagger
 * /user/transport/save:
 *   post:
 *     summary: Create a new transportation entry
 *     tags: [Transportation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - fee
 *               - is_active
 *               - created_by
 *               - updated_by
 *             properties:
 *               city:
 *                 type: string
 *               fee:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               created_by:
 *                 type: integer
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Transportation entry creation result
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
 *                     city:
 *                       type: string
 *                     fee:
 *                       type: number
 *                     is_active:
 *                       type: boolean
 *                     created_by:
 *                       type: integer
 *                     updated_by:
 *                       type: integer
 *       400:
 *         description: Transportation entry creation failed
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

router.post('/save',async(request,response)=>{
    const id = request.role_id;
    let dataa = await Role.findAll({
        where:{id:id}
    })
    try{
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            let {city,fee,is_active,created_by,updated_by} = request.body
            let data = await Transportation.create({city,fee,is_active,created_by,updated_by})
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
 * /user/transport/showAll:
 *   get:
 *     summary: Retrieve all transportation entries
 *     tags: [Transportation]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all transportation entries
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
 *                       city:
 *                         type: string
 *                       fee:
 *                         type: number
 *                       is_active:
 *                         type: boolean
 *                       created_by:
 *                         type: integer
 *                       updated_by:
 *                         type: integer
 *       404:
 *         description: No transportation entries found
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
    console.log(id)
    try{
        if(dataa[0].role_name == 'Admin' || dataa[0].role_name == 'teacher'){
            let data = await Transportation.findAll({
        // include:{
        //     model:User,
        //     attributes:['username']
        // }
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
 * /user/transport/showOne/{id}:
 *   get:
 *     summary: Retrieve a specific transportation entry by ID
 *     tags: [Transportation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The transportation entry ID
 *     responses:
 *       200:
 *         description: Transportation entry details
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
 *                     city:
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
 *         description: Transportation entry not found
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
    try{
        const pid = request.params.id
        let data = await Transportation.findOne({
            where:{id:pid}
        })
        if(data){
            response.json({status:true,data})
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
 * /user/transport/update/{id}:
 *   put:
 *     summary: Update a specific transportation entry by ID
 *     tags: [Transportation]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The transportation entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               fee:
 *                 type: number
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Transportation entry update result
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
 *         description: Transportation entry not found or no updates made
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
    try{
        const pid = request.params.id
        let data = await Transportation.update(request.body,{
            where:{id:pid}
        })
        if(data){
            response.json({status:true,data})
        }
        else{
            response.json({status:false})
        }
    }
    catch(err){
        response.json({status:false,error:err.message})
    }
})

module.exports = router