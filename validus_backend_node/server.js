var app = require('./app');
var port = process.env.PORT || 3000;

var server = app.listen(port, err => {
	if(err) console.error(err);
	console.log('Server has started, listening on port ' + port);
});