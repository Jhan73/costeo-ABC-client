export interface Inductor {
    id: number;
    name: string;
    description: string;
    code: string;
    state?: boolean;
    activityId: number;
    activity?: string;
}