var ejs = require('ejs'),
    express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);

app.use(express.logger());

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(__dirname + '/public'));
app.register('.html', ejs);
app.register('.js', ejs);

app.get('/', function (req, res) {
    res.render('index', {
        layout: false
    });
});

io.sockets.on('connection', function (socket) {
    socket.on('deviceMotion', function (data) {
        console.log(data);
    });
});

app.listen(8080);
console.log('Express server started on port %s', app.address().port);