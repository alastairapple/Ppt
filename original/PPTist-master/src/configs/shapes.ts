/* eslint-disable max-lines */

// Non-design professionals can use this application to draw basic shapes: https://github.com/pipipi-pikachu/svgPathCreator

import { ShapePathFormulasKeys } from '@/types/slides'

export interface ShapePoolItem {
  viewBox: [number, number]
  path: string
  special?: boolean
  pathFormula?: ShapePathFormulasKeys
  outlined?: boolean
  pptxShapeType?: string
  title?: string
  withborder?: boolean
}

interface ShapeListItem {
  type: string
  children: ShapePoolItem[]
}

export interface ShapePathFormula {
  editable?: boolean
  defaultValue?: number[]
  range?: [number, number][]
  relative?: string[]
  getBaseSize?: ((width: number, height: number) => number)[]
  formula: (width: number, height: number, values?: number[]) => string
}

export const SHAPE_PATH_FORMULAS: {
  [key: string]: ShapePathFormula
} = {
  [ShapePathFormulasKeys.ROUND_RECT]: {
    editable: true,
    defaultValue: [0.125],
    range: [[0, 0.5]],
    relative: ['left'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M ${radius} 0 L ${width - radius} 0 Q ${width} 0 ${width} ${radius} L ${width} ${height - radius} Q ${width} ${height} ${width - radius} ${height} L ${radius} ${height} Q 0 ${height} 0 ${height - radius} L 0 ${radius} Q 0 0 ${radius} 0 Z`
    }
  },
  [ShapePathFormulasKeys.CUT_RECT_DIAGONAL]: {
    editable: true,
    defaultValue: [0.2],
    range: [[0, 0.9]],
    relative: ['right'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M 0 ${height - radius} L 0 0 L ${width - radius} 0 L ${width} ${radius} L ${width} ${height} L ${radius} ${height} Z`
    }
  },
  [ShapePathFormulasKeys.CUT_RECT_SINGLE]: {
    editable: true,
    defaultValue: [0.2],
    range: [[0, 0.9]],
    relative: ['right'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M 0 ${height} L 0 0 L ${width - radius} 0 L ${width} ${radius} L ${width} ${height} Z`
    }
  },
  [ShapePathFormulasKeys.CUT_RECT_SAMESIDE]: {
    editable: true,
    defaultValue: [0.2],
    range: [[0, 0.5]],
    relative: ['left'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M 0 ${radius} L ${radius} 0 L ${width - radius} 0 L ${width} ${radius} L ${width} ${height} L 0 ${height} Z`
    }
  },
  [ShapePathFormulasKeys.ROUND_RECT_DIAGONAL]: {
    editable: true,
    defaultValue: [0.125],
    range: [[0, 1]],
    relative: ['left'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M ${radius} 0 L ${width} 0 L ${width} ${height - radius} Q ${width} ${height} ${width - radius} ${height} L 0 ${height} L 0 ${radius} Q 0 0 ${radius} 0 Z`
    }
  },
  [ShapePathFormulasKeys.ROUND_RECT_SINGLE]: {
    editable: true,
    defaultValue: [0.125],
    range: [[0, 1]],
    relative: ['right'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M 0 0 L ${width - radius} 0 Q ${width} 0 ${width} ${radius} L ${width} ${height} L 0 ${height} L 0 0 Z`
    }
  },
  [ShapePathFormulasKeys.ROUND_RECT_SAMESIDE]: {
    editable: true,
    defaultValue: [0.125],
    range: [[0, 0.5]],
    relative: ['left'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M 0 ${radius} Q 0 0 ${radius} 0 L ${width - radius} 0 Q ${width} 0 ${width} ${radius} L ${width} ${height} L 0 ${height} Z`
    }
  },
  [ShapePathFormulasKeys.CUT_ROUND_RECT]: {
    editable: true,
    defaultValue: [0.125],
    range: [[0, 0.5]],
    relative: ['left'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const radius = Math.min(width, height) * values![0]
      return `M ${radius} 0 L ${width - radius} 0 L ${width} ${radius} L ${width} ${height} L 0 ${height} L 0 ${radius} Q 0 0 ${radius} 0 Z`
    }
  },
  [ShapePathFormulasKeys.MESSAGE]: {
    editable: true,
    range: [[0, 0.8], [0.1, 0.3]],
    defaultValue: [0.3, 0.2],
    relative: ['left_bottom', 'bottom'],
    getBaseSize: [
      width => width,
      (width, height) => height,
    ],
    formula: (width, height, values) => {
      const point = width * values![0]
      const arrowWidth = width * 0.2
      const arrowheight = height * values![1]
      return `M 0 0 L ${width} 0 L ${width} ${height - arrowheight} L ${point + arrowWidth} ${height - arrowheight} L ${point} ${height} L ${point} ${height - arrowheight} L 0 ${height - arrowheight} Z`
    }
  },
  [ShapePathFormulasKeys.ROUND_MESSAGE]: {
    formula: (width, height) => {
      const radius = Math.min(width, height) * 0.125
      const arrowWidth = Math.min(width, height) * 0.2
      const arrowheight = Math.min(width, height) * 0.2
      return `M 0 ${radius} Q 0 0 ${radius} 0 L ${width - radius} 0 Q ${width} 0 ${width} ${radius} L ${width} ${height - radius - arrowheight} Q ${width} ${height - arrowheight} ${width - radius} ${height - arrowheight} L ${width / 2} ${height - arrowheight} L ${width / 2 - arrowWidth} ${height} L ${width / 2 - arrowWidth} ${height - arrowheight} L ${radius} ${height - arrowheight} Q 0 ${height - arrowheight} 0 ${height - radius - arrowheight} L 0 ${radius} Z`
    }
  },
  [ShapePathFormulasKeys.L]: {
    editable: true,
    defaultValue: [0.25],
    range: [[0.1, 0.9]],
    relative: ['left'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const lineWidth = Math.min(width, height) * values![0]
      return `M 0 0 L 0 ${height} L ${width} ${height} L ${width} ${height - lineWidth} L ${lineWidth} ${height - lineWidth} L ${lineWidth} 0 Z`
    }
  },
  [ShapePathFormulasKeys.RING_RECT]: {
    editable: true,
    defaultValue: [0.25],
    range: [[0.1, 0.45]],
    relative: ['left'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const lineWidth = Math.min(width, height) * values![0]
      return `M 0 0 ${width} 0 ${width} ${height} L 0 ${height} L 0 0 Z M ${lineWidth} ${lineWidth} L ${lineWidth} ${height - lineWidth} L ${width - lineWidth} ${height - lineWidth} L ${width - lineWidth} ${lineWidth} Z`
    }
  },
  [ShapePathFormulasKeys.PLUS]: {
    editable: true,
    defaultValue: [0.25],
    range: [[0.1, 0.9]],
    relative: ['center'],
    getBaseSize: [(width, height) => Math.min(width, height)],
    formula: (width, height, values) => {
      const lineWidth = Math.min(width, height) * values![0]
      return `M ${width / 2 - lineWidth / 2} 0 L ${width / 2 - lineWidth / 2} ${height / 2 - lineWidth / 2} L 0 ${height / 2 - lineWidth / 2} L 0 ${height / 2 + lineWidth / 2} L ${width / 2 - lineWidth / 2} ${height / 2 + lineWidth / 2} L ${width / 2 - lineWidth / 2} ${height} L ${width / 2 + lineWidth / 2} ${height} L ${width / 2 + lineWidth / 2} ${height / 2 + lineWidth / 2} L ${width} ${height / 2 + lineWidth / 2} L ${width} ${height / 2 - lineWidth / 2} L ${width / 2 + lineWidth / 2} ${height / 2 - lineWidth / 2} L ${width / 2 + lineWidth / 2} 0 Z`
    }
  },
  [ShapePathFormulasKeys.TRIANGLE]: {
    editable: true,
    defaultValue: [0.5],
    range: [[0, 1]],
    relative: ['left'],
    getBaseSize: [width => width],
    formula: (width, height, values) => {
      const vertex = width * values![0]
      return `M ${vertex} 0 L 0 ${height} L ${width} ${height} Z`
    }
  },
  [ShapePathFormulasKeys.PARALLELOGRAM_LEFT]: {
    editable: true,
    defaultValue: [0.25],
    range: [[0, 0.9]],
    relative: ['left'],
    getBaseSize: [width => width],
    formula: (width, height, values) => {
      const point = width * values![0]
      return `M ${point} 0 L ${width} 0 L ${width - point} ${height} L 0 ${height} Z`
    }
  },
  [ShapePathFormulasKeys.PARALLELOGRAM_RIGHT]: {
    editable: true,
    defaultValue: [0.25],
    range: [[0, 0.9]],
    relative: ['right'],
    getBaseSize: [width => width],
    formula: (width, height, values) => {
      const point = width * values![0]
      return `M 0 0 L ${width - point} 0 L ${width} ${height} L ${point} ${height} Z`
    }
  },
  [ShapePathFormulasKeys.TRAPEZOID]: {
    editable: true,
    defaultValue: [0.25],
    range: [[0, 0.5]],
    relative: ['left'],
    getBaseSize: [width => width],
    formula: (width, height, values) => {
      const point = width * values![0]
      return `M ${point} 0 L ${width - point} 0 L ${width} ${height} L 0 ${height} Z`
    }
  },
  [ShapePathFormulasKeys.BULLET]: {
    editable: true,
    defaultValue: [0.2],
    range: [[0, 1]],
    relative: ['top'],
    getBaseSize: [(width, height) => height],
    formula: (width, height, values) => {
      const point = height * values![0]
      return `M ${width / 2} 0 L 0 ${point} L 0 ${height} L ${width} ${height} L ${width} ${point} Z`
    }
  },
  [ShapePathFormulasKeys.INDICATOR]: {
    editable: true,
    defaultValue: [0.2],
    range: [[0, 0.9]],
    relative: ['right'],
    getBaseSize: [width => width],
    formula: (width, height, values) => {
      const point = width * values![0]
      return `M ${width} ${height / 2} L ${width - point} 0 L 0 0 L ${point} ${height / 2} L 0 ${height} L ${width - point} ${height} Z`
    }
  },
}

export const SHAPE_LIST: ShapeListItem[] = [
  {
    type: 'Rectangle',
    children: [
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z',
        pptxShapeType: 'rect',
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 150 0 Q 200 0 200 50 L 200 150 Q 200 200 150 200 L 50 200 Q 0 200 0 150 L 0 50 Q 0 0 50 0 Z',
        pathFormula: ShapePathFormulasKeys.ROUND_RECT,
        pptxShapeType: 'roundRect',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 200 L 0 0 L 150 0 L 200 50 L 200 200 Z',
        pathFormula: ShapePathFormulasKeys.CUT_RECT_SINGLE,
        pptxShapeType: 'snip1Rect',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 50 L 50 0 L 150 0 L 200 50 L 200 200 L 0 200 Z',
        pathFormula: ShapePathFormulasKeys.CUT_RECT_SAMESIDE,
        pptxShapeType: 'snip2SameRect',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 150 L 0 0 L 150 0 L 200 50 L 200 200 L 50 200 Z',
        pathFormula: ShapePathFormulasKeys.CUT_RECT_DIAGONAL,
        pptxShapeType: 'snip2DiagRect',
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 150 0 L 200 50 L 200 200 L 0 200 L 0 50 Q 0 0 50 0 Z',
        pathFormula: ShapePathFormulasKeys.CUT_ROUND_RECT,
        pptxShapeType: 'snipRoundRect',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 150 0 Q 200 0 200 50 L 200 200 L 0 200 L 0 0 Z',
        pathFormula: ShapePathFormulasKeys.ROUND_RECT_SINGLE,
        pptxShapeType: 'round1Rect',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 50 Q 0 0 50 0 L 150 0 Q 200 0 200 50 L 200 200 L 0 200 Z',
        pathFormula: ShapePathFormulasKeys.ROUND_RECT_SAMESIDE,
        pptxShapeType: 'round2SameRect',
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 200 0 L 200 150 Q 200 200 150 200 L 0 200 L 0 50 Q 0 0 50 0 Z',
        pathFormula: ShapePathFormulasKeys.ROUND_RECT_DIAGONAL,
        pptxShapeType: 'round2DiagRect',
      },
    ]
  },

  {
    type: 'Common Shapes',
    children: [
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z',
        pptxShapeType: 'ellipse',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 200 L 200 200 L 100 0 Z',
        pathFormula: ShapePathFormulasKeys.TRIANGLE,
        pptxShapeType: 'triangle',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 0 200 L 200 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 70 20 L 0 160 Q 0 200 40 200 L 160 200 Q 200 200 200 160 L 130 20 Q 100 -20 70 20 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 200 0 L 150 200 L 0 200 L 50 0 Z',
        pathFormula: ShapePathFormulasKeys.PARALLELOGRAM_LEFT,
        pptxShapeType: 'parallelogram',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 150 0 L 200 200 L 50 200 L 0 0 Z',
        pathFormula: ShapePathFormulasKeys.PARALLELOGRAM_RIGHT,
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 150 0 L 200 200 L 0 200 L 50 0 Z',
        pathFormula: ShapePathFormulasKeys.TRAPEZOID,
        pptxShapeType: 'trapezoid',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 100 L 100 200 L 200 100 L 100 0 Z',
        pptxShapeType: 'diamond',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 50 L 0 200 L 200 200 L 200 50 L 100 0 Z',
        pathFormula: ShapePathFormulasKeys.BULLET,
      },
      {
        viewBox: [200, 200],
        path: 'M 200 100 L 150 0 L 0 0 L 50 100 L 0 200 L 150 200 L 200 100 Z',
        pathFormula: ShapePathFormulasKeys.INDICATOR,
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 C 80 20 120 20 200 0 C 180 80 180 120 200 200 C 80 180 120 180 0 200 C 20 120 20 80 0 0 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 10 10 C 60 0 140 0 190 10 C 200 60 200 140 190 190 C 140 200 60 200 10 190 C 0 140 0 60 10 10 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 200 A 50 100 0 1 1 200 200 L 0 200 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 40 20 A 100 100 0 1 0 200 100 L 100 100 L 40 20 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 100 100 L 100 0 Z',
        pptxShapeType: 'pie',
      },
      {
        viewBox: [200, 200],
        path: 'M 160 20 A 100 100 0 1 0 200 100 L 100 100 L 160 20 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 100 0 Z',
        pptxShapeType: 'chord',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 100 100 102 1 0 200 100 L 200 0 L 100 0 Z',
        pptxShapeType: 'teardrop',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 Q 200 200 0 200 L 0 0 Z'
      },
      {
        viewBox: [200, 200],
        path: `M100,0 L200,76.6 L161.8,200 L38.2,200 L0,76.6 Z`,
        pptxShapeType: 'pentagon',
      },
      {
        viewBox: [200, 200],
        path: 'M 40 0 L 160 0 L 200 100 L 160 200 L 40 200 L 0 100 Z',
        pptxShapeType: 'hexagon',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 60 L 0 140 L 100 200 L 200 140 L 200 60 L 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: `M100,0 L170.71,29.29 L200,100 L170.71,170.71 L100,200 L29.29,170.71 L0,100 L29.29,29.29 Z`,
      },
      {
        viewBox: [200, 200],
        path: 'M 60 0 L 140 0 L 200 60 L 200 140 L 140 200 L 60 200 L 0 140 L 0 60 L 60 0 Z',
        pptxShapeType: 'octagon',
      },
      {
        viewBox: [200, 200],
        path: 'M 75 0 L 125 0 L 175 25 L 200 75 L 200 125 L 175 175 L 125 200 L 75 200 L 25 175 L 0 125 L 0 75 L 25 25 L 75 0 Z',
        pptxShapeType: 'dodecagon',
      },
      {
        viewBox: [200, 200],
        path: 'M 150 0 A 50 100 0 1 1 150 200 L 0 200 L 0 0 L 150 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 A 25 50 0 1 0 50 200 L 150 200 A 25 50 0 1 0 150 0 L 50 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 150 0 A 50 100 0 1 1 150 200 L 0 200 A 50 100 0 0 0 0 0 L 150 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 200 0 L 200 200 L 0 200 L 0 100 L 200 0 Z',
        pptxShapeType: 'flowChartManualInput',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 100 L 200 200 L 0 200 L 0 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 150 C 110 140 110 240 0 180 Z',
        pptxShapeType: 'flowChartDocument',
      },
      {
        viewBox: [200, 200],
        path: 'M 200 0 L 100 0 L 0 100 L 0 200 L 200 0 Z',
        pptxShapeType: 'diagStripe',
      },
      {
        viewBox: [200, 200],
        path: 'M 50 0 L 150 0 L 150 50 L 200 50 L 200 150 L 150 150 L 150 200 L 50 200 L 50 150 L 0 150 L 0 50 L 50 50 L 50 0 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 0 200 L 200 200 L 200 140 L 60 140 L 60 0 L 0 0 Z',
        pathFormula: ShapePathFormulasKeys.L,
        pptxShapeType: 'corner',
      },
      {
        viewBox: [200, 200],
        path: 'M0 0 L200 0 L200 200 L0 200 L0 0 Z M50 50 L50 150 L150 150 L150 50 Z',
        pathFormula: ShapePathFormulasKeys.RING_RECT,
        pptxShapeType: 'frame',
      },
      {
        viewBox: [200, 200],
        path: 'M0 100 A100 100 0 1 1 0 101 Z M150 100 A50 50 0 1 0 150 101 Z',
        pptxShapeType: 'donut',
      },
      {
        viewBox: [200, 200],
        path: 'M 70 0 L 70 70 L 0 70 L 0 130 L 70 130 L 70 200 L 130 200 L 130 130 L 200 130 L 200 70 L 130 70 L 130 0 L 70 0 Z',
        pathFormula: ShapePathFormulasKeys.PLUS,
        pptxShapeType: 'mathPlus',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 70 L 200 70 L 200 130 L 0 130 Z',
        pptxShapeType: 'mathMinus',
      },
      {
        viewBox: [200, 200],
        path: 'M 40 0 L 0 40 L 60 100 L 0 160 L 40 200 L 100 140 L 160 200 L 200 160 L 140 100 L 200 40 L 160 0 L 100 60 L 40 0 Z',
        pptxShapeType: 'mathMultiply',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 80 L 200 80 L 200 120 L 0 120 Z M 100 0 A 25 25 0 1 1 100 50 A 25 25 0 1 1 100 0 M 100 200 A 25 25 0 1 1 100 150 A 25 25 0 1 1 100 200',
        pptxShapeType: 'mathDivide',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 30 L 200 30 L 200 80 L 0 80 Z M 0 120 L 200 120 L 200 170 L 0 170 Z',
        pptxShapeType: 'mathEqual',
      },
      {
        viewBox: [200, 200],
        path: 'M 120 0 L 170 0 L 150 40 L 200 40 L 200 80 L 130 80 L 110 120 L 200 120 L 200 160 L 90 160 L 70 200 L 20 200 L 40 160 L 0 160 L 0 120 L 60 120 L 80 80 L 0 80 L 0 40 L 100 40 Z',
        pptxShapeType: 'mathNotEqual',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 160 L 100 160 L 60 200 L 60 160 L 0 160 Z',
        pathFormula: ShapePathFormulasKeys.MESSAGE,
        pptxShapeType: 'wedgeRectCallout',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 40 Q 0 0 40 0 L 160 0 Q 200 0 200 40 L 200 120 Q 200 160 160 160 L 100 160 L 60 200 L 60 160 L 40 160 Q 0 160 0 120 L 0 40 Z',
        pathFormula: ShapePathFormulasKeys.ROUND_MESSAGE,
        pptxShapeType: 'wedgeRoundRectCallout',
      },
      {
        viewBox: [200, 200],
        path: 'M 180 160 A 100 100 0 1 0 100 200 L 200 200 L 200 160 Z',
        pptxShapeType: 'flowChartMagneticTape',
      },
      {
        viewBox: [200, 200],
        path: 'M 200 0 L 0 0 L 200 200 L 0 200 L 200 0 Z',
        pptxShapeType: 'flowChartCollate',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 20 C 60 60 140 -40 200 20 L 200 180 C 140 140 60 240 0 180 L 0 20 Z',
        pptxShapeType: 'wave',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 20 C 40 -40 60 60 100 20 C 140 -40 160 60 200 20 L 200 180 C 140 240 160 140 100 180 C 40 240 60 140 0 180 L 0 20 Z',
        pptxShapeType: 'doubleWave',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 Q 0 50 0 175 Q 100 225 200 175 Q 200 50 100 0 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 100 A 50 50 0 1 1 200 100 L 100 200 L 0 100 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 120 80 L 200 100 L 120 120 L 100 200 L 80 120 L 0 100 L 80 80 L 100 0 Z',
        pptxShapeType: 'star4',
      },
      {
        viewBox: [1024, 1024],
        path: 'M1018.67652554 400.05983681l-382.95318779-5.89158658L512 34.78141155 388.27666225 394.16825023l-382.95318779 5.89158658L311.68602415 629.83174977l-117.83174978 365.27842665 312.25413766-223.88032637 312.25413904 223.88032637-117.83175116-365.27842665 318.14572563-229.77191296z',
        pptxShapeType: 'star5',
        special: true,
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 60 60 L 0 100 L 60 140 L 100 200 L 140 140 L 200 100 L 140 60 L 100 0 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 140 60 L 200 60 L 160 100 L 200 140 L 140 140 L 100 200 L 60 140 L 0 140 L 40 100 L 0 60 L 60 60 L 100 0 Z',
        pptxShapeType: 'star6',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 130 30 L 170 30 L 170 70 L 200 100 L 170 130 L 170 170 L 130 170 L 100 200 L 70 170 L 30 170 L 30 130 L 0 100 L 30 70 L 30 30 L 70 30 L 100 0',
        pptxShapeType: 'star8',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 0 200 120 A 100 100 0 1 1 100 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 120 0 L 100 80 L 200 80 L 80 200 L 100 120 L 0 120 L 120 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 30 50 Q 40 -20 120 10 Q 180 -10 180 40 Q 210 70 190 100 C 210 140 180 170 160 170 Q 140 210 100 180 C 70 210 20 190 30 150 C -10 140 -10 80 30 50',
        pptxShapeType: 'cloud',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 100 L 100 200 L 200 100 L 100 0 Z M 200 100 L 0 100',
        withborder: true,
        pptxShapeType: 'flowChartSort',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z M 170 30 L 30 170',
        withborder: true,
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z M 30 30 L 170 170',
        withborder: true,
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z M 170 30 L 30 170 M 30 30 L 170 170',
        withborder: true,
        pptxShapeType: 'flowChartSummingJunction',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 Z M 200 100 L 0 100 M 100 0 L 100 200',
        withborder: true,
        pptxShapeType: 'flowChartOr',
      },
      {
        viewBox: [200, 200],
        path: 'M 160 0 A 40 100 0 1 1 160 200 L 40 200 A 40 100 0 1 1 40 0 L 160 0 Z M 160 200 A 40 100 0 1 1 160 0',
        withborder: true,
        pptxShapeType: 'flowChartMagneticDrum',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 40 A 50 20 0 1 1 200 40 L 200 160 A 50 20 0 1 1 0 160 L 0 40 Z M 200 40 A 50 20 0 1 1 0 40',
        withborder: true,
        pptxShapeType: 'can',
      },
      {
        viewBox: [200, 200],
        path: 'M 200 0 L 50 0 L 0 50 L 0 200 L 150 200 L 200 150 L 200 0 Z M 200 0 L 150 50 M 150 50 L 0 50 M 150 50 L 150 200',
        withborder: true,
        pptxShapeType: 'cube',
      },
    ],
  },
  
  {
    type: 'Arrows',
    children: [
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 100 L 50 100 L 50 200 L 150 200 L 150 100 L 200 100 L 100 0 Z',
        pptxShapeType: 'upArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 200 L 200 100 L 150 100 L 150 0 L 50 0 L 50 100 L 0 100 L 100 200 Z',
        pptxShapeType: 'downArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 100 L 100 0 L 100 50 L 200 50 L 200 150 L 100 150 L 100 200 L 0 100 Z',
        pptxShapeType: 'leftArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 200 100 L 100 0 L 100 50 L 0 50 L 0 150 L 100 150 L 100 200 L 200 100 Z',
        pptxShapeType: 'rightArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 0 60 L 60 60 L 60 140 L 0 140 L 100 200 L 200 140 L 140 140 L 140 60 L 200 60 L 100 0 Z',
        pptxShapeType: 'upDownArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 100 L 60 0 L 60 60 L 140 60 L 140 0 L 200 100 L 140 200 L 140 140 L 60 140 L 60 200 L 0 100 Z',
        pptxShapeType: 'leftRightArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 100 0 L 60 40 L 80 40 L 80 80 L 40 80 L 40 60 L 0 100 L 40 140 L 40 120 L 80 120 L 80 160 L 60 160 L 100 200 L 140 160 L 120 160 L 120 120 L 160 120 L 160 140 L 200 100 L 160 60 L 160 80 L 120 80 L 120 40 L 140 40 L 100 0 Z',
        pptxShapeType: 'quadArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 100 L 100 0 L 100 50 L 200 50 L 150 100 L 200 150 L 100 150 L 100 200 L 0 100 Z',
      },
      {
        viewBox: [200, 200],
        path: 'M 200 100 L 100 0 L 100 50 L 0 50 L 50 100 L 0 150 L 100 150 L 100 200 L 200 100 Z',
        pptxShapeType: 'notchedRightArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 100 L 80 20 L 80 80 L 120 80 L 120 0 L 200 0 L 200 200 L 120 200 L 120 120 L 80 120 L 80 180 L 0 100 Z',
        pptxShapeType: 'leftArrowCallout',
      },
      {
        viewBox: [200, 200],
        path: 'M 200 100 L 120 20 L 120 80 L 80 80 L 80 0 L 0 0 L 0 200 L 80 200 L 80 120 L 120 120 L 120 180 L 200 100 Z',
        pptxShapeType: 'rightArrowCallout',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 120 0 L 200 100 L 120 200 L 0 200 L 80 100 L 0 0 Z',
        pptxShapeType: 'chevron',
      },
      {
        viewBox: [200, 200],
        path: 'M 80 0 L 200 0 L 120 100 L 200 200 L 80 200 L 0 100 L 80 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 140 0 L 200 100 L 140 200 L 0 200 L 0 100 L 0 0 Z',
        pptxShapeType: 'homePlate',
      },
      {
        viewBox: [200, 200],
        path: 'M 60 0 L 200 0 L 200 100 L 200 200 L 60 200 L 0 100 L 60 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 200 100 L 0 200 L 60 100 L 0 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 200 0 L 0 100 L 200 200 L 140 100 L 200 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 0 L 80 0 L 200 100 L 80 200 L 0 200 L 120 100 L 0 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 200 0 L 120 0 L 0 100 L 120 200 L 200 200 L 80 100 L 200 0 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 0 200 L 180 200 L 180 40 L 200 40 L 160 0 L 120 40 L 140 40 L 140 160 L 0 160 L 0 200 Z',
        pptxShapeType: 'bentUpArrow',
      },
      {
        viewBox: [200, 200],
        path: 'M 0 200 L 0 20 L 160 20 L 160 0 L 200 40 L 160 80 L 160 60 L 40 60 L 40 200 L 0 200 Z'
      },
      {
        viewBox: [200, 200],
        path: 'M 40 180 L 180 180 L 180 40 L 200 40 L 160 0 L 120 40 L 140 40 L 140 140 L 40 140 L 40 120 L 0 160 L 40 200 L 40 180 Z',
        pptxShapeType: 'leftUpArrow',
      },
      {
        viewBox: [1024, 1024],
        path: 'M398.208 302.912V64L0 482.112l398.208 418.176V655.36c284.48 0 483.584 95.552 625.792 304.64-56.896-298.688-227.584-597.312-625.792-657.088z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M625.792 302.912V64L1024 482.112l-398.208 418.176V655.36C341.312 655.36 142.208 750.912 0 960c56.896-298.688 227.584-597.312 625.792-657.088z',
        special: true,
      },
    ],
  },

  {
    type: 'Other Shapes',
    children: [
      {
        viewBox: [1024, 1024],
        path: 'M995.336 243.4016c-15.7584-36.5736-38.3376-69.26639999-66.91440001-97.37280001-28.5768-27.98879999-61.73999999-49.8624-98.78399999-65.26799998-38.22-15.876-78.6744-23.8728-120.4224-23.87280001-57.97680001 0-114.5424 15.876-163.69919999 45.864-11.76 7.17360001-22.932 15.05279999-33.51600001 23.63760001-10.584-8.5848-21.75600001-16.46400001-33.51600001-23.63760001-49.1568-29.98799999-105.7224-45.86399999-163.69919999-45.864-41.74799999 0-82.2024 7.9968-120.4224 23.87280001-36.9264 15.28799999-70.2072 37.27919999-98.78399999 65.26799998-28.6944 28.10640001-51.156 60.79919999-66.91440001 97.37280001-16.34639999 37.9848-24.696 78.3216-24.696 119.83439999 0 39.1608 7.9968 79.96800001 23.8728 121.48080001 13.28880001 34.692 32.34000001 70.67760001 56.6832 107.016 38.57279999 57.5064 91.61040001 117.4824 157.4664 178.28160001 109.1328 100.78319999 217.2072 170.4024 221.79359999 173.22479998l27.87120001 17.8752c12.348 7.8792 28.224 7.8792 40.572 0l27.87119999-17.8752c4.58639999-2.94 112.54319999-72.44159999 221.79360001-173.22479998 65.85599999-60.79919999 118.89359999-120.7752 157.4664-178.28160001 24.3432-36.33839999 43.512-72.324 56.68319999-107.016 15.876-41.5128 23.8728-82.32 23.87280001-121.48080001 0.1176-41.5128-8.232-81.8496-24.5784-119.83439999z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M985.20746667 343.50079998l-303.32586667-44.08319999L546.28693333 24.5248c-3.70346666-7.5264-9.79626667-13.6192-17.32266665-17.32266668-18.87573334-9.3184-41.81333333-1.55306667-51.25120001 17.32266668L342.1184 299.41759999l-303.32586667 44.08319999c-8.36266667 1.19466667-16.00853333 5.13706667-21.8624 11.11040001-14.69440001 15.17226667-14.45546667 39.30453334 0.71679999 54.1184l219.46026668 213.9648-51.84853333 302.1312c-1.43359999 8.24320001-0.11946667 16.8448 3.82293333 24.25173333 9.79626667 18.6368 32.9728 25.92426667 51.6096 16.00853334L512 822.44266665l271.3088 142.64320001c7.40693333 3.9424 16.00853333 5.25653333 24.25173333 3.82293333 20.78719999-3.584 34.7648-23.296 31.1808-44.0832l-51.84853333-302.1312 219.46026668-213.9648c5.97333334-5.85386666 9.91573333-13.49973334 11.11039999-21.8624 3.2256-20.90666667-11.34933333-40.26026667-32.256-43.36640001z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M852.65066667 405.84533333C800.54044445 268.40177778 667.76177778 170.66666667 512.22755555 170.66666667S223.91466667 268.288 171.80444445 405.73155555C74.29688889 431.33155555 2.27555555 520.07822222 2.27555555 625.77777778c0 125.72444445 101.83111111 227.55555555 227.44177778 227.55555555h564.56533334C919.89333333 853.33333333 1021.72444445 751.50222222 1021.72444445 625.77777778c0-105.472-71.79377778-194.21866667-169.07377778-219.93244445z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M926.25224691 323.7371485H654.6457886L898.88200917 15.14388241c5.05486373-6.53433603 0.49315743-16.02761669-7.76722963-16.02761668H418.30008701c-3.45210206 0-6.78091476 1.84934039-8.50696579 4.93157436L90.35039154 555.76772251c-3.82197013 6.53433603 0.86302552 14.7947231 8.50696578 14.79472311h215.01664245l-110.22068713 440.88274851c-2.34249783 9.61657002 9.24670194 16.39748478 16.39748477 9.49328065L933.03316167 340.62779071c6.41104668-6.0411786 2.09591911-16.8906422-6.78091476-16.89064221z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M878.47822222 463.30311111c-22.18666667-49.83466667-53.93066667-93.98044445-94.32177777-131.072l-33.10933334-30.37866666c-4.89244445-4.32355555-12.62933333-2.38933333-14.79111111 3.75466666l-14.79111111 42.43911111c-9.216 26.624-26.16888889 53.81688889-50.176 80.55466667-1.59288889 1.70666667-3.41333333 2.16177778-4.66488889 2.27555556-1.25155555 0.11377778-3.18577778-0.11377778-4.89244445-1.70666667-1.59288889-1.36533333-2.38933333-3.41333333-2.27555555-5.46133333 4.20977778-68.49422222-16.27022222-145.74933333-61.09866667-229.83111112C561.26577778 124.01777778 509.72444445 69.51822222 445.32622222 31.51644445l-46.99022222-27.648c-6.144-3.64088889-13.99466667 1.13777778-13.65333333 8.30577777l2.50311111 54.61333333c1.70666667 37.31911111-2.61688889 70.31466667-12.85688889 97.73511112-12.51555555 33.56444445-30.49244445 64.73955555-53.47555556 92.72888888-16.15644445 19.56977778-34.24711111 37.20533333-54.04444444 52.45155556-47.90044445 36.75022222-87.38133333 84.65066667-114.11911111 138.24C125.72444445 502.10133333 111.50222222 562.74488889 111.50222222 623.50222222c0 53.70311111 10.58133333 105.69955555 31.51644445 154.73777778 20.93511111 47.21777778 49.152 89.77066667 85.90222222 126.17955555 36.864 36.40888889 79.64444445 65.08088889 127.31733333 84.992C405.61777778 1010.11911111 457.95555555 1020.58666667 512 1020.58666667s106.38222222-10.46755555 155.76177778-31.06133334c47.67288889-19.91111111 90.56711111-48.46933333 127.31733333-84.992 36.864-36.40888889 65.76355555-78.96177778 85.90222222-126.17955555 20.93511111-49.03822222 31.51644445-101.03466667 31.51644445-154.73777778 0-55.52355555-11.37777778-109.45422222-34.01955556-160.31288889z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M910.60451556 640.96028445c-20.38897778-65.49959112-43.83630221-120.54983112-79.89930667-210.64362666C836.31217778 193.67708444 737.93535999 2.27555556 511.36284444 2.27555556 282.24170667 2.27555556 186.03121778 197.50001778 192.14791111 430.31665779c-36.19043555 90.22122667-59.51032888 144.88917333-79.89930667 210.64362666-43.32657778 139.53706668-29.30915556 197.26336001-18.60494222 198.53767111 22.9376 2.80348444 89.32920888-105.00323556 89.32920889-105.00323556 0 62.44124445 32.11264001 143.86972444 101.69002667 202.61546667-33.64181333 10.32192-109.20846222 38.10190221-91.24067556 68.55793777 14.52714667 24.59420444 250.01984 15.67402668 317.94062222 8.02816 67.92078222 7.64586667 303.41347556 16.56604444 317.94062223-8.02816 17.96778667-30.32860444-57.72629333-58.23601779-91.24067555-68.55793777 69.57738667-58.87317334 101.69002667-140.30165333 101.69002667-202.61546667 0 0 66.39160889 107.80672 89.32920888 105.00323556 10.83164445-1.40174222 24.84906667-59.12803556-18.47751111-198.53767111z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 512c140.82958222 0 254.86222222-114.03264 254.86222222-254.86222222S652.82958222 2.27555555 512 2.27555555a254.78940445 254.78940445 0 0 0-254.86222222 254.86222223C257.13777778 397.96736 371.17041778 512 512 512z m0 72.81777778c-170.10232889 0-509.72444445 97.57582222-509.72444445 291.27111111v145.63555556h1019.4488889v-145.63555556c0-193.69528889-339.62211555-291.27111111-509.72444445-291.27111111z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m188.18844445 703.37422223l-75.09333334-0.34133333L512 575.36271635l-112.98133333 134.71288889-75.20711112 0.34133334c-5.00622222 0-9.10222222-3.98222222-9.10222222-9.10222222 0-2.16177778 0.79644445-4.20977778-2.16177778-5.91644445l148.02488889-176.35555555L316.87111111 337.92c-1.36533333-1.70666667-2.16177778-3.75466667-2.16177778-5.91644445 0-5.00622222 4.096-9.10222222-9.10222222-9.10222222l75.20711112 0.34133334L512 458.06933333l112.98133333-134.71288888 75.09333334-0.34133334c5.00622222 0 9.10222222 3.98222222 9.10222222 9.10222222 0 2.16177778-0.79644445 4.20977778-2.16177778 5.91644445L559.21777778 514.27555555l147.91111111 176.35555556c1.36533333 1.70666667 2.16177778 3.75466667 2.16177778 5.91644444 0 5.00622222-4.096 9.10222222-9.10222222 9.10222223z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m188.18844445 703.37422223l-75.09333334-0.34133333L512 575.36271635l-112.98133333 134.71288889-75.20711112 0.34133334c-5.00622222 0-9.10222222-3.98222222-9.10222222-9.10222222 0-2.16177778 0.79644445-4.20977778-2.16177778-5.91644445l148.02488889-176.35555555L316.87111111 337.92c-1.36533333-1.70667778-2.16177778-3.75466667-2.16177778-5.91644445 0-5.00622222 4.096-9.10222222-9.10222222-9.10222222l75.20711112 0.34133334L512 458.06933333l112.98133333-134.71288888 75.09333334-0.34133334c5.00622222 0 9.10222222 3.98222222 9.10222222 9.10222222 0 2.16177778-0.79644445 4.20977778-2.16177778 5.91644445L559.21777778 514.27555555l147.91111111 176.35555556c1.36533333 1.70666667 2.16177778 3.75466667 2.16177778 5.91644444 0 5.00622222-4.096 9.10222222-9.10222222 9.10222223z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m200.81777778 666.39644445l-32.54044445 44.37333333c-2.95822222 4.096-8.64711111 4.89244445-12.74311111 1.93422222L479.34577778 577.76355555c-2.38933333-1.70666667-3.75466667-4.43733333-3.75466667-7.39555555V257.13777778c0-5.00622222 4.096-9.10222222 9.10222222-9.10222223h54.72711112c5.00622222 0 9.10222222 4.096 9.10222222 9.10222223v281.6l162.24711111 117.30488889c4.096 2.84444445 5.00622222 8.53333333 2.048 12.62933333z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H548.40888889v172.94222222c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222h-54.61333334c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V548.40888889H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h172.94222222V302.64888889c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h54.61333334c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v172.94222222h172.94222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m163.95377778 517.57511112L427.46311111 700.64355555c-1.59288889 1.13777778-3.41333333 1.70666667-5.34755556 1.70666667-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V331.88977778c0-1.93422222 0.56888889-3.75466667 1.70666667-5.34755556 2.95822222-4.096 8.64711111-5.00622222 12.74311111-2.048L675.95377778 505.17333333c0.79644445 0.56888889 1.47911111 1.25155555 2.048 2.048 2.95822222 3.98222222 2.048 9.67111111-2.048 12.62933334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m200.81777778 666.39644445l-32.54044445 44.37333333c-2.95822222 4.096-8.64711111 4.89244445-12.74311111 1.93422222L479.34577778 577.76355555c-2.38933333-1.70666667-3.75466667-4.43733333-3.75466667-7.39555555V257.13777778c0-5.00622222 4.096-9.10222222 9.10222222-9.10222223h54.72711112c5.00622222 0 9.10222222 4.096 9.10222222 9.10222223v281.6l162.24711111 117.30488889c4.096 2.84444445 5.00622222 8.53333333 2.048 12.62933333z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H548.40888889v172.94222222c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222h-54.61333334c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V548.40888889H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h172.94222222V302.64888889c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h54.61333334c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v172.94222222h172.94222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222223v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m163.95377778 517.57511112L427.46311111 700.64355555c-1.59288889 1.13777778-3.41333333 1.70666667-5.34755556 1.70666667-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V331.88977778c0-1.93422222 0.56888889-3.75466667 1.70666667-5.34755556 2.95822222-4.096 8.64711111-5.00622222 12.74311111-2.048L675.95377778 505.17333333c0.79644445 0.56888889 1.47911111 1.25155555 2.048 2.048 2.95822222 3.98222222 2.048 9.67111111-2.048 12.62933334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H548.40888889v172.94222222c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222h-54.61333334c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V548.40888889H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h172.94222222V302.64888889c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h54.61333334c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v172.94222222h172.94222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222223v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m163.95377778 517.57511112L427.46311111 700.64355555c-1.59288889 1.13777778-3.41333333 1.70666667-5.34755556 1.70666667-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V331.88977778c0-1.93422222 0.56888889-3.75466667 1.70666667-5.34755556 2.95822222-4.096 8.64711111-5.00622222 12.74311111-2.048L675.95377778 505.17333333c0.79644445 0.56888889 1.47911111 1.25155555 2.048 2.048 2.95822222 3.98222222 2.048 9.67111111-2.048 12.62933334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H548.40888889v172.94222222c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222h-54.61333334c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V548.40888889H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h172.94222222V302.64888889c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h54.61333334c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v172.94222222h172.94222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222223v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M980.62285431 4.54099753H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874961v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874964h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874964v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 858.07748691H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874964v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874961h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874961v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 461.10625194H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874959v81.42999694c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874959h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874959v-81.42999694c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874959z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M975.82443246 622.46726585H14.8973037c-6.07569962 0-11.04672658 4.97102697-11.04672658 11.04672658v82.85044937c0 6.07569962 4.97102697 11.04672658 11.04672658 11.04672659h835.6848661L651.32683905 980.10503902c-5.66144737 7.18037229-0.55233633 17.9509307 8.69929718 17.9509307h100.11095967c6.76612003 0 13.11798782-3.0378498 17.39859437-8.42312903l233.08593092-295.63802022c22.78387358-28.99765728 2.20934532-71.52755463-34.79718873-71.52755462zM1009.1026963 296.58883161H173.4178302l199.25533075-252.69387063c5.66144737-7.18037229 0.55233633-17.9509307-8.69929718-17.9509307h-100.11095967c-6.76612003 0-13.11798782 3.0378498-17.39859437 8.42312903L13.37837881 330.00517953c-22.78387358 28.99765728-2.20934532 71.52755463 34.65910466 71.52755462h961.06521283c6.07569962 0 11.04672658-4.97102697 11.04672658-11.04672657v-82.85044937c0-6.07569962-4.97102697-11.04672658-11.04672658-11.04672659z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M1010.75873115 64.13501693H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874961v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874964h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874964v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 858.07748691H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874964v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874961h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874961v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 461.10625194H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874959v81.42999694c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874959h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874959v-81.42999694c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874959z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M975.82443246 622.46726585H14.8973037c-6.07569962 0-11.04672658 4.97102697-11.04672658 11.04672658v82.85044937c0 6.07569962 4.97102697 11.04672658 11.04672658 11.04672659h835.6848661L651.32683905 980.10503902c-5.66144737 7.18037229-0.55233633 17.9509307 8.69929718 17.9509307h100.11095967c6.76612003 0 13.11798782-3.0378498 17.39859437-8.42312903l233.08593092-295.63802022c22.78387358-28.99765728 2.20934532-71.52755463-34.79718873-71.52755462zM1009.1026963 296.58883161H173.4178302l199.25533075-252.69387063c5.66144737-7.18037229 0.55233633-17.9509307-8.69929718-17.9509307h-100.11095967c-6.76612003 0-13.11798782 3.0378498-17.39859437 8.42312903L13.37837881 330.00517953c-22.78387358 28.99765728-2.20934532 71.52755463 34.65910466 71.52755462h961.06521283c6.07569962 0 11.04672658-4.97102697 11.04672658-11.04672657v-82.85044937c0-6.07569962-4.97102697-11.04672658-11.04672658-11.04672659z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M1010.75873115 64.13501693H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874961v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874964h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874964v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 858.07748691H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874964v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874961h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874961v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 461.10625194H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874959v81.42999694c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874959h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874959v-81.42999694c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874959z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M975.82443246 622.46726585H14.8973037c-6.07569962 0-11.04672658 4.97102697-11.04672658 11.04672658v82.85044937c0 6.07569962 4.97102697 11.04672658 11.04672658 11.04672659h835.6848661L651.32683905 980.10503902c-5.66144737 7.18037229-0.55233633 17.9509307 8.69929718 17.9509307h100.11095967c6.76612003 0 13.11798782-3.0378498 17.39859437-8.42312903l233.08593092-295.63802022c22.78387358-28.99765728 2.20934532-71.52755463-34.79718873-71.52755462zM1009.1026963 296.58883161H173.4178302l199.25533075-252.69387063c5.66144737-7.18037229 0.55233633-17.9509307-8.69929718-17.9509307h-100.11095967c-6.76612003 0-13.11798782 3.0378498-17.39859437 8.42312903L13.37837881 330.00517953c-22.78387358 28.99765728-2.20934532 71.52755463 34.65910466 71.52755462h961.06521283c6.07569962 0 11.04672658-4.97102697 11.04672658-11.04672657v-82.85044937c0-6.07569962-4.97102697-11.04672658-11.04672658-11.04672659z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M1010.75873115 64.13501693H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874961v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874964h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874964v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 858.07748691H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874964v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874961h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874961v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 461.10625194H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874959v81.42999694c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874959h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874959v-81.42999694c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874959z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M975.82443246 622.46726585H14.8973037c-6.07569962 0-11.04672658 4.97102697-11.04672658 11.04672658v82.85044937c0 6.07569962 4.97102697 11.04672658 11.04672658 11.04672659h835.6848661L651.32683905 980.10503902c-5.66144737 7.18037229-0.55233633 17.9509307 8.69929718 17.9509307h100.11095967c6.76612003 0 13.11798782-3.0378498 17.39859437-8.42312903l233.08593092-295.63802022c22.78387358-28.99765728 2.20934532-71.52755463-34.79718873-71.52755462zM1009.1026963 296.58883161H173.4178302l199.25533075-252.69387063c5.66144737-7.18037229 0.55233633-17.9509307-8.69929718-17.9509307h-100.11095967c-6.76612003 0-13.11798782 3.0378498-17.39859437 8.42312903L13.37837881 330.00517953c-22.78387358 28.99765728-2.20934532 71.52755463 34.65910466 71.52755462h961.06521283c6.07569962 0 11.04672658-4.97102697 11.04672658-11.04672657v-82.85044937c0-6.07569962-4.97102697-11.04672658-11.04672658-11.04672659z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M1010.75873115 64.13501693H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874961v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874964h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874964v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 858.07748691H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874964v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874961h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874961v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 461.10625194H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874959v81.42999694c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874959h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874959v-81.42999694c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874959z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M975.82443246 622.46726585H14.8973037c-6.07569962 0-11.04672658 4.97102697-11.04672658 11.04672658v82.85044937c0 6.07569962 4.97102697 11.04672658 11.04672658 11.04672659h835.6848661L651.32683905 980.10503902c-5.66144737 7.18037229-0.55233633 17.9509307 8.69929718 17.9509307h100.11095967c6.76612003 0 13.11798782-3.0378498 17.39859437-8.42312903l233.08593092-295.63802022c22.78387358-28.99765728 2.20934532-71.52755463-34.79718873-71.52755462zM1009.1026963 296.58883161H173.4178302l199.25533075-252.69387063c5.66144737-7.18037229 0.55233633-17.9509307-8.69929718-17.9509307h-100.11095967c-6.76612003 0-13.11798782 3.0378498-17.39859437 8.42312903L13.37837881 330.00517953c-22.78387358 28.99765728-2.20934532 71.52755463 34.65910466 71.52755462h961.06521283c6.07569962 0 11.04672658-4.97102697 11.04672658-11.04672657v-82.85044937c0-6.07569962-4.97102697-11.04672658-11.04672658-11.04672659z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M1010.75873115 64.13501693H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874961v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874964h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874964v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 858.07748691H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874964v81.42999691c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874961h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874961v-81.42999691c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874964zM1010.75873115 461.10625194H13.24126885c-5.59831228 0-10.17874961 4.58043732-10.17874961 10.17874959v81.42999694c0 5.59831228 4.58043732 10.17874961 10.17874961 10.17874959h997.5174623c5.59831228 0 10.17874961-4.58043732 10.17874961-10.17874959v-81.42999694c0-5.59831228-4.58043732-10.17874961-10.17874961-10.17874959z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M591.98717801 512l405.34042913-483.16579151c6.79427767-8.02960089 1.08090782-20.22841761-9.41933951-20.2284176h-123.22349044c-7.25752386 0-14.20621693 3.24272343-18.99309439 8.80167789L478.86598471 512 177.07299399 17.40746878c-4.63246205-5.55895447-11.58115512-8.80167789-18.99309439-8.80167789H34.85640916c-10.50024731 0-16.21361717 12.19881672-9.41933952 20.22841761L430.77749876 512 25.43706964 995.16579151c-6.79427767 8.02960089-1.08090782 20.22841761 9.41933952 20.2284176h123.22349044c7.25752386 0 14.20621693-3.24272343 18.99309439-8.80167789l334.3093444-398.54615144 334.30934441 398.54615144c4.63246205 5.55895447 11.58115512 8.80167789 18.99309439 8.80167789h123.22349044c10.50024731 0 16.21361717-12.19881672 9.41933951-20.2284176L591.98717801 512z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M953.5488 832.61667556c-24.08448-57.08913778-58.74574221-108.31644445-102.70947556-152.28017777-43.96373333-43.96373333-95.19104-78.49756444-152.28017777-102.70947558-0.50972445-0.25486222-1.01944888-0.38229333-1.52917334-0.63715555C776.41955556 519.64586667 828.02915556 426.23886221 828.02915556 320.85333332c0-174.58062221-141.44853334-316.02915556-316.02915556-316.02915554S195.97084444 146.27271111 195.97084444 320.85333332c0 105.38552889 51.6096 198.79253333 130.99918223 256.26396447-0.50972445 0.25486222-1.01944888 0.38229333-1.52917334 0.63715555-57.08913778 24.08448-108.31644445 58.61831112-152.28017777 102.70947554-43.96373333 43.96373333-78.49756444 95.19104-102.70947556 152.28017779C46.74901333 888.55893332 34.13333334 947.8144 32.85902222 1009.23619556c-0.12743111 5.60696888 4.58752 9.93962667 10.19448889 9.93962666h76.45866667c5.7344 0 10.32192-4.71495112 10.19448889-10.44935111-1.27431111-60.91207112-13.88999112-120.16753779-37.59217778-176.10979555zM512 540.03484444c-58.49088 0-113.54112-22.81016889-154.95623111-64.22527999S292.81848888 379.34421333 292.81848888 320.85333332c0-58.49088 22.81016889-113.54112 64.22528001-154.9562311S453.50912 101.67182221 512 101.67182221s113.54112 22.81016889 154.95623111 64.22528001S731.18151112 262.36245333 731.18151112 320.85333332c0 58.49088-22.81016889 113.54112-64.22528001 154.95623113S570.49088 540.03484444 512 540.03484444z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m220.16 343.26755556l-32.54044445 44.37333333c-2.95822222 4.096-8.64711111 4.89244445-12.74311111 1.93422222L479.34577778 577.76355555c-2.38933333-1.70666667-3.75466667-4.43733333-3.75466667-7.39555555V257.13777778c0-5.00622222 4.096-9.10222222 9.10222222-9.10222223h54.72711112c5.00622222 0 9.10222222 4.096 9.10222222 9.10222223v281.6l162.24711111 117.30488889c4.096 2.84444445 5.00622222 8.53333333 2.048 12.62933333z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m163.95377778 517.57511112L427.46311111 700.64355555c-1.59288889 1.13777778-3.41333333 1.70666667-5.34755556 1.70666667-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V331.88977778c0-1.93422222 0.56888889-3.75466667 1.70666667-5.34755556 2.95822222-4.096 8.64711111-5.00622222 12.74311111-2.048L675.95377778 505.17333333c0.79644445 0.56888889 1.47911111 1.25155555 2.048 2.048 2.95822222 3.98222222 2.048 9.67111111-2.048 12.62933334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m188.18844445 703.37422223l-75.09333334-0.34133333L512 575.36271635l-112.98133333 134.71288889-75.20711112 0.34133334c-5.00622222 0-9.10222222-3.98222222-9.10222222-9.10222222 0-2.16177778 0.79644445-4.20977778-2.16177778-5.91644445l148.02488889-176.35555555L316.87111111 337.92c-1.36533333-1.70666667-2.16177778-3.75466667-2.16177778-5.91644445 0-5.00622222 4.096-9.10222222-9.10222222-9.10222222l75.20711112 0.34133334L512 458.06933333l112.98133333-134.71288888 75.09333334-0.34133334c5.00622222 0 9.10222222 3.98222222 9.10222222 9.10222222 0 2.16177778-0.79644445 4.20977778-2.16177778 5.91644445L559.21777778 514.27555555l147.91111111 176.35555556c1.36533333 1.70666667 2.16177778 3.75466667 2.16177778 5.91644444 0 5.00622222-4.096 9.10222222-9.10222222 9.10222223z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m163.95377778 517.57511112L427.46311111 700.64355555c-1.59288889 1.13777778-3.41333333 1.70666667-5.34755556 1.70666667-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V331.88977778c0-1.93422222 0.56888889-3.75466667 1.70666667-5.34755556 2.95822222-4.096 8.64711111-5.00622222 12.74311111-2.048L675.95377778 505.17333333c0.79644445 0.56888889 1.47911111 1.25155555 2.048 2.048 2.95822222 3.98222222 2.048 9.67111111-2.048 12.62933334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m163.95377778 517.57511112L427.46311111 700.64355555c-1.59288889 1.13777778-3.41333333 1.70666667-5.34755556 1.70666667-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V331.88977778c0-1.93422222 0.56888889-3.75466667 1.70666667-5.34755556 2.95822222-4.096 8.64711111-5.00622222 12.74311111-2.048L675.95377778 505.17333333c0.79644445 0.56888889 1.47911111 1.25155555 2.048 2.048 2.95822222 3.98222222 2.048 9.67111111-2.048 12.62933334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M901.80266667 257.82044445L656.95288889 12.97066667C524.10877635 6.40354749 518.05438818 5.63298899 512 5.63298899s-12.10877635 0.7705585-16.62204754 2.31167549L121.32684303 135.41705551c-9.13662215 3.08223399-16.62204754 13.64989334-16.62204753 23.33691443v531.02488283c0 9.68702108 6.27454775 22.45627614 13.87005291 28.51066431L498.0198673 1013.9638196c3.85279247 2.9721542 8.8063828 4.51327118 13.87005291 4.51327118s10.12734022-1.54111698 13.87005291-4.51327118l379.4450189-295.67430252c7.59550517-5.94430839 13.87005291-18.71356345 13.87005291-28.51066431V158.75396994c0.22015956-9.68702108-7.26526581-20.14460066-16.40188796-23.33691443zM712.89560763 323.43332829L478.86598471 645.63685899c-7.04510625 9.68702108-21.57563786 9.68702108-28.6207441 0l-139.14084824-191.5388259c-4.18303182-5.8342286 0-13.9801327 7.15518603-13.9801327h60.76404132c5.61406904 0 11.0079785 2.75199463 14.31037204 7.26526582l71.22162091 97.97100864 166.11039557-228.74579323c3.30239355-4.51327118 8.58622323-7.26526581 14.31037204-7.26526581H705.7404216c7.15518602 0.11007979 11.33821785 8.25598388 7.15518603 14.09021248z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M901.80266667 257.82044445L656.95288889 12.97066667c-6.82666667-6.82666667-16.04266667-10.69511111-25.71377778-10.69511112H147.91111111c-20.13866667 0-36.40888889 16.27022222-36.40888889 36.40888889v946.6311111c0 20.13866667 16.27022222 36.40888889 36.40888889 36.40888889h728.17777778c20.13866667 0 36.40888889-16.27022222 36.40888889-36.40888889V283.648c0-9.67111111-3.86844445-19.00088889-10.69511111-25.82755555zM828.52977778 300.37333333H614.4V86.24355555L828.52977778 300.37333333z m2.048 639.43111112H193.42222222V84.19555555h343.60888889v245.76c0 26.39644445 21.39022222 47.78666667 47.78666667 47.78666667h245.76v562.06222223z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M981.07392 55.79662222H42.92608c-31.22062222 0-50.71758221 34.02410666-35.04355556 61.16693334L304.28728889 620.82616888V927.42542221c0 22.55530667 18.09521779 40.77795555 40.52309333 40.77795557h334.37923556c22.42787556 0 40.52309333-18.22264888 40.52309333-40.77795557V620.82616888L1016.24490667 116.96355556c15.54659555-27.14282666-3.95036444-61.16693333-35.17098667-61.16693334zM628.47203556 876.45297779H395.52796444V677.66044445h233.07150222v198.79253334z m12.23338666-301.50200891l-12.10595556 21.15356445h-233.19893332l-12.10595556-21.15356445L130.59868445 147.54702221h762.8026311L640.70542222 512 25.43706964 995.16579151c-6.79427767 8.02960089-1.08090782 20.22841761 9.41933952 20.2284176h123.22349044c7.25752386 0 14.20621693-3.24272343 18.99309439-8.80167789l334.3093444-398.54615144 334.30934441 398.54615144c4.63246205 5.55895447 11.58115512 8.80167789 18.99309439 8.80167789h123.22349044c10.50024731 0 16.21361717-12.19881672 9.41933951-20.2284176L591.98717801 512z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M901.80266667 257.82044445L656.95288889 12.97066667c-6.82666667-6.82666667-16.04266667-10.69511111-25.71377778-10.69511112H147.91111111c-20.13866667 0-36.40888889 16.27022222-36.40888889 36.40888889v946.6311111c0 20.13866667 16.27022222 36.40888889 36.40888889 36.40888889h728.17777778c20.13866667 0 36.40888889-16.27022222 36.40888889-36.40888889V283.648c0-9.67111111-3.86844445-19.00088889-10.69511111-25.82755555zM828.52977778 300.37333333H614.4V86.24355555L828.52977778 300.37333333z m2.048 639.43111112H193.42222222V84.19555555h343.60888889v245.76c0 26.39644445 21.39022222 47.78666667 47.78666667 47.78666667h245.76v562.06222223z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M953.5488 832.61667556c-24.08448-57.08913778-58.74574221-108.31644445-102.70947556-152.28017777-43.96373333-43.96373333-95.19104-78.49756444-152.28017777-102.70947558-0.50972445-0.25486222-1.01944888-0.38229333-1.52917334-0.63715555C776.41955556 519.64586667 828.02915556 426.23886221 828.02915556 320.85333332c0-174.58062221-141.44853334-316.02915556-316.02915556-316.02915554S195.97084444 146.27271111 195.97084444 320.85333332c0 105.38552889 51.6096 198.79253333 130.99918223 256.26396447-0.50972445 0.25486222-1.01944888 0.38229333-1.52917334 0.63715555-57.08913778 24.08448-108.31644445 58.61831112-152.28017777 102.70947554-43.96373333 43.96373333-78.49756444 95.19104-102.70947556 152.28017779C46.74901333 888.55893332 34.13333334 947.8144 32.85902222 1009.23619556c-0.12743111 5.60696888 4.58752 9.93962667 10.19448889 9.93962666h76.45866667c5.7344 0 10.32192-4.71495112 10.19448889-10.44935111-1.27431111-60.91207112-13.88999112-120.16753779-37.59217778-176.10979555zM512 540.03484444c-58.49088 0-113.54112-22.81016889-154.95623111-64.22527999S292.81848888 379.34421333 292.81848888 320.85333332c0-58.49088 22.81016889-113.54112 64.22528001-154.9562311S453.50912 101.67182221 512 101.67182221s113.54112 22.81016889 154.95623111 64.22528001S731.18151112 262.36245333 731.18151112 320.85333332c0 58.49088-22.81016889 113.54112-64.22528001 154.95623113S570.49088 540.03484444 512 540.03484444z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m220.16 343.26755556l-32.54044445 44.37333333c-2.95822222 4.096-8.64711111 4.89244445-12.74311111 1.93422222L479.34577778 577.76355555c-2.38933333-1.70666667-3.75466667-4.43733333-3.75466667-7.39555555V257.13777778c0-5.00622222 4.096-9.10222222 9.10222222-9.10222223h54.72711112c5.00622222 0 9.10222222 4.096 9.10222222 9.10222223v281.6l162.24711111 117.30488889c4.096 2.84444445 5.00622222 8.53333333 2.048 12.62933333z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222122H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m901.80266667 257.82044445L656.95288889 12.97066667c-6.82666667-6.82666667-16.04266667-10.69511111-25.71377778-10.69511112H147.91111111c-20.13866667 0-36.40888889 16.27022222-36.40888889 36.40888889v946.6311111c0 20.13866667 16.27022222 36.40888889 36.40888889 36.40888889h728.17777778c20.13866667 0 36.40888889-16.27022222 36.40888889-36.40888889V283.648c0-9.67111111-3.86844445-19.00088889-10.69511111-25.82755555zM828.52977778 300.37333333H614.4V86.24355555L828.52977778 300.37333333z m2.048 639.43111112H193.42222222V84.19555555h343.60888889v245.76c0 26.39644445 21.39022222 47.78666667 47.78666667 47.78666667h245.76v562.06222223z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M981.07392 55.79662222H42.92608c-31.22062222 0-50.71758221 34.02410666-35.04355556 61.16693334L304.28728889 620.82616888V927.42542221c0 22.55530667 18.09521779 40.77795555 40.52309333 40.77795557h334.37923556c22.42787556 0 40.52309333-18.22264888 40.52309333-40.77795557V620.82616888L1016.24490667 116.96355556c15.54659555-27.14282666-3.95036444-61.16693333-35.17098667-61.16693334zM628.47203556 876.45297779H395.52796444V677.66044445h233.07150222v198.79253334z m12.23338666-301.50200891l-12.10595556 21.15356445h-233.19893332l-12.10595556-21.15356445L130.59868445 147.54702221h762.8026311L640.70542222 512 25.43706964 995.16579151c-6.79427767 8.02960089-1.08090782 20.22841761 9.41933952 20.2284176h123.22349044c7.25752386 0 14.20621693-3.24272343 18.99309439-8.80167789l334.3093444-398.54615144 334.30934441 398.54615144c4.63246205 5.55895447 11.58115512 8.80167789 18.99309439 8.80167789h123.22349044c10.50024731 0 16.21361717-12.19881672 9.41933951-20.2284176L591.98717801 512z',
        special: true,
        outlined: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m163.95377778 517.57511112L427.46311111 700.64355555c-1.59288889 1.13777778-3.41333333 1.70666667-5.34755556 1.70666667-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222V331.88977778c0-1.93422222 0.56888889-3.75466667 1.70666667-5.34755556 2.95822222-4.096 8.64711111-5.00622222 12.74311111-2.048L675.95377778 505.17333333c0.79644445 0.56888889 1.47911111 1.25155555 2.048 2.048 2.95822222 3.98222222 2.048 9.67111111-2.048 12.62933334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m218.45333333 537.03111112c0 5.00622222-4.096 9.10222222-9.10222222 9.10222222H302.64888889c-5.00622222 0-9.10222222-4.096-9.10222222-9.10222222v-54.61333334c0-5.00622222 4.096-9.10222222 9.10222222-9.10222222h418.70222222c5.00622222 0 9.10222222 4.096 9.10222222 9.10222222v54.61333334z',
        special: true,
      },
      {
        viewBox: [1024, 1024],
        path: 'M512 2.27555555C230.51377778 2.27555555 2.27555555 230.51377778 2.27555555 512s228.23822222 509.72444445 509.72444445 509.72444445 509.72444445-228.23822222 509.72444445-509.72444445S793.48622222 2.27555555 512 2.27555555z m901.80266667 257.82044445L656.95288889 12.97066667c-6.82666667-6.82666667-16.04266667-10.69511111-25.71377778-10.69511112H147.91111111c-20.13866667 0-36.40888889 16.27022222-36.40888889 36.40888889v946.6311111c0 20.13866667 16.27022222 36.40888889 36.40888889 36.40888889h728.17777778c20.13866667 0 36.40888889-16.27022222 36.40888889-36.40888889V283.648c0-9.67111111-3.86844445-19.00088889-10.69511111-25.82755555zM828.52977778 300.37333333H614.4V86.24355555L828.52977778 300.37333333z m2.048 639.43111112H193.42222222V84.19555555h343.60888889v245.76c0 26.39644445 21.39022222 47.78666667 47.78666667 47.78666667h245.76v562.06222223z',
        special: true,
        outlined: true,
      },
    ],
  }
]