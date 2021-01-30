const express = require('express')
const fs = require('fs')
const format = require('node.date-time')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(express.static('.'))

app.get('/goods', (req, res) => {
    fs.readFile('./data/catalogData.json', 'utf-8', (err, data) => {
        if(!err){
            res.send(data)
        }
        else {
            res.send(JSON.stringify({}))
        }
    })
})

app.get('/cart', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        if(!err){
            res.send(data)
        }
        else {
            res.send(JSON.stringify({}))
        }
    })
})

app.post('/cart', (req, res) => {
    const item = req.body;
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        const goods = JSON.parse(data);
        goods.push(item);
        fs.writeFile('./data/cart.json', JSON.stringify(goods), err => {
            if(!err){
                res.json({res: true, 'title': `дата: ${logTime()} товар: ${item.title} был добавлен`});
            }
            else {
                res.json({res: false, err});
            }
        });
    });
})

app.put('/cart/:id', (req, res) => {
    const par = req.body.par
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        const goods = JSON.parse(data);
        const searchItem = goods.find((el) => el.id == req.params.id)
        if(searchItem) {
            if(par === '++'){
                searchItem.count++
            } else if (par === '--'){
                searchItem.count--
            }
        }
        fs.writeFile('./data/cart.json', JSON.stringify(goods), err => {
            if(!err){
                function logItem (p) {
                    if(p == '++'){
                        return '+1'
                    } else if (p == '--') {
                        return '-1'
                    }
                }
                res.json({res: true, 'title': `дата: ${logTime()} товар: ${searchItem.title} изменён на ${logItem(par)}`});
            }
            else {
                res.json({res: false, err});
            }
        });
    })
})

app.delete('/cart/:id', (req, res) => {
    fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
        const item = JSON.parse(data).find(el => el.id == req.params.id)
        const goods = JSON.parse(data).filter(el => el.id != req.params.id)
        fs.writeFile('./data/cart.json', JSON.stringify(goods), err => {
            if(!err){
                res.json({res: true, 'title': `дата: ${logTime()} товар: ${item.title} был удалён`});
            }
            else {
                res.json({res: false, err});
            }
        });
    })
})

app.get('/log', (req, res) => {
    fs.readFile('./data/stats.json', 'utf-8', (err, data) => {
        if(!err){
            res.send(data)
        }
        else {
            res.send(JSON.stringify({}))
        }
    })
})

app.post('/log', (req, res) => {
    const item = req.body
    fs.readFile('./data/stats.json', 'utf-8', (err, data) => {
        const goods = JSON.parse(data);
        goods.push(item)
        fs.writeFile('./data/stats.json', JSON.stringify(goods), err => {
            if(!err){
                res.json({res: true, log: 'Записан в фаил'});
            }
            else {
                res.json({res: false, err});
            }
        });
    })
})

function logTime() {
    return new Date().format("d-MM-Y HH:MM:SS")
}

app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`)
})