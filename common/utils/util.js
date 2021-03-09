const fPromise = fn => obj => {
	return new Promise((resolve, reject) => {
		obj.complete = obj.success = res => {
			resolve(res);
		};
		obj.fail = err => {
			reject(err);
		};
		fn(obj);
	});
};

module.exports = {
    fPromise: fPromise
}