const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conexion a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'kelly',
    password: '1234',
    database: 'monitoreo_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');
});

// Rutas de la API
app.get('/', async (req, res) => {

    res.status(201).json({ message: `Servidor corriendo en http://localhost:${port}` });
});
// GET: Obtener todos los procesos
app.post('/api/processes', async (req, res) => {
    const { percentage_used, tasks } = req.body;

    if (!percentage_used || !tasks) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    console.log(percentage_used)
    porcenFloat = parseFloat(percentage_used)

    try {
        for (const item of tasks) {
            console.log(item.pid) // Acceder al valor de "pid"


            db.query(
                'INSERT INTO processes ( pid,porcentaje,name, user, state, ram, father) VALUES (?,?, ?, ?, ?, ?, ?)',
                [item.pid, porcenFloat, item.name, item.user, item.state, item.ram,item .father|| null], (error, result) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).send("error")

                    }
                    
                }
            );
        }


        res.status(201).json({ message: 'Proceso creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar el proceso' });
    }
});
// devolver lsita de procesos
app.get('/api/processes', (req, res) => {
    db.query('SELECT * FROM processes', (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ message: 'Error al obtener los procesos' });
            return;
        }
        // Retorna los procesos al cliente
        res.status(200).json(results);
    });
});

// Ruta para insertar una nueva CPU
app.post('/api/cpus', (req, res) => {
    const { tasks } = req.body;
    if (tasks === undefined) {
        return res.status(400).json({ message: 'El campo "usage" es obligatorio.' });
    }

    try {
        // db.query(
        //     'INSERT INTO cpus _usage VALUES (?)',
        //     [tasks], (error, result) => {
        //         if (error) {
        //             console.log(error)
        //             return res.status(500).send("error")

        //         }
        //         res.send("usuario creado")
        //     }
        // );
        res.status(200).json({ message: 'Info CPU ingresada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar el proceso' });
    }
});

///devolver lista de datos CPU
app.get('/api/cpus', (req, res) => {
    db.query('SELECT * FROM cpus', (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ message: 'Error al obtener los procesos' });
            return;
        }
        // Retorna los procesos al cliente
        res.status(200).json(results);
    });
});


// Ruta para asociar un proceso con una CPU
app.post('/api/cpu_processes', async (req, res) => {
    const { cpu_id, process_id } = req.body;

    if (!cpu_id || !process_id) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    try {
        await db.execute(
            'INSERT INTO cpu_processes (cpu_id, process_id) VALUES (?, ?)',
            [cpu_id, process_id]
        );
        res.status(201).json({ message: 'Proceso asociado con la CPU' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al asociar el proceso con la CPU' });
    }
});

// Ruta para insertar información de la RAM
app.post('/api/rams', (req, res) => {
    const { ram_total, ram_libre, used_ram, porcentaje_usado } = req.body;

    if (ram_total === undefined || ram_libre === undefined || used_ram === undefined || porcentaje_usado === undefined) {
        return res.status(400).json({ message: 'Faltan datos obligatorios de RAM' });
    }



    try {
        console.log(req.body)
        console.log("datos recibidos")
        db.query(
            'INSERT INTO rams (total_ram, free_ram, used_ram, percentage_used) VALUES (?, ?, ?, ?)',
            [ram_total, ram_libre, used_ram, porcentaje_usado], (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(500).send("error")

                }
            
            }
        );
        res.status(200).json({ message: 'Registor de ram' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar el proceso' });
    }
});
/// LISTA DE INFO DE RAM
app.get('/api/rams', (req, res) => {
    db.query('SELECT * FROM rams', (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ message: 'Error al obtener los procesos' });
            return;
        }
        // Retorna los procesos al cliente
        res.status(200).json(results);
    });
});

// Ruta para insertar una IP
app.post('/api/ips', async (req, res) => {
    const { ip } = req.body;

    if (!ip) {
        return res.status(400).json({ message: 'La dirección IP es obligatoria' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO ips (ip) VALUES (?)',
            [ip]
        );
        res.status(201).json({ message: 'IP insertada', ipId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al insertar la IP' });
    }
});



// PUT: Actualizar un proceso
app.put('/api/processes/:id', (req, res) => {
    const { id } = req.params;
    const { name, user, state, ram, father } = req.body;

    db.query(
        'UPDATE processes SET name = ?, user = ?, state = ?, ram = ?, father = ? WHERE pid = ?',
        [name, user, state, ram, father, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al actualizar el proceso.' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Proceso no encontrado.' });
            }
            res.status(200).json({ message: 'Proceso actualizado correctamente.' });
        }
    );
});

// DELETE: Eliminar un proceso
app.delete('/api/processes/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM processes WHERE pid = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el proceso.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proceso no encontrado.' });
        }
        res.status(200).json({ message: 'Proceso eliminado correctamente.' });
    });
});

// Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
