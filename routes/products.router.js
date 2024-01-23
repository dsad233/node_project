import express from 'express';


const router = express.Router();


import mongoose from 'mongoose';
import phone from '../schemas/products.router.js';


router.post('/products', async (req, res) => {
    const { _id, title, author, status, createdAt } = req.body;

    const phonedata = await phone.find({ title: title }).exec();


    if (phonedata.length) {
        return res.status(400).json({ errorMessage: "이미 존재하는 데이터" });
    }

    const createdphone = await phone.create({
        _id: _id,
        title: title,
        author: author,
        status: status,
        createdAt: createdAt
    });

    return res.status(201).json({ phone: createdphone });
});

// /routes/goods.js

router.get('/products', async (req, res) => {

    const phonedata = await phone.find().sort('createdAt').exec();

    return res.status(200).json({
        phone: phonedata
    })
});


router.get('/products/:title', async (req, res) => {
    const title = req.params.title;
    const search_phone = await phone.find({title}).exec();

    if ( search_phone) {
        return res.status(200).json({
            phone : search_phone
        });
    } else if(!search_phone){
        return res.status(404).json({
            Message: "상품이 존재하지 않습니다."
        });
    }
});


router.put('/products/:title', async (req, res) => {
    const title = req.params.title;
    const content = req.body.content;
    const password = req.body.password;
    const status = req.body.status;



    const search_title = await phone.find({ title: title }).exec();

    if (search_title.title && content && search_title.password && status) {
        search_title.title = title;
        search_title.content = content;
        search_title.password = password;
        search_title.status = status;

        return res.status(201).json({
            Message: '상품 정보를 수정하였습니다.',
            phonedata: search_title
        });
    } else if (!title || !content || !password || !status) {
        return res.status(400).json({
            Message: '데이터 형식이 올바르지 않습니다.'
        });
    } else if (!search_title) {
        return res.status(404).json({
            Message: '상품 조회에 실패하였습니다.'
        });
    } else if (!search_title.password) {
        return res.status(401).json({
            Message: '상품을 수정할 권한이 존재하지 않습니다.'
        });
    }

    

});


router.delete('/products/:title', async (req, res) => {
    const title = req.params.title;
    const password = req.params.password;


    const search_title = await phone.find({title : title});

    if (!search_title.title) {
        return res.status(404).json({
            Message: "상품 조회에 실패하였습니다"
        });
    } else if (search_title.password === password) {
        return res.status(200).json({
            Message: "상품을 삭제하였습니다."
        });
    } else if (!password) {
        return res.status(400).json({
            Message: "입력되지 않았습니다."
        });
    } else if (search_title.password !== password) {
        return res.status(401).json({
            Message: "상품을 삭제할 권한이 없습니다."
        });
    }


    // if (phoneItem.password) {
    //     phonedata.push(phoneItem);
    //     return res.status(201).json({
    //         Message: "상품을 삭제하였습니다."
    //     });
    // } else if (!phoneItem.password) {
    //     return res.status(400).json({
    //         Message: "데이터 형식이 올바르지 않습니다."
    //     });
    // } else if (!title) {
    //     return res.status(404).json({
    //         Message: "상품 조회에 실패하였습니다."
    //     });
    // } else if (phoneItem.password != phoneItem.password) {
    //     return res.status(401).json({
    //         Message: "상품을 삭제할 권한이 없습니다."
    //     });
    // }
});


export default router;




