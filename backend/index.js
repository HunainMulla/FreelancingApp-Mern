const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51Qki3JCTFACjR68usUJ1sGUz3xro5spP4jKqKJkUrNjjuTy0XNranwVTTq3S5irCTc9c6CFoWCCItmTQsMH1on0300yL5Jy1r7');  


const { dbConn, insertData, isUser, searchData, fetchAll, UserDetails, deleteAll, isRequestAlreadySent, findUserByEmail, findUserOrdersByEmail } = require('./Mongo');


app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {

  await deleteAll()


});


app.post('/form/signin', async (req, res) => {

  const obj = {
    email: req.body.email,
    password: req.body.password,
  };

  console.log("This is the user credentials : ", obj.email, obj.password)
  const response = await dbConn(obj)
  console.log("Entered Password : ", obj.password)

  console.warn("The entry found from db : ", response)
  if (!response) {
    console.log("User Not FOund")
  }
  else {

    if (obj.password == response.password) {
      res.status(200).json({ message: "Logged In Success" })
    }
    else {

      res.status(400).json({ message: "Invalid Creden" })
    }
  }

});


app.post('/form/signup', async (req, res) => {
  const test_obj = {
    email: req.body.userEmail,
    password: req.body.userPassword
  };

  // Check if user already exists
  const isUserExist = await isUser(test_obj);
  if (isUserExist) {
    return res.status(400).json({ message: "User Already Exist Try Logging In" });
  } else {
    // Define the user object
    // let obj = {
    //   email: req.body.userEmail,
    //   password: req.body.userPassword,
    //   profession: req.body.profession,
    //   hourlyRate: req.body.hourlyRate,
    //   deliveryExpectTime: req.body.deliveryExpectTime,
    //   requests: req.body.requests,
    //   description: req.body.description,
    //   type: req.body.type,
    //   new_orders: req.body.AllOrders
    // };


    let obj = {
      email: req.body.userEmail,
      password: req.body.userPassword,
      profession: req.body.profession,
      hourlyRate: req.body.hourlyRate,
      deliveryExpectTime: req.body.deliveryExpectTime,
      requests: req.body.requests,
      description: req.body.description,
      type: req.body.type,
      orders: []  
    };


   
    console.log("Object to insert:", obj);

    
    if (!obj.type) {
      let userObj = {
        useremail: req.body.userEmail,
        userpassword: req.body.userPassword,
      };
      await insertData(userObj);
    } else {
      await insertData(obj); 
    }

    
    res.status(200).json({ message: "User Created" });
  }
});




app.get('/home/:key', async (req, res) => {
  try {
    let data = await searchData(req.params.key);

   
    if (data && data.length > 0 && data[0]?.name?.trim() !== "") {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error("Error during search:", e);
    res.status(500).json({ message: "Server error during search" });
  }
});

app.post('/home/:key', async (req, res) => {
  try {
    let query = (req.params.key).toLowerCase()
    let data = await searchData(query);

    
    if (data && data.length > 0 && data[0]?.name?.trim() !== "") {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error("Error during search:", e);
    res.status(500).json({ message: "Server error during search" });
  }
});


app.post('/request', async (req, res) => {
  const { FreelancerName, customerName, needDescription } = req.body
  let obj = {
    FreelancerName: FreelancerName,
    customerName: customerName,
    needDescription: needDescription
  }

  const isTrue = await isRequestAlreadySent(obj)

  if (isTrue) {
    res.status(400).json({
      message: "Request Already Sent To This Freelancer"
    })
  }
  else {

    const functionResponse = await UserDetails(obj)
    if (functionResponse) {
      res.status(200).json({
        message: "Request Sent To User"
      })
    }
    else {
      res.status(400).json({
        message: "Something Went Wrong While Sending Request !"
      })

    }
  }//else



})





app.post('/form/signupUser', async (req, res) => {
  let info = {
    email: req.body.email,
    password: req.body.password,
    type: req.body.type
  }
  console.log(info.email, info.password)
  // const allUsers = await fetchAll()

  // console.log(allUsers)


  const user = await isUser(info)
  if (user) {
    res.status(400).json({
      message: "User Already registred"
    })
  }
  else {
    await insertData(info);
    res.status(200).json({
      message: "Done from the backend"
    })

  }



})


app.post("/need", async (req, res) => {

  let obj = {
    userEmail: req.body.userEmail,
    freelancerEmail: obj.email,
    needMessage: req.body.needMessage,
  }

  await freeLancerOrder(obj)


})




app.get('/home', async (req, res) => {

  const data = await fetchAll();
  console.log(data)
  res.status(200).json(data);

})


app.post('/profile', async (req, res) => {
  const obj = {
    email: req.body.email
  }

  console.log(obj.email)

  const data = await findUserByEmail(obj.email)

  res.status(200).json(data)


})


app.post('/orders', async (req, res) => {
  const obj = {
    email: req.body.email
  }

  console.log(obj.email)

  const data = await findUserOrdersByEmail(obj.email)

  res.status(200).json(data)


})


app.post('/payment', async (req, res) => {
  try {
    const { amount } = req.body;

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(5000, () => {
  console.log("Running at port number 5000");
});
