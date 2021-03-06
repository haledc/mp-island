// components/classic/music/index.js

import { classicBehavior } from '../classic-behavior'

const musicManager = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBehavior],
  properties: {
    musicUrl: String,
    title: String
  },

  data: {
    playSrc: './images/player@play.png',
    pauseSrc: './images/player@pause.png',
    isPlay: false
  },

  methods: {
    handlePlay() {
      if (!this.data.isPlay) {
        this.setData({
          isPlay: true
        })
        musicManager.src = this.properties.musicUrl
        musicManager.title = this.properties.title
      } else {
        this.setData({
          isPlay: false
        })
        musicManager.pause()
      }
    },

    _recoverStatus() {
      if (musicManager.paused) {
        this.setData({
          isPlay: false
        })
        return
      }

      if (musicManager.src === this.properties.musicUrl) {
        this.setData({
          isPlay: true
        })
      } else {
        this.setData({
          isPlay: false
        })
      }
    },

    _monitorSwitch() {
      musicManager.onPlay(() => {
        this._recoverStatus()
      })
      musicManager.onPause(() => {
        this._recoverStatus()
      })
      musicManager.onStop(() => {
        this._recoverStatus()
      })
      musicManager.onEnded(() => {
        this._recoverStatus()
      })
    }
  },

  lifetimes: {
    attached() {
      this._recoverStatus()
      this._monitorSwitch()
    },
    detached() {
      // musicManager.stop()
    }
  }
})
