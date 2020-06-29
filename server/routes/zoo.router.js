const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    // YOUR CODE HERE
    
    const queryText =   `SELECT "species"."species_name", "class"."class_name" 
                        FROM "species"
                        JOIN "class" ON "species"."class_id" = "class"."id";`;
        pool.query(queryText).then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});




router.post('/', (req, res) => {
    // YOUR CODE HERE
    const newAnimal = req.body;

    const queryText = `INSERT INTO "class" ("class_name") VALUES ($1)
                       INSERT INTO "species" ("species_name");`;

    const queryValue = [newAnimal.class, newAnimal.species];
        pool.query(queryText, queryValue).then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});



module.exports = router;