// export interface PhotoMetadata {
//     id: string;
//     fileName: string;
//     caption?: string;
//     action: 'add' | 'update' | 'delete'
// }
//
// export interface HikeSearchParams {
//     page: number;
//     pageSize: number;
//     startDate?: string;
//     endDate?: string;
//     searchText?: string;
// }

export interface User {
    id: string;
    userName: string;
    password: string;
}

export interface Creds {
    userName: string;
    password: string;
}
