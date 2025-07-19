export const enum ShapePathFormulasKeys {
  ROUND_RECT = 'roundRect',
  ROUND_RECT_DIAGONAL = 'roundRectDiagonal',
  ROUND_RECT_SINGLE = 'roundRectSingle',
  ROUND_RECT_SAMESIDE = 'roundRectSameSide',
  CUT_RECT_DIAGONAL = 'cutRectDiagonal',
  CUT_RECT_SINGLE = 'cutRectSingle',
  CUT_RECT_SAMESIDE = 'cutRectSameSide',
  CUT_ROUND_RECT = 'cutRoundRect',
  MESSAGE = 'message',
  ROUND_MESSAGE = 'roundMessage',
  L = 'L',
  RING_RECT = 'ringRect',
  PLUS = 'plus',
  TRIANGLE = 'triangle',
  PARALLELOGRAM_LEFT = 'parallelogramLeft',
  PARALLELOGRAM_RIGHT = 'parallelogramRight',
  TRAPEZOID = 'trapezoid',
  BULLET = 'bullet',
  INDICATOR = 'indicator',
}

export const enum ElementTypes {
  TEXT = 'text',
  IMAGE = 'image',
  SHAPE = 'shape',
  LINE = 'line',
  CHART = 'chart',
  TABLE = 'table',
  LATEX = 'latex',
  VIDEO = 'video',
  AUDIO = 'audio',
}

/**
 * Gradient
 *
 * type: Gradient type (radial, linear)
 *
 * colors: Gradient color list (pos: percentage position; color: color)
 *
 * rotate: Gradient angle (linear gradient)
 */
export type GradientType = 'linear' | 'radial'
export type GradientColor = {
  pos: number
  color: string
}
export interface Gradient {
  type: GradientType
  colors: GradientColor[]
  rotate: number
}

export type LineStyleType = 'solid' | 'dashed' | 'dotted'

/**
 * Element Shadow
 *
 * h: Horizontal offset
 *
 * v: Vertical offset
 *
 * blur: Blur amount
 *
 * color: Shadow color
 */
export interface PPTElementShadow {
  h: number
  v: number
  blur: number
  color: string
}

/**
 * Element Border
 *
 * style?: Border style (solid or dashed)
 *
 * width?: Border width
 *
 * color?: Border color
 */
export interface PPTElementOutline {
  style?: LineStyleType
  width?: number
  color?: string
}

export type ElementLinkType = 'web' | 'slide'

/**
 * Element Hyperlink
 *
 * type: Link type (webpage, slide page)
 *
 * target: Target address (webpage link, slide page ID)
 */
export interface PPTElementLink {
  type: ElementLinkType
  target: string
}

/**
 * Common Element Properties
 *
 * id: Element ID
 *
 * left: Element horizontal position (distance from the canvas left)
 *
 * top: Element vertical position (distance from the canvas top)
 *
 * lock?: Lock element
 *
 * groupId?: Group ID (elements with the same group ID are members of the same group)
 *
 * width: Element width
 *
 * height: Element height
 *
 * rotate: Rotation angle
 *
 * link?: Hyperlink
 *
 * name?: Element name
 */
interface PPTBaseElement {
  id: string
  left: number
  top: number
  lock?: boolean
  groupId?: string
  width: number
  height: number
  rotate: number
  link?: PPTElementLink
  name?: string
}

export type TextType = 'title' | 'subtitle' | 'content' | 'item' | 'itemTitle' | 'notes' | 'header' | 'footer' | 'partNumber' | 'itemNumber'

/**
 * Text Element
 *
 * type: Element type (text)
 *
 * content: Text content (HTML string)
 *
 * defaultFontName: Default font (overridden by HTML inline styles in content)
 *
 * defaultColor: Default color (overridden by HTML inline styles in content)
 *
 * outline?: Border
 *
 * fill?: Fill color
 *
 * lineHeight?: Line height (multiplier), default 1.5
 *
 * wordSpace?: Word spacing, default 0
 *
 * opacity?: Opacity, default 1
 *
 * shadow?: Shadow
 *
 * paragraphSpace?: Paragraph spacing, default 5px
 *
 * vertical?: Vertical text
 *
 * textType?: Text type
 */
export interface PPTTextElement extends PPTBaseElement {
  type: 'text'
  content: string
  defaultFontName: string
  defaultColor: string
  outline?: PPTElementOutline
  fill?: string
  lineHeight?: number
  wordSpace?: number
  opacity?: number
  shadow?: PPTElementShadow
  paragraphSpace?: number
  vertical?: boolean
  textType?: TextType
}

