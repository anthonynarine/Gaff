export interface Server {
    id: number;
    name: string;
    server: string;
    icon: string;
    category: string;
    channel_server: {
        id: number;
        name: string;
        topic: string;
        owner: number;
    }[];
}
