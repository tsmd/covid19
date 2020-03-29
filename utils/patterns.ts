import { GraphFillStyle } from '@/utils/colors'

export interface Pattern {
  getPattern(color: GraphFillStyle): CanvasPattern | string
}

export type NormalizedColor = {
  strokeColor: string
  baseColor: string
  altColor: string
}

abstract class AbstractPattern implements Pattern {
  protected style: GraphFillStyle
  protected normalizedStyle: NormalizedColor
  protected cache: Record<string, CanvasPattern> = {}

  constructor(style: GraphFillStyle) {
    this.style = style
    this.normalizedStyle = AbstractPattern.normalizeColor(this.style)
  }

  protected hasCache() {
    return this.cacheKey in this.cache
  }

  protected getCache(): CanvasPattern | undefined {
    return this.cache[this.cacheKey]
  }

  protected setCache(pattern: CanvasPattern) {
    this.cache[this.cacheKey] = pattern
  }

  abstract get cacheKey(): string

  abstract getPattern(): CanvasPattern | string

  static normalizeColor(style: GraphFillStyle): NormalizedColor {
    const {
      baseColor,
      strokeColor,
      altColor = baseColor,
      invert = false
    } = style
    return {
      strokeColor,
      baseColor: invert ? altColor : baseColor,
      altColor: invert ? baseColor : altColor
    }
  }
}

export class SolidPattern extends AbstractPattern {
  getPattern(): string {
    return this.style.baseColor
  }

  get cacheKey(): string {
    return ''
  }
}

export class DiagonalPattern extends AbstractPattern {
  getPattern(): CanvasPattern | string {
    if (this.hasCache()) {
      return this.getCache()!
    }
    if (!process.browser) {
      return this.normalizedStyle.baseColor
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')!
    canvas.width = canvas.height = 5
    context.fillStyle = this.normalizedStyle.baseColor
    context.strokeStyle = this.normalizedStyle.altColor
    context.lineWidth = 1
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.beginPath()
    context.moveTo(0, -2)
    context.lineTo(5, 3)
    context.moveTo(0, 3)
    context.lineTo(5, 8)
    context.stroke()

    const pattern = context.createPattern(canvas, 'repeat')!
    this.setCache(pattern)

    return pattern
  }

  get cacheKey(): string {
    return `${this.normalizedStyle.baseColor},${this.normalizedStyle.altColor}`
  }
}

export function patternFactory(style: GraphFillStyle): CanvasPattern | string {
  switch (style.type) {
    case 'solid':
      return new SolidPattern(style).getPattern()
    case 'diagonal':
      return new DiagonalPattern(style).getPattern()
  }
}
