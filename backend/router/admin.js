const express = require('express');
const app = express();
const router = express.Router();
const adminModel = require('../model/admin')
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



router.post('/create', async function (req,res) {
   const  {name,price,discount,url,color,text,panelcolor} = req.body;
     let product =  await proudctModel .create({
        name,
        price,
        discount,
        url,
        color,
        text,
        panelcolor
        })
        res.status(200).json({
            message: 'Product created successfully',
            product: product
        });
});


router.post('/updata/:id', async function (req,res) {
 const { name, price, discount, url, color, text, panelcolor } = req.body;

try {
    const updatedProduct = await proudctModel.findOneAndUpdate(
        { _id: req.params.id }, // Filter condition
        { name, price, discount, url, color, text, panelcolor }, // Updated fields
        { new: true } // Return the updated document
    );

    if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
    });
} catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'An error occurred while updating the product' });
}

});


router.post('/verify',async function (req,res) {
    const {token} =req.body;
    jwt.verify(token, 'helloadmin', function(err, decoded) {
       if (err) {
        res.status(300).json({data:"your are worng"})
    }
    else{
        res.status(200).json({message:"your are correct",data:decoded})
    }
      });
})


router.get('/read',async (req,res)=>{
   let data = await proudctModel.find()
   res.status(200).json({data})
})

router.get('/detail/:id',async (req,res)=>{
   let data = await proudctModel.find({_id:req.params.id})
   res.status(200).json({data})
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProduct = await proudctModel.findOneAndDelete({_id:req.params.id });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json({
                message: 'Product deleted successfully',
                data: deletedProduct,
            });
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'An error occurred while deleting the product' });
    }
});

router.post('/createadmin', async function (req,res) {
  let owner = await adminModel.find();
  if (owner.length > 0) {
    res.status(400).json({data:"alredy owner"})
  }
  else{
    const  {name,email,password,tellsomething} = req.body;
    bcrypt.genSalt(10, function(err, salt) {
     bcrypt.hash(password, salt, async function(err, hash) {
       let userdata = await  adminModel.create({
        name,
        email,
        password: hash,
        tellsomething
         })
         jwt.sign({email},'helloadmin',function (err,token) {
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
  }
 });

router.post('/login',async function (req,res) {
    const  {email,password} = req.body;
    let checkuser = await adminModel.find()
    let user = checkuser[0];
    if (checkuser) {
     console.log('hello');
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                jwt.sign({email},'helloadmin',function (err,token) {
                    if (err) {
                        return res.status(500).json({ error: 'JWT Error', message: err.message });
                     }
                    else{
                     console.log('check');
                     
                     res.status(200).json({
                         token: token,
                         name:user.name,
                         email: user.email,
                         why:'Admin'
                     });
                    }
                 })
             }  else{
                 res.status(300).send('password not match')
             }     
         });
     }
     else{
         res.status(300).send('your are not login')
     }
 })
 
 


module.exports = router;