/**
 * Image Flip, Shape Flip
 *
 * flipH?: Horizontal flip
 *
 * flipV?: Vertical flip
 */
export interface ImageOrShapeFlip {
  flipH?: boolean
  flipV?: boolean
}

/**
 * Image Filter
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter
 *
 * 'blur'?: Blur, default 0 (px)
 *
 * 'brightness'?: Brightness, default 100 (%)
 *
 * 'contrast'?: Contrast, default 100 (%)
 *
 * 'grayscale'?: Grayscale, default 0 (%)
 *
 * 'saturate'?: Saturation, default 100 (%)
 *
 * 'hue-rotate'?: Hue rotate, default 0 (deg)
 *
 * 'opacity'?: Opacity, default 100 (%)
 */
export type ImageElementFilterKeys = 'blur' | 'brightness' | 'contrast' | 'grayscale' | 'saturate' | 'hue-rotate' | 'opacity' | 'sepia' | 'invert'
export interface ImageElementFilters {
  'blur'?: string
  'brightness'?: string
  'contrast'?: string
  'grayscale'?: string
  'saturate'?: string
  'hue-rotate'?: string
  'sepia'?: string
  'invert'?: string
  'opacity'?: string
}

export type ImageClipDataRange = [[number, number], [number, number]]

/**
 * Image Crop
 *
 * range: Crop range, e.g., [[10, 10], [90, 90]] means cropping the range from 10%, 10% to 90%, 90% of the original image from the top-left corner
 *
 * shape: Crop shape, see configs/imageClip.ts CLIPPATHS
 */
export interface ImageElementClip {
  range: ImageClipDataRange
  shape: string
}

export type ImageType = 'pageFigure' | 'itemFigure' | 'background'

/**
 * Image Element
 *
 * type: Element type (image)
 *
 * fixedRatio: Fixed image aspect ratio
 *
 * src: Image URL
 *
 * outline?: Border
 *
 * filters?: Image filters
 *
 * clip?: Crop information
 *
 * flipH?: Horizontal flip
 *
 * flipV?: Vertical flip
 *
 * shadow?: Shadow
 *
 * radius?: Corner radius
 *
 * colorMask?: Color mask
 *
 * imageType?: Image type
 */
export interface PPTImageElement extends PPTBaseElement {
  type: 'image'
  fixedRatio: boolean
  src: string
  outline?: PPTElementOutline
  filters?: ImageElementFilters
  clip?: ImageElementClip
  flipH?: boolean
  flipV?: boolean
  shadow?: PPTElementShadow
  radius?: number
  colorMask?: string
  imageType?: ImageType
}

export type ShapeTextAlign = 'top' | 'middle' | 'bottom'

/**
 * Text in Shape
 *
 * content: Text content (HTML string)
 *
 * defaultFontName: Default font (overridden by HTML inline styles in content)
 *
 * defaultColor: Default color (overridden by HTML inline styles in content)
 *
 * align: Text alignment direction (vertical direction)
 *
 * type: Text type
 */
export interface ShapeText {
  content: string
  defaultFontName: string
  defaultColor: string
  align: ShapeTextAlign
  type?: TextType
}

/**
 * Shape Element
 *
 * type: Element type (shape)
 *
 * viewBox: SVG's viewBox attribute, e.g., [1000, 1000] means '0 0 1000 1000'
 *
 * path: Shape path, SVG path's d attribute
 *
 * fixedRatio: Fixed shape aspect ratio
 *
 * fill: Fill, effective when no gradient exists
 *
 * gradient?: Gradient, will be prioritized as fill when this property exists
 *
 * pattern?: Pattern, will be prioritized as fill when this property exists
 *
 * outline?: Border
 *
 * opacity?: Opacity
 *
 * flipH?: Horizontal flip
 *
 * flipV?: Vertical flip
 *
 * shadow?: Shadow
 *
 * special?: Special shape (marks some hard-to-parse shapes, e.g., paths using types other than L Q C A; such shapes will be converted to images upon export)
 *
 * text?: Text within the shape
 *
 * pathFormula?: Shape path calculation formula
 * Generally, when the shape size changes, the shape is adjusted solely by scaling the width and height based on the viewBox ratio, while the viewBox and path themselves do not change.
 * However, some shapes may require more precise control over the position of certain key points. In such cases, a path calculation formula needs to be provided. By updating the viewBox and recalculating the path upon scaling, the shape can be redrawn.
 *
 * keypoints?: Keypoint positions in percentage
 */
