import { NextFunction, Response } from 'express';
import { v4 } from 'uuid'

function generateV4UUID(_request: any) {
	return v4();
}

const ATTRIBUTE_NAME: string = 'id';

export default function requestID({
	generator = generateV4UUID,
	headerName = 'X-Request-Id',
	setHeader = true,
} = {}) {
	return function (request: any, response: Response, next: NextFunction) {
		const oldValue = request.get(headerName);
		const id = oldValue === undefined ? generator(request) : oldValue;

		if (setHeader) {
			response.set(headerName, id);
		}

		request[ATTRIBUTE_NAME] = id;

		next();
	};
}