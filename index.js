const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/param/:id/:name" , (req, res) => {
    // http://localhost:3000/param/id=123/name=John
    const {id , name} = req.params;
    res.send({id , name});
})

app.get("/query", (req, res) => {
    // http://localhost:3000/query?id=123&name=John
    const { id, name } = req.query;
    res.send({id , name});
});


app.listen(port);
