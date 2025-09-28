// URL映射配置 - 用于支持SEO友好URL
// 同时保持现有哈希路由系统的兼容性

export interface UrlMapping {
  // SEO友好URL路径
  seoPath: string
  // 对应的哈希路由
  hashRoute: string
  // 页面标题（用于SEO）
  title: string
  // 页面描述（用于SEO）
  description: string
  // 路由参数模式（如果有的话）
  pattern?: RegExp
}

// 主要路由映射
export const urlMappings: UrlMapping[] = [
  {
    seoPath: '/',
    hashRoute: '',
    title: 'Thwordle : Thai Wordle เวอเดิ้ลภาษาไทย',
    description: 'Thwordle : เวอเดิ้ลภาษาไทย - เกมทายคำภาษาไทยที่สนุกที่สุด'
  },
  {
    seoPath: '/training',
    hashRoute: '#/training',
    title: 'Thwordle Training - ฝึกเล่น Thwordle',
    description: 'ฝึกเล่น Thwordle เกมทายคำภาษาไทยได้ไม่จำกัด'
  },
  {
    seoPath: '/help',
    hashRoute: '#/help',
    title: 'Thwordle Help - คู่มือการเล่น เวอเดิ้ลภาษาไทย',
    description: 'คู่มือการเล่น Thwordle วิธีเล่น เทคนิค และ FAQ เกมทายคำภาษาไทย thwordle help ไทยเวอเดิ้ล เวอเดิลไทย'
  },
  {
    seoPath: '/how-to-play',
    hashRoute: '#/how-to-play',
    title: 'How to Play Thwordle - วิธีเล่นเวอเดิ้ลภาษาไทย',
    description: 'เรียนรู้วิธีเล่น Thwordle ตั้งแต่เริ่มต้น กติกา เทคนิค และเคล็ดลับการทายคำภาษาไทยให้แม่นยำ'
  },
  {
    seoPath: '/faq',
    hashRoute: '#/faq',
    title: 'FAQ - คำถามที่พบบ่อยเกี่ยวกับ Thwordle',
    description: 'คำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับ Thwordle เวอเดิ้ลภาษาไทย การเล่น การแชร์ และฟีเจอร์ต่าง ๆ'
  },
  {
    seoPath: '/archive',
    hashRoute: '#/archive',
    title: 'Thwordle Archive - คลังคำตอบประจำวัน',
    description: 'รวมคำตอบประจำวันของ Thwordle พร้อมคำอธิบายและเทคนิคการแก้ปัญหา เรียนรู้จากคำตอบที่ผ่านมา'
  },
  {
    seoPath: '/blog',
    hashRoute: '#/blog',
    title: 'บล็อก Thwordle - อัพเดทและบทความ',
    description: 'อ่านบทความล่าสุด อัพเดทฟีเจอร์ใหม่ เทคนิคการเล่น และเรื่องราวน่าสนใจจาก Thwordle เวอเดิ้ลภาษาไทย'
  },
  {
    seoPath: '/about',
    hashRoute: '#/about',
    title: 'เกี่ยวกับ Thwordle - เวอเดิ้ลภาษาไทย',
    description: 'ประวัติและที่มาของ Thwordle เกมทายคำภาษาไทย ทีมพัฒนา และวิสัยทัศน์ในการส่งเสริมภาษาไทย'
  },
  {
    seoPath: '/privacy',
    hashRoute: '#/privacy',
    title: 'นโยบายความเป็นส่วนตัว - Thwordle',
    description: 'นโยบายความเป็นส่วนตัวของ Thwordle การเก็บรวบรวมข้อมูล การใช้งาน และการคุ้มครองข้อมูลส่วนบุคคล'
  },
  {
    seoPath: '/terms',
    hashRoute: '#/terms',
    title: 'เงื่อนไขการใช้งาน - Thwordle',
    description: 'เงื่อนไขการใช้งานเว็บไซต์ Thwordle กฎระเบียบ ข้อจำกัด และข้อกำหนดในการเล่นเกม'
  },
  {
    seoPath: '/404',
    hashRoute: '#/404',
    title: '404 - ไม่พบหน้าที่ต้องการ | Thwordle',
    description: 'ขออภัย หน้าที่คุณต้องการไม่พบ กลับไปเล่น Thwordle เวอเดิ้ลภาษาไทยได้เลย'
  },
  // 特殊关卡路由映射
  {
    seoPath: '/special/special1',
    hashRoute: '#/s/special1',
    title: 'Thwordle Special 1 - ด่านพิเศษ 1',
    description: 'เล่น Thwordle ด่านพิเศษที่ 1'
  },
  {
    seoPath: '/special/s2',
    hashRoute: '#/s/s2',
    title: 'Thwordle Special 2 - ด่านพิเศษ 2',
    description: 'เล่น Thwordle ด่านพิเศษที่ 2'
  },
  {
    seoPath: '/special/s3',
    hashRoute: '#/s/s3b3a35b99',
    title: 'Thwordle Special 3 - ด่านพิเศษ 3',
    description: 'เล่น Thwordle ด่านพิเศษที่ 3'
  },
  {
    seoPath: '/special/s4',
    hashRoute: '#/s/s4_7d7f803a',
    title: 'Thwordle Special 4 - ด่านพิเศษ 4',
    description: 'เล่น Thwordle ด่านพิเศษที่ 4'
  },
  {
    seoPath: '/special/s5',
    hashRoute: '#/s/s5_34c6e86d',
    title: 'Thwordle Special 5 - ด่านพิเศษ 5',
    description: 'เล่น Thwordle ด่านพิเศษที่ 5'
  },
  {
    seoPath: '/special/s6',
    hashRoute: '#/s/s6_dfbe2baa',
    title: 'Thwordle Special 6 - ด่านพิเศษ 6',
    description: 'เล่น Thwordle ด่านพิเศษที่ 6'
  },
  {
    seoPath: '/special/s7',
    hashRoute: '#/s/s7_761d3701',
    title: 'Thwordle Special 7 - ด่านพิเศษ 7',
    description: 'เล่น Thwordle ด่านพิเศษที่ 7'
  },
  {
    seoPath: '/special/s8',
    hashRoute: '#/s/s8_cf3db809',
    title: 'Thwordle Special 8 - ด่านพิเศษ 8',
    description: 'เล่น Thwordle ด่านพิเศษที่ 8'
  },
  {
    seoPath: '/special/s9',
    hashRoute: '#/s/s9_03db',
    title: 'Thwordle Special 9 - ด่านพิเศษ 9',
    description: 'เล่น Thwordle ด่านพิเศษที่ 9'
  },
  {
    seoPath: '/special/s10',
    hashRoute: '#/s/s10_4aa3',
    title: 'Thwordle Special 10 - ด่านพิเศษ 10',
    description: 'เล่น Thwordle ด่านพิเศษที่ 10'
  },
  {
    seoPath: '/special/s11',
    hashRoute: '#/s/s11_e846',
    title: 'Thwordle Special 11 - ด่านพิเศษ 11',
    description: 'เล่น Thwordle ด่านพิเศษที่ 11'
  },
  {
    seoPath: '/special/s12',
    hashRoute: '#/s/s12_9c55',
    title: 'Thwordle Special 12 - ด่านพิเศษ 12',
    description: 'เล่น Thwordle ด่านพิเศษที่ 12'
  },
  {
    seoPath: '/special/s13',
    hashRoute: '#/s/s13_68a6',
    title: 'Thwordle Special 13 - ด่านพิเศษ 13',
    description: 'เล่น Thwordle ด่านพิเศษที่ 13'
  },
  {
    seoPath: '/special/s14',
    hashRoute: '#/s/s14_193f',
    title: 'Thwordle Special 14 - ด่านพิเศษ 14',
    description: 'เล่น Thwordle ด่านพิเศษที่ 14'
  },
  {
    seoPath: '/special/s15',
    hashRoute: '#/s/s15_472e',
    title: 'Thwordle Special 15 - ด่านพิเศษ 15',
    description: 'เล่น Thwordle ด่านพิเศษที่ 15'
  },
  {
    seoPath: '/special/s16',
    hashRoute: '#/s/s16_e481',
    title: 'Thwordle Special 16 - ด่านพิเศษ 16',
    description: 'เล่น Thwordle ด่านพิเศษที่ 16'
  },
  {
    seoPath: '/special/s17',
    hashRoute: '#/s/s17_2f5a',
    title: 'Thwordle Special 17 - ด่านพิเศษ 17',
    description: 'เล่น Thwordle ด่านพิเศษที่ 17'
  },
  {
    seoPath: '/special/s18',
    hashRoute: '#/s/s18_03fe',
    title: 'Thwordle Special 18 - ด่านพิเศษ 18',
    description: 'เล่น Thwordle ด่านพิเศษที่ 18'
  },
  {
    seoPath: '/special/s19',
    hashRoute: '#/s/s19_b8f4',
    title: 'Thwordle Special 19 - ด่านพิเศษ 19',
    description: 'เล่น Thwordle ด่านพิเศษที่ 19'
  },
  {
    seoPath: '/special/s20',
    hashRoute: '#/s/s20_02af',
    title: 'Thwordle Special 20 - ด่านพิเศษ 20',
    description: 'เล่น Thwordle ด่านพิเศษที่ 20'
  },
  {
    seoPath: '/special/s21',
    hashRoute: '#/s/s21_9beb',
    title: 'Thwordle Special 21 - ด่านพิเศษ 21',
    description: 'เล่น Thwordle ด่านพิเศษที่ 21'
  },
  {
    seoPath: '/special/s22',
    hashRoute: '#/s/s22_4f8e',
    title: 'Thwordle Special 22 - ด่านพิเศษ 22',
    description: 'เล่น Thwordle ด่านพิเศษที่ 22'
  }
]

// 辅助函数：根据SEO路径获取哈希路由
export function getHashRouteFromSeoPath(seoPath: string): string | null {
  const mapping = urlMappings.find(m => m.seoPath === seoPath)
  return mapping ? mapping.hashRoute : null
}

// 辅助函数：根据哈希路由获取SEO路径
export function getSeoPathFromHashRoute(hashRoute: string): string | null {
  const mapping = urlMappings.find(m => m.hashRoute === hashRoute)
  return mapping ? mapping.seoPath : null
}

// 辅助函数：获取页面元数据
export function getPageMetadata(seoPath: string): { title: string; description: string } | null {
  const mapping = urlMappings.find(m => m.seoPath === seoPath)
  return mapping ? { title: mapping.title, description: mapping.description } : null
}

// 辅助函数：检查是否为有效的SEO路径
export function isValidSeoPath(path: string): boolean {
  return urlMappings.some(m => m.seoPath === path)
}