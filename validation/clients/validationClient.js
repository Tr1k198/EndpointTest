
// const { client } = require("./schemaClient");
const Validator = require("fastest-validator");


module.exports = {
    addClientValidation: async (req, res, next) => {
        const v = new Validator();  
        
        const schema = {
            name: {type: "string",messages:{
                required:"El '{field}' es requerido'"
            }},
            email:{type:"email",messages:{
                required:"El '{field}' es requerido"
            }},
            totalIngress:{type:"number",messages:{
                required:"El total de ingreso es requerido"},
            },
            sector:{type:"string", enum:["privado","publico"],messages:{
                required:"El '{field}' es requerido"}
            },
            workYears:{type:"number",messages:{
                required:"Los Años laborados snn requeridos" }
            },
            amount: {type:"number", min: 100, max:2000, messages:{
                required:"El monto es requerido",
                numberMin:"El monto está fuera del rango",
                numberMax:"El monto está fuera del rango"
            }},
            frecuency:{type:"string", default:"mensual", enum:["mensual", "quincenal"]},
            payTime:{type:"number"}
        };
        var value = v.validate(req.body,schema);
        
        console.log(value)
        if(value == true){
            console.log(value);
            next();
             
        }else{
            res.json({
                Errors: value
            })
        }

    }
}