import {Component, Input, ViewChild, Renderer, HostListener, OnInit, ElementRef, AfterContentInit  } from '@angular/core';
import { Router} from '@angular/router';
import { TimePipe } from '../time.pipe';
import { TextOverflowEllipsisPipe } from '../text-overflow-ellipsis.pipe';
import { Podcast } from '../play';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoMetaData: Podcast;
  @Input() context: string;
  @Input() episodes: Podcast[];
  @Input() src: string;

  @ViewChild('controller') controller: ElementRef;
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('fullPlayerElement') fullPlayerElement: ElementRef;
  @ViewChild('progressMeterFull') progressMeterFull: ElementRef;
  @ViewChild('progressMeter') progressMeter: ElementRef;
  @ViewChild('playButton') playButton: ElementRef;
  @ViewChild('playButton_wheel') playButton_wheel: ElementRef;
  @ViewChild('volumeButton') volumeButton: ElementRef;
  @ViewChild('volumeButton_wheel') volumeButton_wheel: ElementRef;
  @ViewChild('thumbScrubber') thumbScrubber: ElementRef;
  @ViewChild('volumeMeterFull') volumeMeterFull: ElementRef;
  @ViewChild('volumeMeter') volumeMeter: ElementRef;
  @ViewChild('volumeScrubber') volumeScrubber: ElementRef;
  @ViewChild('onOffThumbScrubber') onOffThumbScrubber: ElementRef;
  @ViewChild('onOffButton') onOffButton: ElementRef;
  @ViewChild('switchThumbScrubber') switchThumbScrubber: ElementRef;
  @ViewChild('switchButton') switchButton: ElementRef;
  @ViewChild('cogIcon') cogIcon: ElementRef;
  @ViewChild('pendingTimeElement') pendingTimeElement: ElementRef;
  @ViewChild('wheelController') wheelController: ElementRef;
  @ViewChild('progressMeterFull_wheel') progressMeterFull_wheel: ElementRef;
  @ViewChild('progressMeter_wheel') progressMeter_wheel: ElementRef;
  @ViewChild('thumbScrubber_wheel') thumbScrubber_wheel: ElementRef;
  @ViewChild('volumeMeterFull_wheel') volumeMeterFull_wheel: ElementRef;
  @ViewChild('volumeMeter_wheel') volumeMeter_wheel: ElementRef;
  @ViewChild('volumeThumbScrubber_wheel') volumeThumbScrubber_wheel: ElementRef;
  @ViewChild('bufferedPercentages_wheel') bufferedPercentages_wheel: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('fullPlayerContainer') fullPlayerContainer: ElementRef;
  @ViewChild('playlist') playlist: ElementRef;
  @ViewChild('playlistIcon') playlistIcon: ElementRef;
  @ViewChild('previousButton') previousButton: ElementRef;
  @ViewChild('previousButton_wheel') previousButton_wheel: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;
  @ViewChild('nextButton_wheel') nextButton_wheel: ElementRef;
  @ViewChild('pendingTimeElementWheel') pendingTimeElementWheel: ElementRef;
  @ViewChild('canvasContainer') canvasContainer: ElementRef;
  @ViewChild('settingBar') settingBar: ElementRef;
  @ViewChild('repeatButton') repeatButton: ElementRef;
  @ViewChild('repeatButton_wheel') repeatButton_wheel: ElementRef;
  @ViewChild('viewMode_wheel') viewMode_wheel: ElementRef;
  @ViewChild('fullScreenBtn_wheel') fullScreenBtn_wheel: ElementRef;
  video: any;
  videoPlaying: boolean = false;
  currentTime: number;
  totalTime: number;
  scrubLeft: string;
  progressBarTimer: any;
  isDragging: boolean = false;
  isDraggingVolume: boolean = false;
  volumeScrubTop: any = 100;
  bufferedPercentages: string = "0";
  currentVolume: number = 1;
  showVolumeBar: boolean = false;
  videoRepeat: boolean = false;
  isFullscreen: boolean = false;
  showSettingPanel: boolean = false;
  autoPlay: boolean = true;
  controlsOpacity: number = 1;
  timer: any;
  hideControllerTimer: any;
  pendingTime: number;
  showPendingTime: boolean = false;
  showPlaylist: boolean = false;
  canvasCenterPoint_X: number;
  canvasCenterPoint_Y: number;
  progressMeterFull_wheel_canvas: any;
  progressMeterFull_wheel_ctx: any;
  progressMeterFull_wheel_radius: number;
  progressMeter_wheel_canvas: any;
  progressMeter_wheel_ctx: any;
  thumbScrubber_wheel_canvas: any;
  thumbScrubber_wheel_ctx: any;

  volumeMeterFull_wheel_canvas: any;
  volumeMeterFull_wheel_ctx: any;
  volumeMeterFull_wheel_radius: number;

  volumeMeter_wheel_canvas: any;
  volumeMeter_wheel_ctx: any;
  volumeThumbScrubber_wheel_canvas: any;
  volumeThumbScrubber_wheel_ctx: any;
  bufferedPercentages_wheel_canvas: any;
  bufferedPercentages_wheel_ctx: any;

  standardController: boolean = false;
  circleController: boolean = true;
  thumbScrubber_wheel_oldPosition: number;

  viewMode: string = "Default view";
  description_excerpt: boolean;
  description_full: boolean;
  featured_clips: boolean = false;
  currentEpisodeIndex: number = 0;
  nextVideoSeeking: boolean = false;
  fontSize: number = 14;
  thumbScrubberSize: number = 7;

  touchStartListener: any = null;
  touchStartListener_volume: any = null;
  watchBuffer: any;
  previousViewMode: string;

  constructor(private renderer: Renderer, private router: Router) {
  }

  //Toggle player's playlist
  togglePlaylist(){
    let i = this.playlistIcon.nativeElement.style;
    if(this.showPlaylist){
      this.showPlaylist = false;
      i.color = "#acbeca";
    }else{
      this.showPlaylist = true;
      i.color = "#e67233";
    }
  }

  //Toggle autoplay for next video
  toggleAutoplay(){
    let t = this.onOffThumbScrubber.nativeElement;
    let b = this.onOffButton.nativeElement;
    if(this.autoPlay){
      this.autoPlay = false;
      t.style.left = "0";
      t.style.background = "#878788";
      b.style.margin = "0 0 0 -100%";
    }else{
      this.autoPlay = true;
      t.style.left = "100%";
      t.style.background = "#e67233";
      b.style.margin = "0";
    }
  }

  //Switch controller
  switchController(){
    let t = this.switchThumbScrubber.nativeElement;
    let b = this.switchButton.nativeElement;
    if(this.circleController){
      this.circleController = false;
      this.standardController = true;
      t.style.left = "0";
      t.style.background = "#878788";
      b.style.margin = "0 0 0 -100%";
      this.updateProgressMeter();
      this.volumeScrubTop = this.video.volume * 100;
      this.clearTouchListeners();
      this.addTouchListeners("standard");
    }else{
      this.circleController = true;
      this.standardController = false;
      t.style.left = "100%";
      t.style.background = "#e67233";
      b.style.margin = "0";
      this.clearTouchListeners();
      this.addTouchListeners("circle");
      this.drawCircle("progressMeter", this.progressMeterFull_wheel_canvas, this.progressMeterFull_wheel_ctx, this.video.currentTime/this.video.duration, this.progressMeterFull_wheel_radius);
      this.drawCircle("volumeMeter", this.volumeMeterFull_wheel_canvas, this.volumeMeterFull_wheel_ctx, this.video.volume, this.volumeMeterFull_wheel_radius);
    }
    if(this.currentEpisodeIndex == this.episodes.length-1){
      this.changeNextBtnOpacity("0.5", "default");
    }else{
      this.changeNextBtnOpacity("1", "pointer");
    }
    if(this.currentEpisodeIndex == 0){
      this.changePreviousBtnOpacity("0.5", "default");
    }else{
      this.changePreviousBtnOpacity("1", "pointer");
    }
  }

  //Switch view mode
  switchViewMode(){
    if(this.viewMode === "Default view"){
      this.viewMode = "Theater mode";
      if(this.context == "play"){
        this.description.nativeElement.style.margin = "0 -36% 0 0";
        this.fullPlayerElement.nativeElement.style.width = "100%";
      }else if(this.context == "program"){
        this.description.nativeElement.style.margin = "0 -47% 0 0";
        this.fullPlayerElement.nativeElement.style.width = "100%";
      }
    }else{
      this.viewMode = "Default view";
      this.description.nativeElement.style.margin = "0 0 0 0";
      if(this.context == "play"){
        this.fullPlayerElement.nativeElement.style.width = "62%";
      }else if(this.context == "program"){
        this.fullPlayerElement.nativeElement.style.width = "50%";
      }
    }
    let self = this;
    if(this.circleController){
      let updateWheelCtrl = setInterval(function () {
        self.updateWheelController();
      }, 10);
      setTimeout(function(){ clearInterval(updateWheelCtrl);}, 500);
    }
  }

  //Display info
  toggleInfo(event){
    event.preventDefault();
    if(this.context == "play"){
      if(this.description.nativeElement.style.margin == "5% 10%"){
        this.description.nativeElement.style.margin = "0 -90% 0 0";
        event.target.style.color = "#acbeca";
      }else{
        event.target.style.color = "#e67233";
        this.description.nativeElement.style.margin = "5% 10%";
      }
    }else if(this.context == "program"){
      if(this.description.nativeElement.style.margin == "5% 10%"){
        this.description.nativeElement.style.margin = "0 -90% 0 0";
        event.target.style.color = "#acbeca";
      }else{
        event.target.style.color = "#e67233";
        this.description.nativeElement.style.margin = "5% 10%";
      }
    }
  }

  //Toggle setting panel
  toggleSettingPanel() {
    if(this.showVolumeBar){
      this.hideVolumeBar();
    }
    let el = this.cogIcon.nativeElement;
    if(!this.showSettingPanel){
      this.showSettingPanel = true;
      el.style.color="#e67233";
    }else {
      this.showSettingPanel = false;
      el.style.color="#acbeca";
    }
  }

  //Toggle full screen
  toggleFullScreen(event){
    event.preventDefault();
    console.log("asdf");
    var docElm:any = window.document;
    if (!docElm.fullscreenElement && !docElm.webkitIsFullScreen && !docElm.mozFullScreenElement && !docElm.msFullscreenElement) {
      event.target.children[0].setAttribute("data", "../../assets/svg/fullscreen-exit.svg");
      this.previousViewMode = this.viewMode;
      console.log(this.previousViewMode);
      this.viewMode = "Default view";
      this.switchViewMode();
      var elem = this.fullPlayerContainer.nativeElement;
      console.log("fullscreenElement");
      this.isFullscreen = true;
      if (elem.requestFullscreen) {
        console.log("requestFullscreen");
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        console.log("msRequestFullscreen");
        elem.msRequestFullscreen();
      }else if (elem.mozRequestFullScreen) {
        console.log("mozRequestFullScreen");
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullScreen) {
        console.log("webkitRequestFullScreen");
        elem.webkitRequestFullScreen();
      }
      let self = this;
      let fullscreenWatcher = setInterval(function () {
        console.log("fullscreenWatcher");
        if(docElm.fullscreenElement || docElm.webkitIsFullScreen || docElm.mozFullScreenElement || docElm.msFullscreenElement){
          console.log("fullscreenWatcherTrue");
          self.updateWheelController();
          clearInterval(fullscreenWatcher);
        }
      }, 200);
    } else {
      if(this.previousViewMode == "Default view"){
        this.viewMode = "Theater mode";
      }else{
        this.viewMode = "Default view";
      }
      this.switchViewMode();
      event.target.children[0].setAttribute("data", "../../assets/svg/fullscreen.svg");
      console.log("exitFullscreen");
      this.isFullscreen = false;
      if (docElm.exitFullscreen) {
        docElm.exitFullscreen();
      } else if (docElm.msExitFullscreen) {
        docElm.msExitFullscreen();
      } else if (docElm.mozCancelFullScreen) {
        docElm.mozCancelFullScreen();
      } else if (docElm.webkitCancelFullScreen) {
        docElm.webkitCancelFullScreen();
      }
    }
    if(this.standardController){
      this.controller.nativeElement.style.position = "absolute";
    }
  }

  //Toggle video repeat
  toggleVideoRepeat(){
    let repeatButton = this.repeatButton.nativeElement;
    let repeatButton_wheel = this.repeatButton_wheel.nativeElement;
    if(!this.videoRepeat){
      this.videoRepeat = true;
      repeatButton.style.color = "#e67233";
      repeatButton_wheel.style.color = "#e67233";
    }else{
      this.videoRepeat = false;
      repeatButton_wheel.style.color = "#cadce8";
      repeatButton.style.color = "#acbeca";
    }
  }

  //Hide volume bar
  hideVolumeBar() {
    this.isDraggingVolume = false;
    this.showVolumeBar = false;
    let el;
    if(this.circleController){
      el = this.volumeButton_wheel.nativeElement;
    }else{
      el = this.volumeButton.nativeElement;
    }
    el.style.color="#acbeca";
  }

  //Toggle volume bar
  toggleVolumeBar(event) {
    if(this.showSettingPanel){
      this.showSettingPanel = false;
      this.cogIcon.nativeElement.style.color="#acbeca";
    }
    let el = event.target;
    let pos = this.getTopPos(el);
    if(!this.showVolumeBar){
      this.showVolumeBar = true;
      el.style.color="#e67233";
    }else if(event.pageY - pos > 0) {
      this.hideVolumeBar();
    }
  }

  //Pause/play the video
  togglePlay() {
    let el;
    if(this.circleController){
      el = this.playButton_wheel.nativeElement;
    }else{
      el = this.playButton.nativeElement;
    }
    if(this.featured_clips){
      this.featured_clips = false;
    }
    if(this.video.paused){
      this.video.play();
      let self = this;
      this.hideControllerTimer = setTimeout(function () {
        self.hideControls();
      },900);
      this.videoPlaying = true;
      el.className = el.className.replace(/\bfa-play-circle\b/g, "fa-pause-circle");
      this.updateProgressBar();
    }else{
      this.video.pause();
      clearTimeout(this.timer);
      clearInterval(this.hideControllerTimer);
      this.showControls();
      this.videoPlaying = false;
      el.className = el.className.replace(/\bfa-pause-circle\b/g, "fa-play-circle");
      clearInterval(this.progressBarTimer);
    }
    if(this.showSettingPanel){
      this.toggleSettingPanel();
    }
  }

  //On/off the volume
  toggleMute() {
    let volumeButton_wheel = this.volumeButton_wheel.nativeElement;
    let volumeButton = this.volumeButton.nativeElement;
    if(this.video.volume == 0.0) {
      this.video.volume = this.currentVolume;
      this.drawCircle("volumeMeter", this.volumeMeterFull_wheel_canvas, this.volumeMeterFull_wheel_ctx, this.currentVolume, this.volumeMeterFull_wheel_radius);
      this.volumeScrubTop = this.currentVolume * 100;
      volumeButton_wheel.className = volumeButton_wheel.className.replace(/\bfa-volume-off\b/g, "fa-volume-up");
      volumeButton.className = volumeButton.className.replace(/\bfa-volume-off\b/g, "fa-volume-up");
    }else{
      this.video.volume = 0.0;
      this.volumeScrubTop = 0;
      this.drawCircle("volumeMeter", this.volumeMeterFull_wheel_canvas, this.volumeMeterFull_wheel_ctx, 0, this.volumeMeterFull_wheel_radius);
      volumeButton_wheel.className = volumeButton_wheel.className.replace(/\bfa-volume-up\b/g, "fa-volume-off");
      volumeButton.className = volumeButton.className.replace(/\bfa-volume-up\b/g, "fa-volume-off");
    }
  }

  //Update the current time of the media
  updateTime(event) {
    if(!this.video.seeking){
      this.currentTime = event.target.currentTime;
      if(this.currentTime == this.totalTime) {
        if(this.videoRepeat){
          this.togglePlay();
        }else if(this.autoPlay){
          if(this.currentEpisodeIndex == this.episodes.length-1){
            this.autoStopVideo();
          }else{
            this.playNext();
          }
        }else{
          this.autoStopVideo();
        }
      }
    }
  }

  //Stop video automatically
  autoStopVideo(){
    let playButton;
    if(this.circleController){
      playButton = this.playButton_wheel.nativeElement;
    }else{
      playButton = this.playButton.nativeElement;
    }
    this.video.pause();
    clearInterval(this.progressBarTimer);
    this.videoPlaying = false;
    playButton.className = playButton.className.replace(/\bfa-pause-circle\b/g, "fa-play-circle");
    this.showControls();
    if(this.showSettingPanel){
      this.toggleSettingPanel();
    }
    if(this.showPlaylist){
      this.togglePlaylist();
    }
    this.featured_clips = true;
  }

  //Play next episode
  playNext(){
    if(this.currentEpisodeIndex < this.episodes.length-1){
      if(this.currentEpisodeIndex == 0){
        this.changePreviousBtnOpacity("1", "pointer");
      }
      this.currentEpisodeIndex += 1;
      this.nextVideoSeeking = true;
      this.loadEpisode(this.currentEpisodeIndex);
      if(this.currentEpisodeIndex == this.episodes.length-1){
        this.changeNextBtnOpacity("0.5", "default");
      }
    }
  }

  //Change the opacity of the "previous" button
  changePreviousBtnOpacity(opacity, cursor){
    let el;
    if(this.circleController){
      el = this.previousButton_wheel.nativeElement;
    }else{
      el = this.previousButton.nativeElement;
    }
    el.style.opacity = opacity;
    el.style.cursor = cursor;
  }

  //Change the opacity of the "next" button
  changeNextBtnOpacity(opacity, cursor){
    let el;
    if(this.circleController){
      el = this.nextButton_wheel.nativeElement;
    }else{
      el = this.nextButton.nativeElement;
    }
    el.style.opacity = opacity;
    el.style.cursor = cursor;
  }

  //Play previous episode
  playPrevious(){
    if(this.currentEpisodeIndex > 0){
      if(this.currentEpisodeIndex == this.episodes.length-1){
        this.changeNextBtnOpacity("1", "pointer");
      }
      this.currentEpisodeIndex -= 1;
      this.nextVideoSeeking = true;
      this.loadEpisode(this.currentEpisodeIndex);
      if(this.currentEpisodeIndex == 0){
        this.changePreviousBtnOpacity("0.5", "default");
      }
    }
  }

  //Update the progress meter bar
  updateProgressMeter() {
    let t = this.video.currentTime;
    let d = this.video.duration;
    this.scrubLeft = ((t / d) * 100).toFixed(2);
  }

  //Update the progress bar
  updateProgressBar() {
    let self = this;
    this.progressBarTimer = setInterval(function() {
      if(!self.isDragging){
        if(self.circleController){
          self.updateProgressCircleMeter();
        }else{
          self.updateProgressMeter();
        }
      }
    }, 100);
  }

  //Update the progress meter bar
  updateProgressCircleMeter() {
    let t = this.video.currentTime;
    let d = this.video.duration;
    this.drawCircle("progressMeter", this.progressMeterFull_wheel_canvas, this.progressMeterFull_wheel_ctx, t/d, this.progressMeterFull_wheel_radius);
  }

  //Update the progress meter bar or volume while dragging the progress bar or volume bar
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  mouseMoving(event) {
    if(event.touches){
      event = event.touches[0];
    }else{
      event.preventDefault();
    }
    if(this.isDragging) {
      if(this.standardController){
        this.updateProgressMeter_sc(event);
      }else{
        this.updateProgressMeter_cc(event);
      }
    }else if(this.isDraggingVolume){
      if(this.standardController){
        this.volumeSeek(event);
      }else{
        this.updateProgressMeter_cc(event);
      }
    }else if(this.circleController){
      this.updateProgressMeter_cc(event);
    }
  }

  //Update the progress meter bar on standard controller while dragging the progress bar
  updateProgressMeter_sc(event){
    let d = this.video.duration;
    let pos = parseInt(this.getMousePos(event, this.progressMeterFull.nativeElement, "progressBar"));
    if(pos>=100){
      pos = 100;
    }else if(pos <= 0){
      pos = 0;
    }
    this.currentTime = pos/100 * d;
    this.video.currentTime = this.currentTime;
    this.scrubLeft = pos.toString();
  }

  //Get the left position of a div element where parameter "el" is the object of the element
  getLeftPos(el) {
    for (var leftPos = 0;
         el != null;
         leftPos += el.offsetLeft, el = el.offsetParent);
    return leftPos;
  }

  //Get the top position of a div element where parameter "el" is the object of the element
  getTopPos(el) {
    for (var topPos = 0;
         el != null;
         topPos += el.offsetTop, el = el.offsetParent);
    return topPos;
  }

  //Get the positiion of the mouse on the progress or volume bar.
  //return the percentage of the bar where the mouse is.
  getMousePos(event, el, bar){
    let p: any;
    if(bar == "volumeBar"){
      let topPos = this.getTopPos(el);
      p = 100 - (((event.pageY - topPos)/this.volumeMeterFull.nativeElement.offsetHeight) * 100);
    }else{
      let leftPos = this.getLeftPos(el);
      p = ((event.pageX - leftPos)/this.progressMeterFull.nativeElement.offsetWidth) * 100;
    }

    return p.toFixed(2);
  }

  //Initiate the dragging event on the progress bar
  dragStart(event) {
    event.preventDefault();
    if(event.button == 0){
      this.drag(event);
    }
  }

  //Drag either the progress or volume bar if user start dragging them within the range
  drag(event){
    if(this.standardController){
      this.isDragging = true;
      this.scrubLeft = this.getMousePos(event, this.progressMeterFull.nativeElement, "progressBar");
    }else if(this.circleController){
      let rect = this.progressMeterFull_wheel_canvas.getBoundingClientRect(),   // get abs. position of canvas
          x = event.clientX - rect.left,             // adjust mouse-position
          y = event.clientY - rect.top;
      let dx = x - this.canvasCenterPoint_X,
          dy = y - this.canvasCenterPoint_Y,
          dist = Math.abs(Math.sqrt(dx*dx + dy*dy));
      if ((dist > this.progressMeterFull_wheel_radius-5 && dist < this.progressMeterFull_wheel_radius+2) || this.thumbScrubber_wheel_ctx.isPointInPath(x, y)){
        this.isDragging = true;
        this.updateCircleController(dx, dy, "progressMeter");
      }else if((dist > this.volumeMeterFull_wheel_radius-5 && dist < this.volumeMeterFull_wheel_radius+2) || this.volumeThumbScrubber_wheel_ctx.isPointInPath(x, y)){
        this.isDraggingVolume = true;
        this.updateCircleController(dx, dy, "volumeMeter");
      }else{
        this.togglePlay();
      }
    }
  }

  //End the dragging event on either progress or volume bar
  @HostListener('document:mouseup', ['$event'])
  @HostListener('document:touchend', ['$event'])
  @HostListener('document:touchcancel', ['$event'])
  dragStop(event) {
    this.showPendingTime = false;
    if(event.changedTouches){
      event = event.changedTouches[0];
    }else {
      event.preventDefault();
    }
    if(this.isDragging) {
      if(this.standardController){
        this.videoSeek(event);
      }
      this.isDragging = false;
    }else if(this.isDraggingVolume){
      this.isDraggingVolume = false;
      if(this.standardController) {
        this.volumeSeek(event);
      }
    }
  }

  //Update the current time of the media
  videoSeek(event) {
    let d = this.video.duration;
    let pos = parseInt(this.getMousePos(event, this.progressMeterFull.nativeElement, "progressBar"));
    if(pos>=100){
      pos = 100;
    }else if(pos <= 0){
      pos = 0;
    }
    this.video.currentTime = pos/100 * d;
    this.scrubLeft = pos.toString();
  }

  //Initiate the dragging event on the volume bar
  dragStartVolume(event) {
    if(event.buttons == 1){
      event.preventDefault();
      this.isDraggingVolume = true;
      this.volumeSeek(event);
    }else if(event.touches){
      this.isDraggingVolume = true;
      this.volumeSeek(event.touches[0]);
    }
  }

  //Constrain the position of mouse while dragging on volume bar within 0-1
  //and update the current volume
  volumeSeek(event) {
    if(event.defaultPrevented){
      event.preventDefault();
    }
    let pos = parseFloat(this.getMousePos(event, this.volumeMeterFull.nativeElement, "volumeBar"));
    if(pos>=100){
      pos = 100;
    }else if(pos <= 0){
      pos = 0;
    }
    this.video.volume = pos/100;
    this.volumeScrubTop = pos.toString();

    let el;
    if(this.circleController){
      el = this.volumeButton_wheel.nativeElement;
    }else{
      el = this.volumeButton.nativeElement;
    }
    if(pos == 0){
      el.className = el.className.replace(/\bfa-volume-up\b/g, "fa-volume-off");
    }else{
      el.className = el.className.replace(/\bfa-volume-off\b/g, "fa-volume-up");
    }
    if(!this.isDraggingVolume && pos != 0){
      this.currentVolume = this.video.volume;
    }
  }

  //Update the buffered percentage bar
  buffer() {
    let buffered = this.video.buffered;
    let loaded: number;
    if(buffered.length){
      loaded = (buffered.end(buffered.length - 1)) / this.video.duration * 100;
      this.bufferedPercentages = Math.round(loaded).toString();
      let percentage = Math.round(loaded)/100;
      this.drawBufferedMeter(percentage);
      if (percentage >= 1) {
        clearInterval(this.watchBuffer);
        this.watchBuffer = false;
      }
    }
  }

  //Hide either the standard controller och the wheel controller
  hideControls() {
    this.controlsOpacity = 0;
    let el: any;
    if(this.standardController){
      el = this.controller.nativeElement;
    }else{
      el = this.wheelController.nativeElement;
    }
    el.style.opacity = "0";
    this.settingBar.nativeElement.style.opacity = "0";
  }

  //Show either the standard controller och the wheel controller
  showControls(){
    this.controlsOpacity = 1;
    if(this.standardController){
      this.controller.nativeElement.style.opacity = "1";
    }else{
      this.wheelController.nativeElement.style.opacity = "1";
    }
    this.settingBar.nativeElement.style.opacity = "1";
  }

  //Display/hide controls depending on mousemove on the player
  mouseMovingOnPlayer(){
    let self = this;
    let mouseStopped = function(){
      self.hideControls();
    };
    if(this.video.paused){
      if(this.controlsOpacity != 1){
        clearTimeout(this.timer);
        this.showControls();
      }
    }else{
      if(this.controlsOpacity == 0){
        this.showControls();
      }else{
        clearTimeout(this.timer);
        this.timer=setTimeout(mouseStopped,900);
      }
    }
  }

  //Display time depending on the position of the progress bar
  displayPendingTime(event){
    if(!this.showPendingTime){
      this.showPendingTime = true;
    }
    let pos = this.getMousePos(event, this.progressMeterFull.nativeElement, "progressBar");
    this.pendingTime = this.video.duration * (parseInt(pos)/100);
    this.pendingTimeElement.nativeElement.style.left = pos+"%";
  }

  //Hide pending time
  hidePendingTime(){
    this.showPendingTime = false;
  }

  //DrawCircle for progressbar, volumebar, thumbscrubber and buffered circle
  drawCircle(el, canvas, ctx, pos, radius){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(this.canvasCenterPoint_X, this.canvasCenterPoint_Y);
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0, 0, 0, 0.7)";
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.lineWidth = 6;
    ctx.stroke();
    if(parseInt(this.bufferedPercentages) < 100 || el === "volumeMeter"){
      ctx.arc(0,0,radius,0,2*Math.PI);
      if(el === "volumeMeter"){
        ctx.strokeStyle = "#98a2ad";
      }else{
        ctx.strokeStyle = "#585e63";
      }
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    if(el === "progressMeter"){
      this.drawBufferedMeter(parseInt(this.bufferedPercentages)/100);
      this.drawProgressMeterWheel(this.progressMeter_wheel_canvas, this.progressMeter_wheel_ctx, pos, radius, "#e67233");
      this.drawTime(this.progressMeter_wheel_ctx, radius);
      this.drawHandle(this.thumbScrubber_wheel_canvas, this.thumbScrubber_wheel_ctx, pos, radius);
    }else if(el === "volumeMeter"){
      this.drawProgressMeterWheel(this.volumeMeter_wheel_canvas, this.volumeMeter_wheel_ctx, pos, radius, "#e67233");
      this.drawVolume(this.volumeMeter_wheel_ctx, radius, pos);
      this.drawHandle(this.volumeThumbScrubber_wheel_canvas, this.volumeThumbScrubber_wheel_ctx, pos, radius);
    }
  }

  //Draw the buffered meter wheel
  drawBufferedMeter(pos){
    this.drawProgressMeterWheel(this.bufferedPercentages_wheel_canvas, this.bufferedPercentages_wheel_ctx, pos, this.progressMeterFull_wheel_radius, "#98a2ad");
  }

  //Draw progress meter wheel
  drawProgressMeterWheel(canvas, ctx, pos, radius, color){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let ang = (2*Math.PI)*(pos-1/4);
    ctx.translate(this.canvasCenterPoint_X, this.canvasCenterPoint_Y);
    ctx.beginPath();
    ctx.arc(0, 0, radius, -Math.PI/2, ang);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  //Draw handle/thumscrubber
  drawHandle(canvas, ctx, pos, radius){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(this.canvasCenterPoint_X, this.canvasCenterPoint_Y);
    ctx.rotate((2*Math.PI)*pos);
    ctx.translate(0, -radius);
    ctx.beginPath();
    ctx.arc(0, 0, this.thumbScrubberSize, 0, 2*Math.PI);
    ctx.fillStyle = '#e67233';
    ctx.fill();
    ctx.rotate(-((2*Math.PI)*pos));
    ctx.translate(0, radius);
    ctx.closePath();
  }

  //Print time
  drawTime(ctx, radius){
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.font = this.fontSize+"px Arial";
    ctx.fillStyle = "white";
    let time = this.toHHMMSS(this.currentTime)+"/"+this.toHHMMSS(this.totalTime)+" h";
    ctx.fillText(time, 0, -radius*1.1);
  }
  //Print volume percentage
  drawVolume(ctx, radius, percent){
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    ctx.font = this.fontSize+"px Arial";
    ctx.fillStyle = "white";
    let time = (percent*100).toFixed(0)+"/100%";
    ctx.fillText(time, 0, -radius*1.15);
  }

  //Convert seconds to time format (HHMMSS)
  toHHMMSS(seconds) {
    let hh = Math.floor(seconds / 3600);
    let mm = Math.floor(seconds / 60) % 60;
    let ss = Math.round(seconds) % 60;
    return (hh > 0 ? hh + ":" : "") + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0": "") + ss;
  }

  //Display/hide controls depending on mousemove on the player
  updateProgressMeter_cc(event){
    let rect = this.progressMeterFull_wheel_canvas.getBoundingClientRect(),   // get abs. position of canvas
        x = event.clientX - rect.left,             // adjust mouse-position
        y = event.clientY - rect.top;
    let dx = x - this.canvasCenterPoint_X,
        dy = y - this.canvasCenterPoint_Y,
        dist = Math.abs(Math.sqrt(dx*dx + dy*dy));
    if ((dist > this.progressMeterFull_wheel_radius-5 && dist < this.progressMeterFull_wheel_radius+2) || this.thumbScrubber_wheel_ctx.isPointInPath(x, y)){
      this.wheelController.nativeElement.style.cursor = "pointer";
      if(this.isDragging){
        this.updateCircleController(dx, dy, "progressMeter");
      }
      if(!this.isDraggingVolume){
        this.displayPendingTimeWheel(x,y, dx, dy);
      }
    }else if((dist > this.volumeMeterFull_wheel_radius-5 && dist < this.volumeMeterFull_wheel_radius+2) || this.volumeThumbScrubber_wheel_ctx.isPointInPath(x, y)){
      this.wheelController.nativeElement.style.cursor = "pointer";
      if(this.isDraggingVolume){
        this.updateCircleController(dx, dy, "volumeMeter");
      }
    }else if(this.isDragging){
      this.updateCircleController(dx, dy, "progressMeter");
      this.displayPendingTimeWheel(x,y, dx, dy);
    }else if(this.isDraggingVolume){
      this.updateCircleController(dx, dy, "volumeMeter");
    }else{
      this.wheelController.nativeElement.style.cursor = "default";
      this.showPendingTime = false;
    }
  }

  //Display time depending on the position of the progress bar
  displayPendingTimeWheel(x,y, dx, dy){
    let ang = Math.atan2(dy, dx)+Math.PI/2;
    if(ang < 0 ){
      ang = Math.PI + (Math.PI + ang);
    }
    let pos = ang / (Math.PI*2);
    this.pendingTime = this.totalTime * pos;
    this.showPendingTime = true;
    this.pendingTimeElementWheel.nativeElement.style.left = (x+10)+"px";
    this.pendingTimeElementWheel.nativeElement.style.top = (y-20)+"px";
  }

  //Update the circle controller
  updateCircleController(dx, dy, el){
    let ang = Math.atan2(dy, dx)+Math.PI/2;
    let update: boolean = true;
    if(this.thumbScrubber_wheel_oldPosition >= 0.991 && (ang > 0 && ang < Math.PI)){
      update = false;
    }else if(this.thumbScrubber_wheel_oldPosition <= 0.003 && (ang < 0 || ang > Math.PI)){
      update = false;
    }
    if(update){
      if(ang < 0 ){
        ang = Math.PI + (Math.PI + ang);
      }
      let pos = ang / (Math.PI*2);
      this.thumbScrubber_wheel_oldPosition = pos;
      if(el == "progressMeter"){
        this.video.currentTime = pos * this.totalTime;
        this.currentTime = pos * this.totalTime;
        this.drawCircle(el, this.progressMeterFull_wheel_canvas, this.progressMeterFull_wheel_ctx, pos, this.progressMeterFull_wheel_radius);
      }else if(el == "volumeMeter"){
        this.drawCircle(el, this.volumeMeterFull_wheel_canvas, this.volumeMeterFull_wheel_ctx, pos, this.volumeMeterFull_wheel_radius);
        this.video.volume = pos;
        this.currentVolume = pos;
      }
    }
  }

  //Update the size of canvas elements
  setCanvasSize(width, height){
    this.progressMeter_wheel_canvas.width = width;
    this.progressMeter_wheel_canvas.height = height;
    this.thumbScrubber_wheel_canvas.width = width;
    this.thumbScrubber_wheel_canvas.height = height;
    this.bufferedPercentages_wheel_canvas.width = width;
    this.bufferedPercentages_wheel_canvas.height = height;
    this.progressMeterFull_wheel_canvas.width = width;
    this.progressMeterFull_wheel_canvas.height = height;
    this.volumeMeter_wheel_canvas.width = width;
    this.volumeMeter_wheel_canvas.height = height;
    this.volumeThumbScrubber_wheel_canvas.width = width;
    this.volumeThumbScrubber_wheel_canvas.height = height;
    this.volumeMeterFull_wheel_canvas.width = width;
    this.volumeMeterFull_wheel_canvas.height = height;
    this.canvasCenterPoint_X = width/2;
    this.canvasCenterPoint_Y = height/2;
  }

  //Adjust the position of wheel controller icons
  adjustWheelCIcons(cw, cl, v, p, r, vbt, vbl, fc){
    if(cw){
      //this.wheelController.nativeElement.style.width = cw+"px";
    }
    if(cl){
      this.wheelController.nativeElement.style.left = cl;
    }
    if(v){
      this.viewMode_wheel.nativeElement.style.top = v;
    }
    if(p){
      this.previousButton_wheel.nativeElement.parentNode.style.left = p;
    }
    if(r){
      this.repeatButton_wheel.nativeElement.parentNode.style.top = r;
    }
    if(vbt){
      this.volumeButton_wheel.nativeElement.parentNode.style.top = vbt;
    }
    if(vbl){
      this.volumeButton_wheel.nativeElement.parentNode.style.left = vbl;
    }
    if(fc){
      this.fullScreenBtn_wheel.nativeElement.parentNode.style.top = fc;
    }
  }

  //Update the size of canvas and adjust position of the wheel controller's icons for different devices and sizes for the video player
  updateWheelController(){
    let width = parseInt(this.fullPlayerElement.nativeElement.offsetWidth, 10)/2;
    let height = parseInt(this.fullPlayerElement.nativeElement.offsetHeight, 10);
    if(width <= 207){
      this.fontSize = 9;
      this.thumbScrubberSize = 4;
    }else if(width <= 250){
      this.fontSize = 11;
      this.thumbScrubberSize = 5;
    }else{
      this.fontSize = 14;
      this.thumbScrubberSize = 7;
    }
    if(height/width < 1){
      width = width*0.9;
      this.adjustWheelCIcons(width, "52.5%", "90%", "34%", "60.7%", null, null, null);
    }else{
      this.adjustWheelCIcons("50%", "50%", "85%", "32%", "62%", "25%", null, null);
    }
    if(width < 175){
      this.adjustWheelCIcons(null, null, "91%", "33%", "62%", "24%", "67%", "31%");
    }else if(width > 175 && width<190){
      this.adjustWheelCIcons(null, null, null, null, null, "23%", "65%", "31%");
    }else if(width > 195 && width<225){
      this.adjustWheelCIcons(null, null, null, null, null, "27%", "65%", null);
    }else if(width > 225 && width<260){
      this.adjustWheelCIcons(null, null, null, null, null, "21%", "64%", "32%");
    }else if(width > 260 && width<305){
      this.adjustWheelCIcons(null, null, null, null, null, "25%", "64%", "32%");
    }else if(width > 305 && width<350){
      this.adjustWheelCIcons(null, null, null, null, null, "25%", "63%", "33%");
    }else if(width > 450 && height<460){
      this.adjustWheelCIcons(null, null, null, null, null, "20%", "63%", null);
    }else{
      this.adjustWheelCIcons(null, null, null, null, null, "25%", "63%", "34%");
    }
    this.setCanvasSize(width, height);
    this.progressMeterFull_wheel_radius = width / 2 * 0.7;
    this.volumeMeterFull_wheel_radius = width / 2 * 0.5;
    this.drawCircle("progressMeter", this.progressMeterFull_wheel_canvas, this.progressMeterFull_wheel_ctx, this.video.currentTime/this.video.duration, this.progressMeterFull_wheel_radius);
    this.drawCircle("volumeMeter", this.volumeMeterFull_wheel_canvas, this.volumeMeterFull_wheel_ctx, this.currentVolume, this.volumeMeterFull_wheel_radius);
  }

  //Add listeners for touch events
  addTouchListeners(controller){
    let self = this;
    if(controller == "standard"){
      this.touchStartListener = this.renderer.listen(self.progressMeterFull.nativeElement, "touchstart", (event) => {
        event.preventDefault();
        self.drag(event.touches[0]);
      });
      this.touchStartListener_volume = this.renderer.listen(self.volumeMeterFull.nativeElement, "touchstart", (event) => {
        event.preventDefault();
        self.dragStartVolume(event);
      });
    }else{
      this.touchStartListener = this.renderer.listen(self.canvasContainer.nativeElement, "touchstart", (event) => {
        event.preventDefault();
        self.drag(event.touches[0]);
      });
    }
  }

  //Clear the listeners for touch events
  clearTouchListeners(){
    if(this.touchStartListener !== null){
      this.touchStartListener(); //remove previous listener
    }
    if(this.touchStartListener_volume !== null){
      this.touchStartListener_volume(); //remove previous listener
    }
    this.touchStartListener = null;
    this.touchStartListener_volume = null;
  }

  //Go to the single series page
  goToProgram(program){
    this.router.navigate(["play/series/"+program]);
  }

  //Load/change episode in the player
  loadEpisode(index){
    this.nextVideoSeeking = true;
    if(this.videoMetaData.id == this.episodes[index].id){
      this.togglePlay();
    }else{
      this.videoMetaData = this.episodes[index];
      let self = this;
      if(this.watchBuffer){
        clearInterval(this.watchBuffer);
        this.watchBuffer = false;
      }
      this.watchBuffer = setInterval(function(){
        self.buffer();
      }, 500);
    }
    if(this.showPlaylist){
      this.playlist.nativeElement.getElementsByClassName('selected')[0].className = "episode";
      this.playlist.nativeElement.children[index].className = "episode selected";
      this.showPlaylist = false;
    }
    if(this.featured_clips){
      this.featured_clips = false;
    }
  }

  //Define variables and their context for canvas elements
  defineCanvasVarContext(){
    this.progressMeter_wheel_canvas = this.progressMeter_wheel.nativeElement;
    this.progressMeter_wheel_ctx = this.progressMeter_wheel_canvas.getContext("2d");
    this.thumbScrubber_wheel_canvas = this.thumbScrubber_wheel.nativeElement;
    this.thumbScrubber_wheel_ctx = this.thumbScrubber_wheel_canvas.getContext("2d");
    this.bufferedPercentages_wheel_canvas = this.bufferedPercentages_wheel.nativeElement;
    this.bufferedPercentages_wheel_ctx = this.bufferedPercentages_wheel_canvas.getContext("2d");
    this.progressMeterFull_wheel_canvas = this.progressMeterFull_wheel.nativeElement;
    this.progressMeterFull_wheel_ctx = this.progressMeterFull_wheel_canvas.getContext("2d");
    this.volumeMeter_wheel_canvas = this.volumeMeter_wheel.nativeElement;
    this.volumeMeter_wheel_ctx = this.volumeMeter_wheel_canvas.getContext("2d");
    this.volumeThumbScrubber_wheel_canvas = this.volumeThumbScrubber_wheel.nativeElement;
    this.volumeThumbScrubber_wheel_ctx = this.volumeThumbScrubber_wheel_canvas.getContext("2d");
    this.volumeMeterFull_wheel_canvas = this.volumeMeterFull_wheel.nativeElement;
    this.volumeMeterFull_wheel_ctx = this.volumeMeterFull_wheel_canvas.getContext("2d");
  }

  //Initiate the player, listen to the changes of current time and buffered data
  initPlayer(){
    this.currentTime = 0;
    this.totalTime = 0;
    let self = this;
    this.renderer.listen(self.video, "loadstart", () => {
      self.scrubLeft = "0";
      let el;
      if(this.circleController){
        el = this.playButton_wheel.nativeElement;
      }else{
        el = this.playButton.nativeElement;
      }
      el.className = el.className.replace(/\bfa-pause-circle\b/g, "fa-play-circle");
    });
    this.renderer.listen(self.video, "loadedmetadata", (event) => {
      self.totalTime = event.target.duration;
      self.updateWheelController();
    });
    this.renderer.listen(self.video, "timeupdate", (event) => {
      if(this.videoPlaying){
        self.updateTime(event);
      }
    });
    this.renderer.listen(self.video, "canplay", () => {
      if(this.nextVideoSeeking){
        this.nextVideoSeeking = false;
        self.togglePlay();
      }
    });
    this.renderer.listenGlobal('window', 'resize', () => {
      self.updateWheelController();
    });
    this.addTouchListeners("circle");
    this.watchBuffer = setInterval(function(){
      self.buffer();
    }, 500);
    setTimeout(function () {
      self.updateWheelController();
    }, 500);
  }

  ngOnInit() {
    this.video = this.videoElement.nativeElement;
    this.renderer.setElementAttribute(this.videoElement.nativeElement, 'src', this.videoMetaData.video.url);

    //Display either of the description boxes beside the player
    if(this.context == "play"){
      this.description_excerpt = true;
    }else if(this.context == "program"){
      this.description_full = true;
      this.fullPlayerContainer.nativeElement.style.backgroundColor = "white";
      this.fullPlayerElement.nativeElement.style.width = "50%";
      this.description.nativeElement.style.width = "47%";
    }

    //Define the canvas variables and their context
    this.defineCanvasVarContext();

    this.initPlayer();
    this.toggleAutoplay(); //Turn off the autoplay at start
  }

}
