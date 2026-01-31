export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: '株式会社KANAE',
    alternateName: 'KANAE Co., Ltd.',
    url: 'https://www.kanae-tokyo.com',
    logo: 'https://www.kanae-tokyo.com/logo.png',
    description: '不動産事業（賃貸・売買・管理・民泊）を通じて、お客様と社会の幸福を実現します。',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '高田3-16-4 Golje Bld. 6F',
      addressLocality: '豊島区',
      addressRegion: '東京都',
      postalCode: '171-0033',
      addressCountry: 'JP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+81-3-XXXX-XXXX',
      contactType: 'customer service',
      areaServed: 'JP',
      availableLanguage: ['Japanese', 'Chinese', 'English'],
    },
    sameAs: [
      'https://www.kanae-tokyo.com/ja',
      'https://www.kanae-tokyo.com/zh',
      'https://www.kanae-tokyo.com/en',
    ],
    founder: {
      '@type': 'Person',
      name: '代表取締役',
    },
    foundingDate: '2021',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 10,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 35.7126,
        longitude: 139.7037,
      },
      geoRadius: '50000',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '賃貸仲介サービス',
          description: 'エリア・沿線・賃料・間取りなど、お客様のニーズに合わせた物件検索サービス',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '売買仲介サービス',
          description: 'マンション・戸建・土地・投資用物件まで、幅広い不動産売買のサポート',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '賃貸管理サービス',
          description: '賃貸物件の総合管理サービスで、オーナー様の資産価値を守ります',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '民泊運営サービス',
          description: 'OneStep PMS連動で、民泊運営を完全サポート。収益最大化を実現',
        },
      },
    ],
  }
}

export function generateBreadcrumbSchema(locale: string, pageName?: string) {
  const baseUrl = 'https://www.kanae-tokyo.com'
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: `${baseUrl}/${locale}`,
    },
  ]

  if (pageName) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: pageName,
      item: `${baseUrl}/${locale}/${pageName.toLowerCase()}`,
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}
