import express from 'express';


const router = express.Router();


import mongoose from 'mongoose';
import phone from '../schemas/products.router.js';


router.post('/products', async (req, res) => {

    try {
        if (!req.body) {
            return res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않는  데이터" });
        }/////////// title부터 password까지 다 유효성 검사 if 작성

        const { title, content, author, password } = req.body;


        const createdphone = new phone({
            title,
            content,
            author,
            password
        });
        await createdphone.save();
        res.status(201).json({ Message : "상품을 등록하였습니다." });
    } catch (error) {
        res.status(500).json({ Message : "오류가 발생했습니다." });
    }

});

// /routes/goods.js

router.get('/products', async (req, res) => {

    try {
        const search_phone = await phone.find({}).select("_id title author status createdAt").sort({createdAt : -1});
        res.status(201).json(search_phone);
    } catch (error) {
        res.status(500).json({ Message : "오류가 발생했습니다." });
    }

});


router.get('/products/:productId', async (req, res) => {
    try {
        const search_phone = await phone.findById(res.params.productId).select("_id title author status createdAt");

        if(!search_phone){
           return res.status(404).json({Message : "일치하지 않는 상품 목록입니다." });
        }
        res.status(201).json(search_phone);
    } catch (error) {
        res.status(500).json({ Message : "오류가 발생했습니다." });
    }
});


router.put('/products/:productId', async (req, res) => {
    try {

        if(!req.body || !req.params){
           return res.status(400).json({Message : "데이터 형식이 올바르지 않는  데이터" });
        }



        const { title, content, status, password } = req.body;
        const search_phone = await phone.findById(res.params.productId);

        if(!search_phone){
            return res.status(404).json({Message : "상품 조회에 실패하였습니다."});
        }

        if(password !== search_phone.password){
            return res.status(401).json( {Message : "상품을 수정할 수 있는 권한이 없습니다."});
        }

        search_phone.title = title;
        search_phone.content = content;
        search_phone.status = status;

        
        await search_phone.save();
        res.status(201).json({ Message : "상품을 수정하였습니다." });
    } catch (error) {
        res.status(500).json({ Message : "오류가 발생했습니다." });
    }
});


router.delete('/products/:title', async (req, res) => {
    try {

        if(!req.body || !req.params){
           return res.status(400).json({Message : "데이터 형식이 올바르지 않는  데이터" });
        }


        const productId = req.params.productId;
        const { password } = req.body;
        const search_phone = await phone.findById(res.params.productId);

        if(!search_phone){
            return res.status(404).json({Message : "상품 조회에 실패하였습니다."});
        }

        if(password !== search_phone.password){
            return res.status(401).json( {Message : "상품을 수정할 수 있는 권한이 없습니다."});
        }


        await search_phone.deleteOne( {id : productId});
        res.status(201).json({ Message : "상품을 삭제하였습니다." });
    } catch (error) {
        res.status(500).json({ Message : "오류가 발생했습니다." });
    }
});


export default router;




