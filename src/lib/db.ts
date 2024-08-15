import Knex from 'knex';

import config from '../../knexfile.mjs';
import { ENV } from '../utils/constants';

const knex = Knex(config[ENV]);

if (ENV === 'production') {
    knex.migrate
        .latest()
        .then(() => {
            console.log('Migration completed!');
        })
        .catch((err) => console.error('Error in migration: ', err));
}

export default knex;
