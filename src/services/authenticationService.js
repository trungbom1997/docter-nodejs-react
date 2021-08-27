
var jwt = require('jsonwebtoken');
var xss = require("xss");
const bcrypt = require('bcrypt');
const SALT_ROUND = 8;
const ACCESS_TOKEN = 'accessToken'

import db from '../models/index'

function Sanitizing(htmlString) {
    try {
        var stripedHtml = htmlString.replace(/<[^>]+>/g, '');
        return xss(stripedHtml);
    } catch (error) {
        return ''
    }
    
}

async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(SALT_ROUND);
    return await bcrypt.hashSync(Sanitizing(password), salt);
}

async function comparePassword(password, passwordCompare) {
    return isPasswordValid = await bcrypt.compareSync(password, passwordCompare);
}

async function createNewUser(data) {
    return new Promise(async(resove,reject) =>{
        try {
            await db.User.create ({
                email:data.email,
                password:await hashPassword(data.password),
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleid: data.roleid,
                phoneNumber: data.phoneNumber,
            });
            resove("success")
        } catch (error) {
            reject(error)
        }
    })
}

async function getAllUser() {
    const users = await db.User.findAll();
    return users
}

async function findUserById(id) {
    const user = await db.User.findOne({ where: { id: id } });
    if (user === null) {
      return('Not found!');
    } else {
        return user;
    }
}

async function updateUserById(data) {
    const user = await db.User.update(
        {
            email:data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            gender: data.gender === '1' ? true : false,
            roleid: data.roleid,
            phoneNumber: data.phoneNumber
        }, {
        where: { id: data.id }
      });
    if (user === null) {
      return('Not found!');
    } else {
        return "Success";
    }
}

async function deleteUserById(id) {
    const user = await db.User.destroy({ where: { id: id } });
    if (user === null) {
      return('Not found!');
    } else {
        return ('success');
    }
}

// async function findUserByUserNameOrEmail(username) {
//     const result = await user.findOne({
//         $or: [{ username: username }, { email: username }]
//     }, (err, docs) => {
//         if (!err) return docs;
//         return false;
//     })
//     return result;
// }

// async function findUserByEmail(email) {
//     const result = await user.findOne({ email: email }
//         ,(err, docs) => {
//             if (!err) return docs;
//             return false;
//         })
//     return result;
// }

// async function updatePasswordUser(id,newPassword){
//     const result =await user.updateOne({ _id: id }, {
//         $set: { password: newPassword },
//     },(err, docs) => {
//         if (!err) return docs;
//         return false;
//     })
//     return result;
// }

function generateToken(data, expires) {
    expiresIn = expires || '9999years';
    const token = jwt.sign(data, ACCESS_TOKEN, { expiresIn: expiresIn });
    return token;
}

function verifyToken(token){
    try {
        const result = jwt.verify(token, ACCESS_TOKEN, (err, payload) => {
            if (err)  return false;
            return payload;
        })
        return result;
    } catch (error) {
        return false;
    }
}


module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    findUserById: findUserById,
    //findUserByUserNameOrEmail: findUserByUserNameOrEmail,
    hashPassword: hashPassword,
    comparePassword: comparePassword,
    Sanitizing:Sanitizing,
    //updatePasswordUser: updatePasswordUser,
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    updateUserById:updateUserById,
    deleteUserById:deleteUserById
}