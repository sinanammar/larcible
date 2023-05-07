import { Box, Text } from '@chakra-ui/react'
import styles from './styles.module.css'
import useColorModeStore from '../../store/colorModeStore'

const TermsOfservices = () => {
  const { colorMode } = useColorModeStore()
  return (
    <Box>
      <Text className={styles.title}>Terms of Services</Text>
      <Text className={styles[`sub-title-${colorMode}`]}>
        Buy and sell NFTs from the worlds top artists
      </Text>
      <Text className={styles[`content-${colorMode}`]}>
        These Supplemental Terms (“Supplemental Terms”) supplement the Terms and
        Conditions (“Terms”) for the Platform provided by Bybit Fintech Limited (“we”,
        “us” or “our”). These Supplemental Terms together with the Terms governs
        transactions for NFTs made through the Platform. In the event of any conflict
        between these Supplemental Terms and the Terms, the Terms will prevail.
        <br /> <br /> By listing, selling, buying or trading NFTs through the Platform,
        you agree to and are bound by both these Supplemental Terms and the Terms for the
        Platform. If you do not agree to the Supplemental Terms or the Terms for the
        Platform, you may not list, sell, buy or trade NFTs through the Platform.
      </Text>
      <Text className={styles['header']}>License to use your content</Text>
      <Text className={styles[`content-${colorMode}`]}>
        “Art” means any art, design, or drawings (in any form or media, including, without
        limitation, video or photographs) that may be associated with a Licensed NFT.
        "NFT" means any blockchain-tracked, non-fungible token, such as those conforming
        to the ERC-721 and ERC 1155 standards or otherwise designed by the Platform.{' '}
        <br />
        <br />
        “Licensed NFT” means an NFT that is posted and made available on the Platform for
        a Transaction.“Licensor” means a third party that owns or is the licensor of the
        Art in the Licensed NFT
      </Text>
      <Text className={styles['header']}>Our content and the content of others</Text>
      <Text className={styles[`content-${colorMode}`]} pb="90px">
        “Third Party IP” means any third-party patent rights (including, without
        limitation, patent applications and disclosures), copyrights, trade secrets,
        trademarks, know-how, rights of publicity (e.g. of another person’s name and
        likeness), right of privacy or any other intellectual property rights recognized
        in any country or jurisdiction in the world. <br /> <br /> “Transaction” means any
        listing, purchase, sale or trade of a Licensed NFT through the Platform.
        Eligibility. To conduct a Transaction regarding Licensed NFTs, you must meet the
        criteria for eligibility to use the Platform and have an Account in good standing
        with the Platform.
        <br /> <br /> Listing and Selling of Licensed NFTs. We may list our own Licensed
        NFTs or allow users to list their Licensed NFTs for Transactions through the
        Platform. You can only list a Licensed NFT if you have the rights to grant the
        license to the Licensed NFT set forth in Section 7.c. hereof or purchased the
        Licensed NFT through the Platform or other legitimate source validated by us. You
        agree to any listing policies we may implement for Licensed NFTs. You may not list
        or conduct a Transaction regarding a Licensed NFT that violates Section 12.2 or
        any other provision of the Terms.
        <br /> <br /> Please check these Terms periodically for changes. Any changes to
        the Supplemental Terms will apply on the date that they are made and, by way of
        example, your continued access to or use of the Licensed NFT after the
        Supplemental Terms have been updated will constitute your binding acceptance of
        the updates.
      </Text>
    </Box>
  )
}

export default TermsOfservices
