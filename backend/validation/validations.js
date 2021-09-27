const Joi = require("joi");

// registration validation
function registrationValidation(data){
const schema = Joi.object({
  email: Joi.string().min(6).max(100).required().email(),
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(8).max(20).required().alphanum(),
});
 return schema.validate(data)

}

// login validation
function loginValidation(data){
const schema = Joi.object({
  email: Joi.string().min(6).max(100).required().email(),
  password: Joi.string().min(8).max(20).required().alphanum(),
});
return schema.validate(data)

}

// update profile validation
function updateValidation(data){
const schema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(100).required().email()
});
return schema.validate(data)
}



function productsValidator(data){
  const schema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  quantity:Joi.number().required(),
  price:Joi.number().required(),
});
return schema.validate(data)
}


module.exports.registrationValidation = registrationValidation
module.exports.loginValidation = loginValidation
module.exports.updateValidation = updateValidation
module.exports.productsValidator = productsValidator