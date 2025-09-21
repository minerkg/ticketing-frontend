export interface SolutionType {
    id?: number;
    name?: string;
    solutionTypeStatus?: SolutionType.SolutionTypeStatusEnum;
}
export namespace SolutionType {
    export const SolutionTypeStatusEnum = {
        Active: 'ACTIVE',
        Inactive: 'INACTIVE'
    } as const;
    export type SolutionTypeStatusEnum = typeof SolutionTypeStatusEnum[keyof typeof SolutionTypeStatusEnum];
}


