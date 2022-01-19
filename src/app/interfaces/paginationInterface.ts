import Client from './clientsInterface';

export default interface Results {
    docs: Array<Client>;
    limit: number;
    page: number;
    pages: number;
    totalDocs: number;
}
