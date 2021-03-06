var app = require('express')();
var hbs = require('hbs');
var fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
//    console.log(now);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Error Found!');
        }
    });
    next();
});

//app.use((req, res, next) => {
//    res.render('maintenance');
//});

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to complete request'
    }); 
});

app.listen(3000);