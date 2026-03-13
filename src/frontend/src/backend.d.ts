import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Task {
    id: bigint;
    escrowFrozen: boolean;
    category: string;
    providerName: string;
    optionalRating?: bigint;
    optionalHandshakeKey?: bigint;
}
export interface Provider {
    name: string;
    category: string;
}
export interface backendInterface {
    createTask(providerName: string, category: string): Promise<bigint>;
    generateHandshakeKey(taskId: bigint): Promise<bigint>;
    getAllProviders(): Promise<Array<Provider>>;
    getAllTasks(): Promise<Array<Task>>;
    getProvider(name: string): Promise<Provider>;
    getProvidersByCategory(): Promise<Array<Provider>>;
    getTasksByCategory(): Promise<Array<Task>>;
    rateTask(taskId: bigint, rating: bigint): Promise<void>;
    registerProvider(name: string, category: string): Promise<void>;
    verifyHandshake(taskId: bigint, key: bigint): Promise<boolean>;
}
