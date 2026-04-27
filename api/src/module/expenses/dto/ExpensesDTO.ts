export interface CreateExpenseDTO {
    amount: number,
    description: string|null,
    categoryId: string,
    userId: string
}

export interface UpdateExpenseDTO {
    amount?: number,
    description?: string|null,
    categoryId?: string,
    userId?: string
}