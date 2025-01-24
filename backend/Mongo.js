const { MongoClient } = require('mongodb');

const url = "mongodb+srv://testUser:hunainyt19@cluster0.unnjxnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(url);

const freeLancerOrder=async(obj)=>{ 

        const response = await client.connect();
            const db = await response.db('myDB');
        const coll = await db.collection('testCollection');



    const newOrder = {
            userEmail: obj.userEmail,           
            freelancerEmail: obj.email,        
            needMessage: obj.needMessage,      
            createdAt: new Date(),             
        };

       
        const result = await coll.updateOne(
            { email: obj.email },
            { $push: { orders: newOrder } } 
        );

        if (result.modifiedCount === 1) {
            console.log("Order added successfully.");
            return { success: true, message: "Order placed successfully." };
        } else {
            console.log("Failed to add order.");
            return { success: false, message: "Failed to place the order." };
        }
    

}



const dbConn = async (obj) => {
    try {
        const response = await client.connect();
        const db = await response.db('myDB');
        const coll = await db.collection('testCollection');
        const user = await coll.findOne({ email: obj.email });

        if (user) {
            return user;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    } 
};


const isUser = async (obj) => {

    const response = await client.connect();
    const db = await response.db('myDB');
    const coll = await db.collection('testCollection');

   
    const user = await coll.findOne({ email: obj.email });

    if (user) {
       
        return true;
    }
    else {
        return false;
    }


};

// const UserDetails = async (obj) => {

//     const response = await client.connect();
//     const db = await response.db('myDB');
//     const coll = await db.collection('testCollection');
//     const FreelancerName = obj.FreelancerName
//     const Myname = obj.customerName


   
//         try {
//             await coll.updateOne(
//                 { email: FreelancerName },
//                 {
//                     $inc: { requests: 1 },
//                     $push: { orders: {RequestFrom:Myname} }
//                 }
//             );
//             return true;
//         } catch (error) {

//             return false
//         }


// };



    const UserDetails = async (obj) => {
    try {
        const response = await client.connect();
        const db = await response.db('myDB');
        const coll = await db.collection('testCollection');
        
        const FreelancerName = obj.FreelancerName;
        const Myname = obj.customerName;
        const needDescription = obj.needDescription;

       
        const user = await coll.findOne({ email: FreelancerName });
        
        if (user) {
           
            await coll.updateOne(
                { email: FreelancerName },
                {
                    $inc: { requests: 1 },
                    $push: { 
                        orders: { 
                            RequestFrom: Myname,  
                            NeedDescription: needDescription,  
                            DateRequested: new Date() 
                        }
                    }
                }
            );
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error in UserDetails:", error); 
        return false; 
    } finally {
        await client.close(); 
    }
};




const searchData = async (something) => {
    try {
        const response = await client.connect();
        const db = await response.db('myDB');
        const coll = await db.collection('testCollection');
        
       
        const lowerCaseSearchTerm = something.toLowerCase();

        
        let data = await coll.find({
            "$or": [{
                "profession": { 
                    $regex: lowerCaseSearchTerm, 
                    $options: 'i'  
                }
            }]
        }).toArray();

        return data;

    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;  
    }
};  


const insertData = async (obj) => {
    try {
        const response = await client.connect();
        const db = await response.db('myDB');
        const coll = await db.collection('testCollection');

        await coll.insertOne({
            email: obj.email,
            password: obj.password,
            profession: obj.profession,
            rate: obj.hourlyRate,
            delivery: obj.deliveryExpectTime,
            orders:Array(obj.Order),
            description:obj.description,
            type:Boolean(obj.type)
        });

    } catch (error) {
        console.error('Error inserting data:', error);
        throw error;
    } finally {
        await client.close();
    }
};


async function fetchAll() {
    try {
        const response = await client.connect();
        const db = await response.db('myDB');
        const coll = await db.collection('testCollection');
        const data = coll.find({}).toArray();
        return data;
    }
    catch (e) {
        console.log(e)
    }
}


    const deleteAll =async()=>{ 
        const response = await client.connect();
        const db = await response.db('myDB');
        const coll = await db.collection('testCollection');
        coll.deleteMany({})
    
    }


    const isRequestAlreadySent = async (obj) => {
        try {
            const response = await client.connect();
            const db = await response.db('myDB');
            const coll = await db.collection('testCollection');
            
            const FreelancerName = obj.FreelancerName;
            const Myname = obj.customerName; 
    
           
            const user = await coll.findOne({ email: FreelancerName });
    
            if (user) {
                
                const existingOrder = user.orders.find(order => order.RequestFrom === Myname);
    
                if (existingOrder) {
                  
                    return true; // Request has already been sent
                } else {
                   
                    return false; 
                }
            } else {
                return false; 
            }
        } catch (error) {
            console.error("Error in isRequestAlreadySent:", error); 
            return false; 
        } finally {
            await client.close(); 
        }
    };


    const findUserByEmail = async (email) => {
        try {
            // Connect to the database
            const response = await client.connect();
            const db = await response.db('myDB');
            const coll = await db.collection('testCollection');
            
            // Find user by email
            const user = await coll.findOne({ email: email });
    
            if (user) {
                return user;  // Return the user entry if found
            } else {
                return null;  // Return null if no user found with the provided email
            }
        } catch (error) {
            console.error("Error in findUserByEmail:", error); // Log error
            return null;  // Return null in case of error
        } finally {
            await client.close(); // Close the database connection
        }
    };
    


    const findUserOrdersByEmail = async (email) => {
        try {
            // Connect to the database
            const response = await client.connect();
            const db = await response.db('myDB');
            const coll = await db.collection('testCollection');
            
            // Find user by email and return only the 'orders' field
            const user = await coll.findOne({ email: email }, { projection: { orders: 1 } });
    
            if (user && user.orders) {
                return user.orders;  // Return only the orders array if it exists
            } else {
                return [];  // Return an empty array if no orders are found
            }
        } catch (error) {
            console.error("Error in findUserOrdersByEmail:", error); // Log error
            return [];  // Return an empty array in case of error
        } finally {
            await client.close(); // Close the database connection
        }
    };
    


    


module.exports = { dbConn, insertData, isUser, searchData, fetchAll, UserDetails,deleteAll,isRequestAlreadySent,findUserByEmail,findUserOrdersByEmail };
