export interface RequestPayload {
  message: string
}

export interface ResponsePayload {
  message: string
}

export interface MessageFilter {
  (message:string): string
}