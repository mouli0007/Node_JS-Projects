
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
let users = [];

//Getting all the users
router.get('/', (req, res) => { 
    console.log(users);
    res.send(users)
})

//Addding the users
router.post('/', (req, res) => {
    console.log('POST ROUTE REACHED');
    const user = req.body;
    const userId = uuidv4();
    const userWithID = {...user,id:userId}; 
    users.push(userWithID)
    res.send(`user with  name ${user.firstName} added to the database`)
})  

//Getting te users withh ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const foundUser =  users.find((user) => { 
        user.id = id;
    })
    res.send(foundUser)
})

//Deleting the user wit ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter((user) => { 
        user.id !== id;
    })
    res.send('User Removed :'+id)
})

//Updating the ID
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const { firstName, lastName, age } = req.body;
    const user = users.find((user) => user.id === id);
    
    if (firstName) { 
        user.firstName = firstName;
    }
    if (lastName) { 
        user.firstName = lastName;
    }
    if (age) { 
        user.age= age;
    }
    res.send('The user ha been updated !')
})

export default router;