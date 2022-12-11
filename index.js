const express = require("express")
const server = express()

server.use(express.json())

let customers = [
    {id: 1, name: "Dev Samurai", site: "http://devsamurai.com.br"},
    {id: 2, name: "Google", site: "http://google.com.br"},
    {id: 3, name: "UOL", site: "http://uol.com.br"}
]

server.get("/customers", (req, res) => {
    return res.json(customers)
})

server.get("/customers/:id", (req, res) => {
    const id = Number(req.params.id)
    const customer = customers.find(item => item.id === id)
    const status = customer ? 200 : 404

    console.log("GET : /customers/:id ", JSON.stringify(customer)) //Utilizado para fazer DEBUG na aplicação. 

    return res.status(status).json(customer)
})

server.post("/customers", (req, res) => {
    const { name, site } = req.body
    const id = customers[customers.length - 1].id + 1
    const newCustomer = { id, name, site }
    customers.push(newCustomer)

    return res.status(201).json(newCustomer)
})

server.put("/customers/:id", (req, res) => {
    const id = Number(req.params.id)
    const index = customers.findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404
    const { name, site, author } = req.body

    if(status === 200){
        customers[index] = { id, name, site, author }
    }

    return res.status(status).json(customers[index])
})

server.delete("/customers/:id", (req, res) => {
    const id = Number(req.params.id)
    const index = customers.findIndex(item => item.id === id)
    const status = index >= 0 ? 200 : 404

    if(status === 200){
        customers.splice(index, 1)
    }

    return res.status(status).json()
})


server.listen(3000)