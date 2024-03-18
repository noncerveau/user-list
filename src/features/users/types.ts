export interface fetchUsersParam {
    offset: number,
    limit: number,
};

export interface User {
    id: number,
    name: string,
    department: string,
    company: string,
    position: string,
};
