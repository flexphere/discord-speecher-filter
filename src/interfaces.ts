export interface Voice {
  type?: string
  pitch?: number
  speed?: number
}
export interface RequestPayload {
  content: string
  voice: Voice
}

export interface ResponsePayload {
  content: string
  language?: string
  voice?: Voice
}

export interface MessageFilter {
  (message:string): string
}