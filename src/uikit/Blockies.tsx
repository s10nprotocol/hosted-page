import { FC, memo, useCallback, useEffect, useRef } from 'react'

function seedrand(seed: string) {
  const randseed = new Array<number>(4)
  for (let i = 0; i < randseed.length; i++) {
    randseed[i] = 0
  }
  for (let i = 0; i < seed.length; i++) {
    randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i)
  }
  return randseed
}

function rand(randseed: number[]) {
  // based on Java's String.hashCode(), expanded to 4 32bit values
  const t = randseed[0] ^ (randseed[0] << 11)

  randseed[0] = randseed[1]
  randseed[1] = randseed[2]
  randseed[2] = randseed[3]
  randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8)

  return (randseed[3] >>> 0) / ((1 << 31) >>> 0)
}

function createColor(randseed: number[]) {
  // saturation is the whole color spectrum
  const h = Math.floor(rand(randseed) * 360)
  // saturation goes from 40 to 100, it avoids greyish colors
  const s = rand(randseed) * 60 + 40 + '%'
  // lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
  const l = (rand(randseed) + rand(randseed) + rand(randseed) + rand(randseed)) * 25 + '%'

  const color = 'hsl(' + h + ',' + s + ',' + l + ')'
  return color
}

function createImageData(size: number, randseed: number[]) {
  const width = size // Only support square icons for now
  const height = size

  const dataWidth = Math.ceil(width / 2)
  const mirrorWidth = width - dataWidth

  const data = []
  for (let y = 0; y < height; y++) {
    let row = []
    for (let x = 0; x < dataWidth; x++) {
      // this makes foreground and background color to have a 43% (1/2.3) probability
      // spot color has 13% chance
      row[x] = Math.floor(rand(randseed) * 2.3)
    }
    const r = row.slice(0, mirrorWidth)
    r.reverse()
    row = row.concat(r)

    for (let i = 0; i < row.length; i++) {
      data.push(row[i])
    }
  }

  return data
}

interface BlockiesProps {
  seed: string
  size?: number
  scale?: number
  color?: string
  bgColor?: string
  spotColor?: string
  className?: string
}

export const Blockies: FC<BlockiesProps> = memo(({ seed, size, scale, color, bgColor, spotColor, className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const setCanvas = useCallback(
    (_imageData: number[], _color: string, _scale: number, _bgcolor: string, _spotcolor: string) => {
      if (canvasRef.current) {
        const width = Math.sqrt(_imageData.length)
        const size = width * _scale
        canvasRef.current.width = size
        canvasRef.current.style.width = `${size}px`
        canvasRef.current.height = size
        canvasRef.current.style.height = `${size}px`

        const cc = canvasRef.current.getContext('2d')
        if (!cc) return
        cc.fillStyle = _bgcolor
        cc.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        cc.fillStyle = _color
        for (let i = 0; i < _imageData.length; i++) {
          // if data is 2, choose spot color, if 1 choose foreground
          cc.fillStyle = _imageData[i] === 1 ? _color : _spotcolor

          // if data is 0, leave the background
          if (_imageData[i]) {
            const row = Math.floor(i / width)
            const col = i % width

            cc.fillRect(col * _scale, row * _scale, _scale, _scale)
          }
        }
      }
    },
    []
  )

  useEffect(() => {
    const displaySize = size || 8
    const displayScale = scale || 4
    const displaySeed = seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16)

    const randSeed = seedrand(displaySeed)

    const displayColor = color || createColor(randSeed)
    const displayBgcolor = bgColor || createColor(randSeed)
    const displaySpotcolor = spotColor || createColor(randSeed)
    const imageData = createImageData(displaySize, randSeed)
    const canvas = setCanvas(imageData, displayColor, displayScale, displayBgcolor, displaySpotcolor)
  }, [bgColor, color, scale, seed, setCanvas, size, spotColor])

  return <canvas ref={canvasRef} className={className} />
})

export default Blockies
