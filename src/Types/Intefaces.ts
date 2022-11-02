export interface IValidator {
    (value: any): { result: true } | { result: false, message: string }
}
