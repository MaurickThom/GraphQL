const validate = (data,schema)=>{
    const { error } = schema.validate(data)
    return error 
}

exports.validationHandler = (schema,check='body')=>{
    return (req,res,next)=>{
        const error = validate(req[check],schema)
        error ? res.status(401).json({error}) : next()
    }
}