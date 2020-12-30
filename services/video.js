'use strict'
import { streamVideo } from '../handlers/video.js'

export const videoService = [
  {
    method: 'GET',
    url: '/video',
    handler: streamVideo
  }
]
