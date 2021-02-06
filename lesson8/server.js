const express = require('express')
const path = require('path')
const fs = require('fs')
const format = require('node.date-time')
const bodyParser = require('body-parser')

// const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(bodyParser.json());

app.get('/goodsApi', (req, res) => {
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
                res.json({'date': logTime('d-MM-Y'), 'time': logTime('hh:mm:SS'), 'title': `${item.title} был добавлен`});
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
                res.json({'date': logTime('d-MM-Y'), 'time': logTime('hh:mm:SS'), 'title': `${searchItem.title} был изменён на ${logItem(par)}`});
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
                res.json({'date': logTime('d-MM-Y'), 'time': logTime('hh:mm:SS'), 'title': `${item.title} был удалён`});
            }
            else {
                res.json({res: false, err});
            }
        });
    })
})

app.get('/log', (req, res) => {
    fs.readFile('./src/log.html', 'utf-8', (err, data) => {
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
    fs.readFile('./data/status.json', 'utf-8', (err, data) => {
        const goods = JSON.parse(data);
        goods.push(item)
        console.log(item)
        fs.writeFile('./data/status.json', JSON.stringify(goods), err => {
            if(!err){
                res.json({res: true, log: 'Записан в фаил'});
            }
            else {
                res.json({res: false, err});
            }
        });
    })
})

app.get('/logApi', (req, res) => {
    fs.readFile('./data/status.json', 'utf-8', (err, data) => {
        if(!err){
            res.send(data)
        }
        else {
            res.send(JSON.stringify({}))
        }
    })
})

function logTime(text) {
    /**
     * "d-MM-Y hh:mm:SS"
     */
    const date = new Date().format(text)
    return date
}

app.listen(PORT, () => {
    console.log(`сервер запушен на ${PORT} порту`)
})