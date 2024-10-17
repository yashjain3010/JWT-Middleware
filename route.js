const authenticationToken = require('./authMiddleware');

app.get('/jwt',authenticationToken,(req,res) => {
    res.json({
        message: "You have access of jwt route", user: req.user || req.system
    })
})