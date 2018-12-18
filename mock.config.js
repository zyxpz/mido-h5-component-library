module.exports = {
	'get /some/get.json': (req, res) => {
		console.log(req.query);
		res.jsonp({ custom: 'response', stat: 'ok' });
	},

	'post /some/post.json': (req, res) => {
		res.json({
			msg: 'post',
			stat: 'ok'
		});
	},
  
	'delete /some/delete.json': (req, res) => {
		res.json({
			msg: 'delete',
			stat: 'ok'
		});
	},
  
	'put /some/put.json': (req, res) => {
		res.json({
			msg: 'put',
			stat: 'ok'
		});
	},

	'get /some/test/get.json': (req, res) => {
		res.json({
			msg: 'test get',
			stat: 'ok'
		});
	},
};