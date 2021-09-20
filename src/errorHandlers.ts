export const notFoundErrorHandler = ({err, req, res, next}:any) => {
	if (err.status === 404) {
		res.status(404).send(err.message || "Error not found!");
	} else {
		next(err);
	}
};

export const badRequestErrorHandler = ({err, req, res, next}:any) => {
	if (err.status === 400) {
		res.status(400).send(err.errors);
	} else {
		next(err);
	}
};

export const catchAllErrorHandler = ({err, req, res}:any) => {
	res.status(err.status || 500).send(err.message || "Generic Server Error");
	console.log(err);
};
