"use strict"

const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const PRODUCTLIST = path.join(__dirname,'src/mock/server-product-data.json');
const CARTLIST = path.join(__dirname,'src/mock/server-cart-data.json');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port',(process.env.PORT || 3000 ));
app.get('/test',(req,res) => {
    res.setHeader('Cache-Control','no-cache');
    res.json({'hello':'world'});
})
app.get('/productLists',(req,res) => {
    fs.readFile(PRODUCTLIST,(err,data) => {
     const productLists = JSON.parse(data);
     res.setHeader('Cache-Control','no-cache');
     res.json(productLists);   
    })
})
app.get('/carLists',(req,res) => {
    fs.readFile(CARTLIST,(err,data) => {
        const cartLists = JSON.parse(data);
        res.json(cartLists);
    }) 
})
app.post('/cart/add',(req,res) => {
    fs.readFile(CARTLIST,(err,data) => {
        const cartProducts = JSON.parse(data);

        const newCartProduct = { id: req.body.id, title: req.body.title, description: req.body.description, price: req.body.price, quantity: 1};
        let exists = false;
        cartProducts.map((product) => {
            if (product.id === newCartProduct.id){
                product.quantity ++ ;
                exists = true;
            }
        });
        if (!exists){
            cartProducts.push(newCartProduct);
        };
        fs.writeFile(CARTLIST,JSON.stringify(cartProducts,null,4),() => {
            res.setHeader('Cache-Control','no-cache');
            res.json(cartProducts);
        })
    })
})

app.post('/cart/delete',(req,res) => {
    fs.readFile(CARTLIST,(err,data) => {
        const cartProducts = JSON.parse(data);
        cartProducts.map((product) => {
            if(product.id === req.body.id && product.quantity > 1){
                product.quantity-- ;
            }else if (product.id === req.body.id && product.quantity === 1){
                const cartProductIndex = cartProducts.findIndex(product => product.id === req.body.id);
                cartProducts.splice(cartProductIndex,1);
            }
        });
        fs.writeFile(CARTLIST,JSON.stringify(cartProducts,null,4), () => {
            res.setHeader('Cache-Control','no-cache');
            res.json(cartProducts);        
        });
    });
});

app.post('/cart/delete/all',(req,res) => {
    let empty = []
    fs.writeFile(CARTLIST,JSON.stringify(empty,null,4),() => {
        res.json(empty);
    });
});


app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});