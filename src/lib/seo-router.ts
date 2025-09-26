// SEO路由器 - 处理SEO友好URL和哈希路由的转换
// 保持现有哈希路由系统不变的同时，支持SEO友好URL

import { getHashRouteFromSeoPath, getSeoPathFromHashRoute, getPageMetadata } from './url-mapping'

export class SeoRouter {
  private static instance: SeoRouter
  private initialized = false

  private constructor() {}

  static getInstance(): SeoRouter {
    if (!SeoRouter.instance) {
      SeoRouter.instance = new SeoRouter()
    }
    return SeoRouter.instance
  }

  // 初始化SEO路由器
  init(): void {
    if (this.initialized || typeof window === 'undefined') {
      return
    }

    this.handleInitialUrl()
    this.setupUrlWatchers()
    this.initialized = true
  }

  // 处理页面初始加载时的URL
  private handleInitialUrl(): void {
    const currentPath = window.location.pathname
    const currentHash = window.location.hash

    console.log('🔍 SEO Router - Initial URL Check:', { currentPath, currentHash })

    // 如果访问的是SEO友好URL，则重定向到对应的哈希URL
    if (currentPath !== '/' && !currentHash) {
      const hashRoute = getHashRouteFromSeoPath(currentPath)
      console.log('🔄 SEO Router - Found mapping:', { seoPath: currentPath, hashRoute })

      if (hashRoute) {
        // 使用replaceState避免在浏览器历史中留下记录
        const newUrl = window.location.origin + '/' + hashRoute
        console.log('🚀 SEO Router - Redirecting to:', newUrl)
        window.history.replaceState({}, '', newUrl)

        // 更新页面标题和描述
        this.updatePageMetadata(currentPath)

        // 触发哈希变化事件，让应用路由系统响应
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      } else {
        // 没有找到映射的路径，直接返回首页而不显示 404
        // 这样可以避免 AdSense 检测到"在不包含发布商内容的屏幕上展示广告"
        console.log('❌ SEO Router - No mapping found, staying on home page:', { seoPath: currentPath })
        const newUrl = window.location.origin + '/'
        window.history.replaceState({}, '', newUrl)

        // 更新页面标题和描述为首页
        this.updatePageMetadata('/')

        // 不触发哈希变化事件，保持首页状态
      }
    }

    // 如果有哈希路由，确保页面标题正确
    if (currentHash) {
      const seoPath = getSeoPathFromHashRoute(currentHash)
      if (seoPath) {
        console.log('📝 SEO Router - Updating metadata for hash:', { currentHash, seoPath })
        this.updatePageMetadata(seoPath)
      }
    }
  }

  // 设置URL监听器
  private setupUrlWatchers(): void {
    // 监听哈希变化，更新页面元数据
    window.addEventListener('hashchange', () => {
      const currentHash = window.location.hash
      const seoPath = getSeoPathFromHashRoute(currentHash)
      if (seoPath) {
        this.updatePageMetadata(seoPath)
        // 可选：同步更新浏览器地址栏显示SEO友好URL（不触发页面刷新）
        this.updateBrowserUrl(seoPath)
      }
    })

    // 监听历史状态变化
    window.addEventListener('popstate', () => {
      this.handleInitialUrl()
    })
  }

  // 更新页面元数据
  private updatePageMetadata(seoPath: string): void {
    const metadata = getPageMetadata(seoPath)
    if (metadata) {
      document.title = metadata.title

      // 更新meta描述
      let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement
      if (!descMeta) {
        descMeta = document.createElement('meta')
        descMeta.name = 'description'
        document.head.appendChild(descMeta)
      }
      descMeta.content = metadata.description

      // 更新OpenGraph标题
      let ogTitleMeta = document.querySelector('meta[property="og:title"]') as HTMLMetaElement
      if (ogTitleMeta) {
        ogTitleMeta.content = metadata.title
      }

      // 更新OpenGraph描述
      let ogDescMeta = document.querySelector('meta[property="og:description"]') as HTMLMetaElement
      if (ogDescMeta) {
        ogDescMeta.content = metadata.description
      }

      // 更新Twitter标题
      let twitterTitleMeta = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement
      if (twitterTitleMeta) {
        twitterTitleMeta.content = metadata.title
      }
    }
  }

  // 可选：更新浏览器地址栏显示SEO友好URL（实验性功能）
  private updateBrowserUrl(seoPath: string): void {
    // 这个功能可能会影响用户体验，所以暂时禁用
    // 如果需要，可以根据配置来开启
    const enableSeoUrlDisplay = false

    if (enableSeoUrlDisplay && seoPath !== '/') {
      const newUrl = window.location.origin + seoPath
      // 使用replaceState更新URL但不刷新页面
      window.history.replaceState({}, '', newUrl)
    }
  }

  // 生成SEO友好的分享链接
  generateShareUrl(hashRoute: string): string {
    const seoPath = getSeoPathFromHashRoute(hashRoute)
    if (seoPath && seoPath !== '/') {
      return `${window.location.origin}${seoPath}`
    }
    return `${window.location.origin}/${hashRoute}`
  }

  // 获取当前页面的规范URL（用于SEO）
  getCanonicalUrl(): string {
    const currentHash = window.location.hash
    const seoPath = getSeoPathFromHashRoute(currentHash)
    if (seoPath && seoPath !== '/') {
      return `${window.location.origin}${seoPath}`
    }
    return window.location.origin + '/'
  }
}

// 导出单例实例
export const seoRouter = SeoRouter.getInstance()