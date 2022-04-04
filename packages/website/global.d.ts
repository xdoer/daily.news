/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="@daily.news/types" />

declare module '@prequest/types' {
  export interface PQResponse<T> {
    result: T
    errorCode: string
    errorMessage: string
    success: boolean
  }
}
