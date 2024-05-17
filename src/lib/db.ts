import Knex from 'knex';
import config from '../../knexfile.mjs';

const knex = Knex(config['development']);

knex.migrate.latest().then(() => {
    console.log('Migration Completed!!');
});

export default knex;
