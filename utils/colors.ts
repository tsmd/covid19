export interface GraphFillStyle {
  type: 'solid' | 'diagonal'
  strokeColor: string
  baseColor: string
  altColor?: string
  invert?: boolean
}

export const single: string = '#006400'
export const double: string[] = ['#006400', '#1B75BC']
export const triple: string[] = ['#00441B', '#006400', '#1B75BC']
export const quadruple: string[] = ['#00441B', '#006400', '#1B75BC', '#505B00']

const graphSeries: GraphFillStyle[] = [
  {
    type: 'solid',
    strokeColor: '#5c8058',
    baseColor: '#1b4d30'
  },
  {
    type: 'diagonal',
    strokeColor: '#5c8058',
    baseColor: '#1b4d30',
    altColor: '#ffffff',
    invert: false
  },
  {
    type: 'solid',
    strokeColor: '#5c8058',
    baseColor: '#00a040'
  },
  {
    type: 'diagonal',
    strokeColor: '#5c8058',
    baseColor: '#00a040',
    altColor: '#ffffff',
    invert: true
  },
  {
    type: 'solid',
    strokeColor: '#5c8058',
    baseColor: '#c5e2c6'
  }
]

export const graphSeriesSingle = [graphSeries[0]]
export const graphSeriesDouble = [graphSeries[0], graphSeries[2]]
export const graphSeriesTriple = [
  graphSeries[0],
  graphSeries[2],
  graphSeries[4]
]
export const graphSeriesQuadruple = [
  graphSeries[0],
  graphSeries[1],
  graphSeries[2],
  graphSeries[3]
]
export const graphSeriesQuintuple = [
  graphSeries[0],
  graphSeries[1],
  graphSeries[2],
  graphSeries[3],
  graphSeries[4]
]

export function getGraphSeries(seriesLength: number) {
  switch (seriesLength) {
    case 1:
      return graphSeriesSingle
    case 2:
      return graphSeriesDouble
    case 3:
      return graphSeriesTriple
    case 4:
      return graphSeriesQuadruple
    default:
      return graphSeriesQuintuple
  }
}
