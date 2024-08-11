const express = require('express')
const router = express.Router()
const {User_role,Role} = require('../models/index')
// const user_role = require('../models/user_role')

/**
 * @swagger
 * /user/userrole/showAll:
 *   get:
 *     summary: Retrieve all user roles
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all user roles
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
 *                       user_id:
 *                         type: integer
 *                       role_id:
 *                         type: integer
 *                       is_active:
 *                         type: boolean
 *                       created_by:
 *                         type: integer
 *                       updated_by:
 *                         type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No user roles found
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
            let data = await User_role.findAll()
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
 * /user/userrole/showOne/{id}:
 *   get:
 *     summary: Retrieve a specific user role by ID
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user role ID
 *     responses:
 *       200:
 *         description: User role details
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
 *       404:
 *         description: User role not found
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
        if(dataa[0].role_name == 'Admin'){
            let pid = request.params.id
            let data = await User_role.findOne({
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
 * /user/userrole/update/{id}:
 *   put:
 *     summary: Update a specific user role by ID
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               role_id:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User role update result
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
 *         description: User role not found or no updates made
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
        if(dataa[0].role_name == 'Admin'){
            const pid = request.params.id
            let data = await User_role.update(request.body,{
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