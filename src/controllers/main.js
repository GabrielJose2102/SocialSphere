const ctrl = {};

ctrl.start = (req, res)=> {
    res.render('main/main.hbs');
}

module.exports = ctrl;