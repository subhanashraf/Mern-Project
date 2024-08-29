const express = require('express');
const app = express();
const router = express.Router();
const userModel = require('../model/user');
const proudctModel = require('../model/product')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/',function (req,res) {
  res.send('is working')
  console.log('hello');
  
})

router.post('/verifyuser',async function (req,res) {
    const {token} =req.body;
    jwt.verify(token, 'hello', function(err, decoded) {
       if (err) {
        res.status(300).json({data:"your are worng"})
    }
    else{
        res.status(200).json({message:"your are correct",data:decoded})
    }
      });
})

router.post('/create',function (req,res) {
   const  {name,email,password} = req.body;
   bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, async function(err, hash) {
      let userdata = await  userModel.create({
            name,
            email,
            password:hash ,
        })
        jwt.sign({email},'hello',function (err,token) {
            if (err) {
                return res.status(500).json({ error: 'JWT Error', message: err.message });
            }
            res.status(200).json({
                name: userdata.name,
                email: userdata.email,
                token: token,
            });
       })
    });
});
});

router.get('/read',async (req,res)=>{
    let data = await proudctModel.find()
    res.status(200).send({data})
 })





 router.get('/peoductinfo/:id',async function(req,res) {
    let data = await proudctModel.find({_id : req.params.id})
    res.status(200).send({data})
 })



// router.post('/login',async function (req,res) {
//    const  {email,password} = req.body;
//    let checkuser = await userModel.find({email})
//    let user = checkuser[0];
//     console.log(user);
    
//    if (checkuser) {
//     console.log('hello');
//        bcrypt.compare(password, user.password, function(err, result) {
//            if (result) {
//                jwt.sign({email},'hello',function (err,token) {
//                    if (err) {
//                        return res.status(500).json({ error: 'JWT Error', message: err.message });
//                     }
//                    else{
//                     console.log('send');
                    
//                     res.status(200).json({
//                         token: token,
//                         name:user.name,
//                         email: user.email,
//                         Why:'User'
//                     });
//                    }
//                 })
//             }  else{
//                 res.status(300).send('password not match')
//             }     
//         });
//     }
//     else{
//         res.status(300).send('your are not login')
//     }
// })

router.post('/login', async function (req, res) {
    const { email, password } = req.body;

    try {
        const checkuser = await userModel.findOne({ email });
        if (!checkuser) {
            return res.status(401).json({ message: 'User not found' });
        }

        bcrypt.compare(password, checkuser.password, function (err, result) {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (result) {
                jwt.sign({ email }, 'hello', function (err, token) {
                    if (err) {
                        console.error('Error creating JWT:', err);
                        return res.status(500).json({ error: 'JWT Error' });
                    }

                    res.status(200).json({
                        token: token,
                        name: checkuser.name,
                        email: checkuser.email,
                        Why: 'User',
                    });
                });
            } else {
                res.status(401).json({ message: 'Incorrect password' });
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;