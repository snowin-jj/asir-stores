import Knex from 'knex';

import config from '../../knexfile.mjs';

const knex = Knex(config['production']);

knex.migrate
    .latest()
    .then(() => console.log('Migration completed!'))
    .catch((err) => console.error('Error in migration: ', err));

export default knex;
