const Joi = require('joi');

const Schema = Joi.object().keys({
  task: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('To Do', 'In Progress', 'QA', 'Done'),
});


const addSchema = (req, res, next) => {
  console.log('in validation');
  const { error } = Schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).json({ error: error.details[0].message })
  }

  next();
}
module.exports = { addSchema }