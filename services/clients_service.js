const connection = require("../config/database");

module.exports= {
    create: (data, callback) =>{
        connection.query(
            `insert into clientes(name,email,totalIngress, sector, workYears, amount, frecuency, payTime)
                values(?,?,?,?,?,?,?,?)`,
            [
                data.name,
                data.email,
                data.totalIngress,
                data.sector,
                data.workYears,
                data.amount,
                data.frecuency,
                data.payTime
            ],
            (error, results, fields) =>{
                if(error){
                    callback(error)
                }
                return callback(null, results)
            } 
        );
    }
}