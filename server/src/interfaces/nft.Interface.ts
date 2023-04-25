export interface INft {
  name: string
  description: string
  sellingMethod: string
  category: string
  price: string
  size: string
  royalties: string
  creator: string
}

export interface IBid {
  bidderId: string
  nftId: string
  bidValue: any
}
