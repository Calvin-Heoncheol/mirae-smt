/**
 * 사이트 전역 설정 — 회사 정보를 한 곳에서 관리합니다.
 * 실제 데이터로 이 파일만 수정하면 사이트 전체에 반영됩니다.
 */

export const siteConfig = {
  name: {
    ko: '미래SMT',
    en: 'Mirae SMT',
  },
  shortName: 'MIRAE SMT',
  tagline: {
    ko: '신뢰할 수 있는 OEM/ODM 종합 제조 파트너',
    en: 'Your Trusted OEM/ODM Manufacturing Partner',
  },
  description: {
    ko: 'SMT부터 PCB 조립, 완제품 조립, 검사, 포장까지 — 전 공정을 책임지는 통합 제조 솔루션.',
    en: 'From SMT and PCB assembly to final product assembly, inspection, and packaging — your end-to-end manufacturing solution.',
  },
  url: 'https://example.com',

  contact: {
    email: 'miraesmtamerica@gmail.com',
    phone: {
      ko: '032-326-4850',
      en: '+82-32-326-4850',
      tel: '+82-32-326-4850',
    },
    address: {
      ko: '경기도 부천시 오정구 삼정동 364 부천테크노파크 102동 405호',
      en: '#405, Bldg. 102, Bucheon Technopark, 364 Samjeong-dong, Ojeong-gu, Bucheon-si, Gyeonggi-do, South Korea',
    },
    businessHours: {
      ko: '평일 09:00 ~ 18:00 (주말/공휴일 휴무)',
      en: 'Mon-Fri 09:00 ~ 18:00 (Closed on weekends & holidays)',
    },
  },

  company: {
    founded: 1993,
    employees: '120+',
    factoryArea: '4,200m²',
    monthlyCapa: '8M+ pcs',
    certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'IATF 16949 (Pending)'],
    ceoPhoto: '/images/logo/CEO.png',
  },

  social: {
    linkedin: '',
    youtube: '',
  },

  // 회사 소개 영상 (YouTube)
  // youtubeId만 바꾸면 사이트에 반영됩니다.
  // 예: https://www.youtube.com/watch?v=dQw4w9WgXcQ → youtubeId: 'dQw4w9WgXcQ'
  video: {
    youtubeId: 'fWewMfFqnWI',
    customThumbnail: '/images/Thumbnail.png',
  },

  // 협력 기업 로고 (public/images/logo/)
  clientLogos: {
    hyundai_rotem: '/images/logo/HYUNDAI_ROTEM.svg',
    txr_robotics: '/images/logo/TXR_ROBOTICS.jpg',
    e_seek: '/images/logo/E-SEEK.jpeg',
    raonark: '/images/logo/RAONARK.png',
    leetek: '/images/logo/LEETEK.png',
    seochang: '/images/logo/SEOCHANG.jpg',
    csi_ntech: '/images/logo/CSIN.png',
    fastech: '/images/logo/FASTECH.png',
    costimo: '/images/logo/COSTIMO.png',
  },

  // 페이지 히어로 배경 이미지 (public/images/background/)
  backgrounds: {
    home: '/images/background/Home.png',
    about: '/images/background/Company_Introduce.png',
    capabilities: '/images/background/Facilities.png',
    facilities: '/images/background/Facilities.png',
    quality: '/images/background/quality.png',
  },
} as const;

export type SiteConfig = typeof siteConfig;
