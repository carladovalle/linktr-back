import joi from 'joi';

const postSchema = joi.object({
	link: joi
		.string()
		.pattern(/(^|\s)((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/)
		.required(),
	content: joi.string().min(0),
});

export { postSchema };
