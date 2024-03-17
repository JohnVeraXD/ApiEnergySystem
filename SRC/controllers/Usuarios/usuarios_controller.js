const pool = require('../../database/db');
const jwt = require('jsonwebtoken');


//funcion para listar los datos del usuario

const listar_usuario = async (req, res, next) => {
    try {

        const { id_user } = req.params;

        const result = await pool.query('select * from fu_data_user($1)', [id_user]);

        //console.log(id);
        //console.log(result.rows);

        return res.status(200).json(result.rows);

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}


//funcion para modificar los datos del usuario

const modificar_usuario = async (req, res, next) => {
    try {
        const { p_uuid, p_nombre_apellidos,p_contra } = req.body;

        //console.log(req.body);

        const result = await pool.query('call sp_modificar_datos_usuario($1,$2,$3)', [p_uuid, p_nombre_apellidos,p_contra]);

        return res.status(200).json({ message: "Se modifico el usuario" });
        //return res.status(200).json(result.rows);

    } catch (error) {
        //console.log(error);
        return res.status(404).json({ error: error.message });
    }
}

module.exports = {
    modificar_usuario,
    listar_usuario
};