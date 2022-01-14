/* eslint-disable @typescript-eslint/no-unused-expressions */
import { getConnectionOptions, createConnection } from 'typeorm';

const connection = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection(connectionOptions);
};
export default connection;