export interface PPTShapeElement extends PPTBaseElement {
  type: 'shape'
  viewBox: [number, number]
  path: string
  fixedRatio: boolean
  fill: string
  gradient?: Gradient
  pattern?: string
  outline?: PPTElementOutline
  opacity?: number
  flipH?: boolean
  flipV?: boolean
  shadow?: PPTElementShadow
  special?: boolean
  text?: ShapeText
  pathFormula?: ShapePathFormulasKeys
  keypoints?: number[]
}

export type LinePoint = '' | 'arrow' | 'dot'

/**
 * Line Element
 *
 * type: Element type (line)
 *
 * start: Start point position ([x, y])
 *
 * end: End point position ([x, y])
 *
 * style: Line style (solid, dashed, dotted)
 *
 * color: Line color
 *
 * points: End point styles ([start point style, end point style], optional: none, arrow, dot)
 *
 * shadow?: Shadow
 *
 * broken?: Polyline control point position ([x, y])
 *
 * broken2?: Double polyline control point position ([x, y])
 *
 * curve?: Quadratic bezier curve control point position ([x, y])
 *
 * cubic?: Cubic bezier curve control point position ([[x1, y1], [x2, y2]])
 */
export interface PPTLineElement extends Omit<PPTBaseElement, 'height' | 'rotate'> {
  type: 'line'
  start: [number, number]
  end: [number, number]
  style: LineStyleType
  color: string
  points: [LinePoint, LinePoint]
  shadow?: PPTElementShadow
  broken?: [number, number]
  broken2?: [number, number]
  curve?: [number, number]
  cubic?: [[number, number], [number, number]]
}

export type ChartType = 'bar' | 'column' | 'line' | 'pie' | 'ring' | 'area' | 'radar' | 'scatter'

export interface ChartOptions {
  lineSmooth?: boolean
  stack?: boolean
}

export interface ChartData {
  labels: string[]
  legends: string[]
  series: number[][]
}

/**
 * Chart Element
 *
 * type: Element type (chart)
 *
 * fill?: Fill color
 *
 * chartType: Basic chart type (bar/line/pie); all chart types are derived from these three basic types
 *
 * data: Chart data
 *
 * options: Extended options
 *
 * outline?: Border
 *
 * themeColors: Theme colors
 *
 * textColor?: Text color
 */
export interface PPTChartElement extends PPTBaseElement {
  type: 'chart'
  fill?: string
  chartType: ChartType
  data: ChartData
  options?: ChartOptions
  outline?: PPTElementOutline
  themeColors: string[]
  textColor?: string
}

export type TextAlign = 'left' | 'center' | 'right' | 'justify'
/**
 * Table Cell Style
 *
 * bold?: Bold
 *
 * em?: Italic
 *
 * underline?: Underline
 *
 * strikethrough?: Strikethrough
 *
 * color?: Font color
 *
 * backcolor?: Background color
 *
 * fontsize?: Font size
 *
 * fontname?: Font name
 *
 * align?: Alignment
 */
export interface TableCellStyle {
  bold?: boolean
  em?: boolean
  underline?: boolean
  strikethrough?: boolean
  color?: string
  backcolor?: string
  fontsize?: string
  fontname?: string
  align?: TextAlign
}

/**
 * Table Cell
 *
 * id: Cell ID
 *
 * colspan: Number of columns to span
 *
 * rowspan: Number of rows to span
 *
 * text: Text content
 *
 * style?: Cell style
 */
export interface TableCell {
  id: string
  colspan: number
  rowspan: number
  text: string
  style?: TableCellStyle
}

/**
 * Table Theme
 *
 * color: Theme color
 *
 * rowHeader: Header row
 *
 * rowFooter: Footer row
 *
 * colHeader: First column
 *
 * colFooter: Last column
 */
export interface TableTheme {
  color: string
  rowHeader: boolean
  rowFooter: boolean
  colHeader: boolean
  colFooter: boolean
}

/**
 * Table Element
 *
 * type: Element type (table)
 *
 * outline: Border
 *
 * theme?: Theme
 *
 * colWidths: Array of column widths, e.g., [30, 50, 20] means the widths of the three columns are 30%, 50%, 20%
 *
 * cellMinHeight: Minimum cell height
 *
 * data: Table data
 */
export interface PPTTableElement extends PPTBaseElement {
  type: 'table'
  outline: PPTElementOutline
  theme?: TableTheme
  colWidths: number[]
  cellMinHeight: number
  data: TableCell[][]
}

