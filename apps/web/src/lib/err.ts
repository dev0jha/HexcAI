export function ErrWith({ message }: { message: string }): Error {
   return new Error(message)
}
