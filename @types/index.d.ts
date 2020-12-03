interface Voice {
  type?: string
  pitch?: number
  speed?: number
}

interface RequestPayload {
  content: string
  voice: Voice
}

interface ResponsePayload {
  content: string
  language?: string
  voice?: Voice
}

interface MessageFilter {
  (message:string): string
}