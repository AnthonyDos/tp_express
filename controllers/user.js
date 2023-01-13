import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {userModel} from "../Models/User.js";

export async function signup(req,res,next){
    const password = req.body.password
    const password_confirm  = req.body.password_confirm
    const lastname  = req.body.lastname
    const firstname  = req.body.firstname
    const email = req.body.email
    if(password === '' || lastname === '' || firstname === '' || email === '' || password_confirm === '') {
        res.render('home', { msgError: 'Veuillez remplir tous les champs'});
        //res.status(400).json({message:"Veuillez remplir tous les champs"})
    }
    //const msgError = "password et password_confirm ne sont pas identique"
    if(password != password_confirm) {
        res.render('home', { msgError: 'password et password_confirm ne sont pas identique'});
        //res.status(400).json({message:"password et password_confirm ne sont pas identique"})
    }
    if(password && password_confirm && lastname && firstname && email) {
        await bcrypt.hash(req.body.password, 10) 
    
        .then(hash => {
            console.log(hash)
            console.log(req.body.email)
            const user = new userModel ({
                firstname: firstname,
                lastname:lastname,
                email: email,
                password: hash
            })
            user.save()
            .then(()=> res.status(201).json({
                token: jwt.sign(
                    { userId: user._id },
                    process.env.SECRET,
                    { expiresIn: '24h' }
                ),
                message: "user créé"
            }))
            .catch(error => res.status(400).json({error : error}))
        })
    }
}

export function login(req, res, next){
    
    User.findOne({ email: req.body.email})
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect !'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign (
                    { userId: user._id },
                    process.env.SECRET,
                    { expiresIn: '24h' }
                )       
            })
        })
        .catch(error => res.status(500).json({ error: error, message:'erreur server !' }))
    })
    .catch(error => res.status(500).json({error: error, message : 'erreur server'}));
};