import { getHashRouteFromSeoPath, getSeoPathFromHashRoute, getPageMetadata, isValidSeoPath } from '../src/lib/url-mapping'

describe('404 Page URL Mapping', () => {
  it('should have 404 route mapping', () => {
    const hashRoute = getHashRouteFromSeoPath('/404')
    expect(hashRoute).toBe('#/404')
  })

  it('should return SEO path for 404 hash route', () => {
    const seoPath = getSeoPathFromHashRoute('#/404')
    expect(seoPath).toBe('/404')
  })

  it('should return 404 page metadata', () => {
    const metadata = getPageMetadata('/404')
    expect(metadata).not.toBeNull()
    expect(metadata?.title).toContain('404')
    expect(metadata?.description).toContain('ไม่พบ')
  })

  it('should recognize /404 as valid SEO path', () => {
    expect(isValidSeoPath('/404')).toBe(true)
  })

  it('should return null for invalid SEO paths', () => {
    const hashRoute = getHashRouteFromSeoPath('/nonexistent-path')
    expect(hashRoute).toBeNull()
  })

  it('should return null for invalid hash routes', () => {
    const seoPath = getSeoPathFromHashRoute('#/nonexistent')
    expect(seoPath).toBeNull()
  })
})