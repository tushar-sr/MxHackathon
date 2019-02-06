import { h, render, Component } from 'preact'

import autobind from '@mxplay/autobind'

import { VideoPlayer } from '@mxplay/video-player'

export default class Player extends Component {
  constructor(props) {
    super(props)
    autobind(this, 'updateHistory', 'onPlay', 'onPause', 'onAutoplay', 'onWaiting',
      'onBufferEnd', 'onPlayEnd', 'onSeeked', 'onYoutubePlayEnd', 'onYoutubePlayerReady',
      'onOpenSettings', 'onQualitySelection', 'onError', 'onPlayButtonClick', 'onFirstPlay',
      'getFairplayUrl', 'getWidevineLicense', 'onHeartbeat')
  }

  onPlay(e, player){
    console.log("On Play")
  }
  onPlaying(e, player){
      console.log("On Playing")
    }
  onPause(e, player){
      console.log("On Pause")
    }
  onSeeked(e, player){
      console.log("On Seeked")
    }
  onSeeking(e, player){
      console.log("On Seeking")
    }
  onPlayButtonClick(){
    console.log("Play button clicked")
  }
  playerReady(player){
    this.props.playerReady(player)
  }
  render () {
    const update = {
      type: "recurring",
      interval: 1,
      update: this.props.onTimeUpdate
    }
    var self = this
    var schedule = []
   
    var options = {
        poster: "https://s3.ap-south-1.amazonaws.com/mx-cms-content/pic/upload/test_pic1520363431069.jpg",
        // url: "https://j2apps.s.llnwi.net/video/0726dc9967016117d1d8fbd57c241604/hls/h264_baseline.m3u8",
        url: "https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
        autoplay: true,
        // adTagUrl: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&' +
        // 'iu=/124319096/external/ad_rule_samples&ciu_szs=300x250&ad_rule=1&' +
        // 'impl=s&gdfp_req=1&env=vp&output=xml_vmap1&unviewed_position_start=1&' +
        // 'cust_params=sample_ar%3Dpremidpostpod%26deployment%3Dgmf-js&cmsid=496&' +
        // 'vid=short_onecue&correlator=',
        schedule: schedule,
        resizeManager: false,
        akamaiBeacon: 'https://ma238-r.analytics.edgekey.net/config/beacon-21547.xml'
      }

    const akaMaiObj = {
      title: 'data.title',
      eventName: 'data.title',
      subCategory: 'data.genre[0]',
      ContentID: 'contentId',
      Content_ID: 'contentId',
      ContentProvider: 'provider',
      Content_Provider: 'provider',
      type: 'data.type'
    }

    const stream = {
      "hls": {
        "url": "https://j2apps.s.llnwi.net/video/5103b29e25af9c4fa9166aff6336a210/2/hls/h264_baseline.m3u8",
        "hlsId": null
      },
      "dash": {
        "url": "https://j2apps.s.llnwi.net/video/5103b29e25af9c4fa9166aff6336a210/2/dash/h264_baseline.mpd",
        "dashId": null
      }
    }

    return (
      <div style={{width: "100%", height: "56.25vw"}}>
          <VideoPlayer staticUrl="/js" options={options} ready={function(player){
              self.playerReady(player)
          }}
          streams={stream}
          mobile={true}
          history={update}
          akaMaiObj={akaMaiObj}
          loadAkamaiSdk={false}
          onHeartbeat={() => {
              console.log("heartbeat")
          }}
          onPlay={this.onPlay.bind(this)}
          onPause={this.onPause.bind(this)}
          onPlaying={this.onPlaying.bind(this)}
          onSeeking={this.onSeeking.bind(this)}
          onSeeked={this.onSeeked.bind(this)}
          onPlayButtonClick={this.onPlayButtonClick.bind(this)}
          />
      </div>
    )
  }
}
