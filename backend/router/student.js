const express = require('express');
const router = express.Router();
const { student, User_role } = require('../models/index');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * /user/student/save:
 *   post:
 *     summary: Save user and user role information
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - role_id
 *               - photo
 *               - fathername
 *               - mothername
 *               - cast
 *               - category
 *               - dob
 *               - mobile1
 *               - address
 *               - gender
 *               - status
 *               - total_fee
 *               - discount
 *               - LeadSource
 *               - is_active
 *               - course_id
 *             properties:
 *               course_id:
 *                 type: integer
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               fathername:
 *                 type: string
 *               mothername:
 *                 type: string
 *               cast:
 *                 type: string
 *               category:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *               dob:
 *                 type: string
 *                 format: date
 *               mobile1:
 *                 type: string
 *               mobile2:
 *                 type: string
 *               address:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               status:
 *                 type: string
 *               total_fee:
 *                 type: number
 *               discount:
 *                 type: number
 *               LeadSource:
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
 *       200:
 *         description: User and user role saved successfully
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
 *                     course_id:
 *                       type: integer
 *                     firstname:
 *                       type: string
 *                     lastname:
 *                       type: string
 *                     fathername:
 *                       type: string
 *                     mothername:
 *                       type: string
 *                     cast:
 *                       type: string
 *                     category:
 *                       type: string
 *                     photo:
 *                       type: string
 *                       description: Link to the uploaded photo
 *                     dob:
 *                       type: string
 *                       format: date
 *                     mobile1:
 *                       type: string
 *                     mobile2:
 *                       type: string
 *                     address:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     status:
 *                       type: string
 *                     total_fee:
 *                       type: number
 *                     discount:
 *                       type: number
 *                     LeadSource:
 *                       type: string
 *                     is_active:
 *                       type: boolean
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
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
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
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

router.post('/save', upload.single('photo'), async (request, response) => {
    try {
        const {
            course_id,firstname, lastname, fathername, mothername, cast, category,
            dob, mobile1, mobile2, address, gender, status, total_fee,
            discount, LeadSource, is_active, created_by, updated_by, role_id
        } = request.body;

        // Store the link to the photo instead of just the filename
        const photo = request.file ? `/images/${request.file.filename}` : null;

        if (!photo) {
            return response.json({ status: false, error: 'Photo is required' });
        }

        let data = await student.create({
            course_id, firstname, lastname, fathername, mothername, cast, category,
            photo, dob, mobile1, mobile2, address, gender, status,
            total_fee, discount, LeadSource, is_active,
            created_by: created_by || null,
            updated_by: updated_by || null
        });

        if (data) {
            let data3 = await User_role.create({
                user_id: data.id,
                role_id,
                is_active,
                created_by: created_by || null,
                updated_by: updated_by || null
            });

            if (data3) {
                response.json({ status: true, data, data3 });
            } else {
                response.json({ status: false, error: 'Failed to create user role' });
            }
        } else {
            response.json({ status: false, error: 'Failed to create student record' });
        }
    } catch (err) {
        response.json({ status: false, error: err.message });
    }
});

/**
 * @swagger
 * /user/student/showOne/{id}:
 *   get:
 *     summary: Retrieve a single student by ID
 *     description: Fetches a student's data based on the provided ID
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the student to retrieve
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
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     # Add other student properties here
 *       404:
 *         description: Student not found
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
    try{
        const pid = request.params.id
        let data = await student.findOne({
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
        response.json({status:false})
    }
})

/**
 * @swagger
 * /user/student/showAll:
 *   get:
 *     summary: Retrieve all students
 *     description: Fetches data for all students in the database
 *     tags: [Students]
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
 *                       # Add other student properties here
 *       404:
 *         description: No students found
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
    try{
        let data = await student.findAll()
        console.log(data)
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
 * /user/student/update/{id}:
 *   put:
 *     summary: Update a student's information
 *     description: Updates the data of a student based on the provided ID, including the option to update the photo
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the student to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               fathername:
 *                 type: string
 *               mothername:
 *                 type: string
 *               cast:
 *                 type: string
 *               category:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *               dob:
 *                 type: string
 *                 format: date
 *               mobile1:
 *                 type: string
 *               mobile2:
 *                 type: string
 *               address:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               status:
 *                 type: string
 *               total_fee:
 *                 type: number
 *               discount:
 *                 type: number
 *               LeadSource:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               updated_by:
 *                 type: integer
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
 *                 message:
 *                   type: string
 *                 affectedRows:
 *                   type: integer
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
 *       404:
 *         description: Student not found or no update performed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
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

router.put('/update/:id', upload.single('photo'), async (request, response) => {
    try {
        const pid = request.params.id;
        const updateData = { ...request.body };

        // If a new photo is uploaded, add its path to updateData
        if (request.file) {
            updateData.photo = `/images/${request.file.filename}`;
        }

        let updatedRowsCount = await student.update(updateData, {
            where: { id: pid }
        });

        if (updatedRowsCount > 0) {
            response.json({ status: true, message: 'Student updated successfully', affectedRows: updatedRowsCount });
        } else {
            response.status(404).json({ status: false, message: 'Student not found or no changes made' });
        }
    } catch (err) {
        response.status(500).json({ status: false, error: err.message });
    }
});
module.exports = router