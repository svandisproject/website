const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');


const PORT = process.env.PORT || 3000;
const knex = require('knex')({
    client: 'mysql',
    connection: process.env.CLEARDB_DATABASE_URL
});

async function getNextId() {
    let rows = await knex.select('id').from('whitelist');
    if (rows.length) {
        return rows.length + 1;
    } else {
        return 1;
    }
}

async function main() {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('static'));
    const exists = await knex.schema.hasTable('whitelist');

    if (!exists) {
        await knex.schema.createTable('whitelist', (t) => {
            t.integer('id').primary();
            t.string('email'),
                t.string('address_eth'),
                t.string('amount'),
                t.string('kyc')
        });
    }

    app.post('/whitelist-form',
        [
            check('email-whitelist').isEmail(),
            check('eth-address-whitelist').isAlphanumeric(),
            check('contribution-whitelist').isAlphanumeric(),
            check('pass-kyc-whitelist').isAlphanumeric()
        ],
        async (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty() === false) {
                console.log(errors.array());
                return res.status(400).send('Invalid request');
            }

            try {
                const result = await knex('whitelist').insert({
                    id: await getNextId(),
                    email: req.body['email-whitelist'],
                    address_eth: req.body['eth-address-whitelist'],
                    amount: req.body['contribution-whitelist'],
                    kyc: req.body['pass-kyc-whitelist']
                })
            } catch (err) {
                console.error(err);
                res.status(500).send('Something went wrong. Try again later');
            }

            res.redirect(302, 'http://svandis.io/en/formv2.html?message=sent');
        }
    );

    app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
};

main();