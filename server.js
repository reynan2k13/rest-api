var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 5000; 

var mongoose   = require('mongoose');
mongoose.connect('mongodb://testrestify:testrestify@ds157078.mlab.com:57078/restifycollection'); // connect to our database
var Product     = require('./app/models/product');


var router = express.Router();


router.use(function(req, res, next) {
	console.log('Event triggered.');
	next();
});


router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router.route('/products')


	.post(function(req, res) {
		
		var product = new Product();		
		product.name = req.body.name;  
		product.description = req.body.description;

		product.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Product created!' });
		});

		
	})


	.get(function(req, res) {
		Product.find(function(err, products) {
			if (err)
				res.send(err);

			res.json(products);
		});
	});


router.route('/products/:product_id')


	.get(function(req, res) {
		Product.findById(req.params.product_id, function(err, product) {
			if (err)
				res.send(err);
			res.json(product);
		});
	})

	.put(function(req, res) {
		Product.findById(req.params.product_id, function(err, product) {

			if (err)
				res.send(err);

			product.name = req.body.name;
			product.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Product updated!' });
			});

		});
	})

	.delete(function(req, res) {
		Product.remove({
			_id: req.params.product_id
		}, function(err, product) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


app.use('/api', router);


app.listen(port);
console.log('Application on port ' + port);
