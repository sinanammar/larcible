const sdk = require('api')('@nftport/v0#1900g1olewpx69w')
const AppError = require('../AppError')

module.exports.getAllNfts = async () => {
  sdk.auth('b89239e9-f6ca-4b12-a5d7-bdf14fdf7ef3')
  const nftData = await sdk.retrieveAllNfts({
    chain: 'ethereum',
    page_size: '50',
    include: ['all', 'default'],
  })

  if (nftData.data.response !== 'OK') {
    throw new AppError('Something went wrong, try again!', 400)
  }
  return nftData
}

module.exports.getNftDetails = async (contractAddress, tokenId) => {
  sdk.auth('b89239e9-f6ca-4b12-a5d7-bdf14fdf7ef3')
  const nftDetails = await sdk.retrieveNftDetails({
    chain: 'ethereum',
    refresh_metadata: 'false',
    contract_address: contractAddress, // '0x2bd938cf96430b7b0879f76b010b589aeec2127c',
    token_id: tokenId, // '128690',
  })

  if (nftDetails.data.response !== 'OK') {
    throw new AppError('Something went wrong, try again!', 400)
  }
  return nftDetails
}

module.exports.getTopRankingNfts = async (pageNumber, timeFrame) => {
  // Time frame = 24h 7d 30d all
  sdk.auth('b89239e9-f6ca-4b12-a5d7-bdf14fdf7ef3')
  const topRankingNfts = await sdk.retrieveTopContracts({
    page_size: '9',
    page_number: pageNumber,
    period: timeFrame,
    order_by: 'sales',
    chain: 'ethereum',
  })

  if (topRankingNfts.data.response !== 'OK') {
    throw new AppError('Something went wrong, try again!', 400)
  }
  return topRankingNfts
}
