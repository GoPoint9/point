// * global
declare global {
  interface Navigator {
    browserLanguage: string
  }

  interface Window {
    MSStream: boolean
    gtag: any
    fbq: any
    webkit: any
    external: any
    CONFIG: any
  }

  interface PageQuery {
    pageSize: number
    pageNo: number
    [key: string]: any
  }
  interface IRes {
    data: any
    code: number
    msg: string
    msgCode: number
  }
  interface ListRes<T> extends IRes {
    data: {
      list: T[]
      pageNo: number
      totalCount: number
      totalPage: number
    }
  }
  interface ObjRes<T> extends IRes {
    data: T
  }
  /**
   * @返回分页参数
   * @pageSize 每页数据量大小
   * @pageNo 当前页
   * @totalCount 总条数
   */
  interface MessageData<T> {
    list: Array<T>
    pageNo: number
    totalPage: number
    totalCount: number
  }

  type CommonRes<T> = AxiosResponse<ListRes<T>>
  type CommonObjRes<T> = AxiosResponse<ObjRes<T>>
  type ObjResNull<T> = ObjRes<T> | null
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $u: any
    $selArr: any
  }
}

export {}
