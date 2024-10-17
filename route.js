const authenticationToken = require('./authMiddleware');

app.get('/view-reports',authenticationToken('viewReports'),(req,res) => {
    res.json({
        message: "You have access of jwt route", user: req.user || req.system
    })
})