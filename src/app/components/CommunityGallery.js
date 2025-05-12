const CommunityGallery = () => {
    const communityImages = [
        'https://lh3.googleusercontent.com/pw/AP1GczP-Zh70IoOHXEMYL_pko1KGHjzKFDtfZa-8PfGiTc9gjC7zLLF7UOafd1QLJXQO61rU-0J45I-aSBYAs1i2LTrFt6oW4B0_7diPmdKtITEC7EHXmEXXIyrP8AF0XhlNKy-pBAGlhihyg-ZIt9ZJa-U=w1416-h1888-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczPnPpT1PxLBViHoXhxGNYDV2f3FmZ1hX5dSGIeX5ueQTna2-X094AHS5ReTYyvvrXPeADjLANU-ytB5G59BgvaeM-1H_mKQMV4lfOSLo-WhFpOs44dkSxrO4v6g7S4tTfnXEmtKjUpqXxhGPcKMss0=w1416-h1888-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczNkK2rUzS2_cyyWhimhVb2K7kbEJjsam-K5hl4KNbHIUCBgCowsc9SovqRxOrLWMkJYI02RQgOWLGfnkL8VL1dS6_811un41025kbbh-HuRTWL_YtIu0WhHw45mDxN_VWcF_asa3oGJQzlVvagQ_bM=w1416-h1888-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczMWLHW7DKWwCnjWxV_iOSI8L5FQ4Agf1v1xM7mOmbT4XsbtryjWzfIEw7euA-RysbIEChnoLg7eFsaQAwTgwBnzVoGlnZpuCK42Bz4WXJYmbsjFEwNJn-2jieTLbgMO88xpOjIOBWzSza-iDW7z-5c=w1416-h1888-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczN9I1u4V-jRYAkkD526IWoJY-Ma1WIpwIG2eM2UU5MNTc8BPJe0FjXiwns_cZMQF1G70j3zKeSynzcTrCT1tC_vSTNCltLSDdplkgsg3gkTcjxX-sLA5nZuFqXN1krtbt7kaum9NaGh7cJZhsJYylU=w1416-h1888-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczOrTNEJMJREAu4pmtLc72Wx7CqX2yBIdHAynn7ClGuW97ulh701fLCTX1tkwrRDaDg2SRQf8EwOi_UklTKkzykE6QOVglTHBYT7g-PAtY9dGa1re5OKv4YAGezQB9eP_xDoCpFu9sDFKBmr90YxKns=w1416-h1888-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczOHCqh2w1enIdvwGV92EgQ6k9jBtYIGNvO7Fac2ay-zt1EyOUJoZktMrBHmyv2cC-WO4wtpNpgwxsB73RtKFq_ilmebVVUkLMMz8xdElYCAirz5DuIP7a-hjN_yQE3mwzdR4tnqQRybFhD4E4PSnUw=w1416-h1888-s-no-gm?authuser=0',
        'https://lh3.googleusercontent.com/pw/AP1GczO1mFnj5l6_m4h04OLhDl4Qf_YS4c1njstVpJMDub4yceOnJ4VeWFcVI1xNOxZ3jy0cLrEpnJo_UoLe5LDnnY7UpRZhcY-w1PABSgqXubZILh7y8uTpNdFjk9HpU0rCrs_xCBZEohzgRWYAxTee0YE=w1062-h1888-s-no-gm?authuser=0'
      ];
  return (
    <section className="">
    <div className="">
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 ">
        {communityImages.map((image, index) => (
          <div key={index} className="overflow-hidden relative h-36 sm:h-72">
            <img
              src={image}
              alt={`Community photo ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default CommunityGallery