export interface CreateBudgetDTO {

    description: string;
    value: number;
    userId: string;
    startDate: Date;
    finalDate: Date;

}