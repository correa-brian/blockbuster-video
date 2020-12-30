'use strict'
import fs from 'fs'

/**
 * Parse video metadata and stream.
 *
 * @param { Request } req
 * @param { Object } reply
 */
export const streamVideo = async (req, reply) => {
  // Ensure there is a range given for the video
  const range = req.headers.range
  if (!range) {
    reply
      .code(400).send('Requires Range header')
  }

  // get video stats (about 61MB)
  const videoPath = './bigbuck.mp4'
  const videoSize = fs.statSync('bigbuck.mp4').size

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6 // 1MB
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

  // Create headers
  const contentLength = end - start + 1
  const videoStream = fs.createReadStream(videoPath, { start, end })
  reply
    .code(206)
    .header('Content-Length', contentLength)
    .type('video/mp4')
    .header('Content-Range', `bytes ${start}-${end}/${videoSize}`)
    .header('Accept-Ranges', 'bytes')
    .send(videoStream)
}