/**
 * LaTeX Element (Formula)
 *
 * type: Element type (latex)
 *
 * latex: latex code
 *
 * path: svg path
 *
 * color: Color
 *
 * strokeWidth: Path width
 *
 * viewBox: SVG's viewBox attribute
 *
 * fixedRatio: Fixed shape aspect ratio
 */
export interface PPTLatexElement extends PPTBaseElement {
  type: 'latex'
  latex: string
  path: string
  color: string
  strokeWidth: number
  viewBox: [number, number]
  fixedRatio: boolean
}

/**
 * Video Element
 *
 * type: Element type (video)
 *
 * src: Video URL
 *
 * autoplay: Autoplay
 *
 * poster: Preview cover
 *
 * ext: Video extension, used to confirm resource type when the resource link is missing the suffix
 */
export interface PPTVideoElement extends PPTBaseElement {
  type: 'video'
  src: string
  autoplay: boolean
  poster?: string
  ext?: string
}

/**
 * Audio Element
 *
 * type: Element type (audio)
 *
 * fixedRatio: Fixed icon aspect ratio
 *
 * color: Icon color
 *
 * loop: Loop playback
 *
 * autoplay: Autoplay
 *
 * src: Audio URL
 *
 * ext: Audio extension, used to confirm resource type when the resource link is missing the suffix
 */
export interface PPTAudioElement extends PPTBaseElement {
  type: 'audio'
  fixedRatio: boolean
  color: string
  loop: boolean
  autoplay: boolean
  src: string
  ext?: string
}

export type PPTElement = PPTTextElement | PPTImageElement | PPTShapeElement | PPTLineElement | PPTChartElement | PPTTableElement | PPTLatexElement | PPTVideoElement | PPTAudioElement

export type AnimationType = 'in' | 'out' | 'attention'
export type AnimationTrigger = 'click' | 'meantime' | 'auto'

/**
 * Element Animation
 *
 * id: Animation ID
 *
 * elId: Element ID
 *
 * effect: Animation effect
 *
 * type: Animation type (entrance, exit, emphasis)
 *
 * duration: Animation duration
 *
 * trigger: Animation trigger method (click - on click, meantime - simultaneously with the previous animation, auto - after the previous animation)
 */
export interface PPTAnimation {
  id: string
  elId: string
  effect: string
  type: AnimationType
  duration: number
  trigger: AnimationTrigger
}

export type SlideBackgroundType = 'solid' | 'image' | 'gradient'
export type SlideBackgroundImageSize = 'cover' | 'contain' | 'repeat'
export interface SlideBackgroundImage {
  src: string
  size: SlideBackgroundImageSize,
}

/**
 * Slide Background
 *
 * type: Background type (solid color, image, gradient)
 *
 * color?: Background color (solid color)
 *
 * image?: Image background
 *
 * gradientType?: Gradient background
 */
export interface SlideBackground {
  type: SlideBackgroundType
  color?: string
  image?: SlideBackgroundImage
  gradient?: Gradient
}

export type TurningMode = 'no' | 'fade' | 'slideX' | 'slideY' | 'random' | 'slideX3D' | 'slideY3D' | 'rotate' | 'scaleY' | 'scaleX' | 'scale' | 'scaleReverse'

export interface NoteReply {
  id: string
  content: string
  time: number
  user: string
}

export interface Note {
  id: string
  content: string
  time: number
  user: string
  elId?: string
  replies?: NoteReply[]
}

export interface SectionTag {
  id: string
  title?: string
}

export type SlideType = 'cover' | 'contents' | 'transition' | 'content' | 'end'

/**
 * Slide Page
 *
 * id: Page ID
 *
 * elements: Element collection
 *
 * notes?: Notes
 *
 * remark?: Remark
 *
 * background?: Page background
 *
 * animations?: Element animation collection
 *
 * turningMode?: Page turning mode
 *
 * slideType?: Page type
 */
export interface Slide {
  id: string
  elements: PPTElement[]
  notes?: Note[]
  remark?: string
  background?: SlideBackground
  animations?: PPTAnimation[]
  turningMode?: TurningMode
  sectionTag?: SectionTag
  type?: SlideType
}

/**
 * Slide Theme
 *
 * backgroundColor: Page background color
 *
 * themeColors: Theme colors, used for default created shape colors, etc.
 *
 * fontColor: Font color
 *
 * fontName: Font name
 */
export interface SlideTheme {
  backgroundColor: string
  themeColors: string[]
  fontColor: string
  fontName: string
  outline: PPTElementOutline
  shadow: PPTElementShadow
}

export interface SlideTemplate {
  name: string
  id: string
  cover: string
}