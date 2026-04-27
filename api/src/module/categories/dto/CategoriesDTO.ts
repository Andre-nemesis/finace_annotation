export interface CreateCategoriesDTO {
    name: string,
    description: string | null
}

export interface UpdateCategoriesDTO {
    name?: string,
    description?: string
}