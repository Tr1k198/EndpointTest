const transporter = require('../config/sendEmail')
const { create } = require("../services/clients_service.js");

module.exports = {
    createClient: (req, res) =>{
        const body = req.body;
        create(body,(err,results) =>{

            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }else{
                const name = req.body.name;
                const email = req.body.email;
                const totalIngress = req.body.totalIngress;
                const sector = req.body.sector;
                const workYears = req.body.workYears;
                const amount = req.body.amount;
                const interestRate = 0.18;
                const payTime = req.body.payTime;
                const frecuency = req.body.frecuency;

                // al ser una division reparé las operaciones para luego realizar la operacion más entendible
                const OperationUp = (interestRate * amount); // primera operacion
                const OperationDown = 1-(Math.pow((1+interestRate),-payTime)); // segunda operacion
                var resultOperation = Math.round(OperationUp/OperationDown);
                var message = "";

                // validacion para saber si es mensual o quincenal
                if(frecuency == 'mensual'){
                    message = "La cuota seria $"+resultOperation+" "+frecuency+" durante "+payTime+" meses";
                }
                else{
                    resultOperation = resultOperation/2;
                    message = "La cuota seria $"+resultOperation+" "+frecuency+" durante "+payTime+" meses"
                }

                var mailOptions = {
                        from:'josuetest98@gmail.com',
                        to:'sergio@mawi.io',
                        subject:'Solicitud de prestamo',
                        text:"Name: "+name+
                            "\n"+"Email: "+email+
                            "\n"+"TotalIngress: "+totalIngress+
                            "\n"+"Sector: "+sector+
                            "\n"+"WorkYears: "+workYears+
                            "\n"+"Amount: "+amount+
                            "\n"+"PayTime: "+payTime+ " meses"+
                            "\n"+"Frecuency: "+frecuency+
                            "\n"+"Message: "+message

                    }
                    transporter.sendMail(mailOptions, function(error,info) {
                        if(error){
                            console.log(error);
                        }else{
                            console.log('Email sent : '+ info.response)
                        }
                        
                    })



                return res.status(200).json({
                    amount: amount,
                    text: message,
                    frecuency:frecuency,
                    payTime:payTime+" meses" 
                });
            }
             
        });

    }
}