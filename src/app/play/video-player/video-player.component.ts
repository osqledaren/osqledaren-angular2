import { Component, OnInit, Input, ViewChild, Renderer, HostListener} from '@angular/core';
import { TimePipe } from '../time.pipe';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @Input() videoMetaData: any;
  src: string = "http://www.w3schools.com/html/mov_bbb.mp4";

  @ViewChild('controller') controller: any;
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('fullPlayerElement') fullPlayerElement: any;
  @ViewChild('progressMeterFull') progressMeterFull: any;
  @ViewChild('progressMeter') progressMeter: any;
  @ViewChild('playButton') playButton: any;
  @ViewChild('volumeButton') volumeButton: any;
  @ViewChild('thumbScrubber') thumbScrubber: any;
  @ViewChild('volumeMeterFull') volumeMeterFull: any;
  @ViewChild('volumeMeter') volumeMeter: any;
  @ViewChild('volumeScrubber') volumeScrubber: any;
  @ViewChild('onOffThumbScrubber') onOffThumbScrubber: any;
  @ViewChild('onOffButton') onOffButton: any;
  @ViewChild('cogIcon') cogIcon: any;
  @ViewChild('pendingTimeElement') pendingTimeElement: any;
  video: any;
  videoPlaying: boolean = false;
  currentTime: any;
  totalTime: any;
  scrubLeft: any;
  progressBarTimer: any;
  isDragging: boolean = false;
  isDraggingVolume: boolean = false;
  volumeScrubTop: any = 100;
  bufferedPercentages: any;
  currentVolume: any = 1;
  showVolumeBar: boolean = false;
  videoRepeat: boolean = false;
  fullscreenIcon: string = "fullscreen";
  showSettingPanel: boolean = false;
  autoPlay: boolean = true;
  controlsOpacity = 1;
  timer: any;
  pendingTime: any;
  showPendingTime: boolean = false;
  showPlaylist: boolean = false;

  constructor(private renderer: Renderer) { }

  togglePlaylist(event){
    if(this.showPlaylist){
      this.showPlaylist = false;
      event.target.style.color = "#acbeca";
    }else{
      this.showPlaylist = true;
      event.target.style.color = "#e67233";
    }
  }

  //Toggle Autoplay for next video
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

  //Toggle setting panel
  toggleSettingPanel(event) {
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
  toggleFullScreen(){
    var docElm:any = window.document;
    if (!docElm.fullscreenElement && !docElm.webkitFullscreenElement && !docElm.mozFullScreenElement && !docElm.msFullscreenElement) {
      var elem = this.fullPlayerElement.nativeElement;
      this.fullscreenIcon = "fullscreen_exit";
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    } else {
      this.fullscreenIcon = "fullscreen";
      if (docElm.exitFullscreen) {
        docElm.exitFullscreen();
      } else if (docElm.msExitFullscreen) {
        docElm.msExitFullscreen();
      } else if (docElm.mozCancelFullScreen) {
        docElm.mozCancelFullScreen();
      } else if (docElm.webkitExitFullscreen) {
        docElm.webkitExitFullscreen();
      }
    }
    this.controller.nativeElement.style.position = "absolute";
  }

  //Toggle video repeat
  toggleVideoRepeat(event){
    if(!this.videoRepeat){
      this.videoRepeat = true;
      event.target.style.color = "#e67233";
    }else{
      this.videoRepeat = false;
      event.target.style.color = "#acbeca";
    }
  }

  //Hide volume bar
  hideVolumeBar() {
    this.isDraggingVolume = false;
    this.showVolumeBar = false;
    this.volumeButton.nativeElement.style.color="#acbeca";
  }

  //Toggle volume bar
  toggleVolumeBar(event) {
    if(this.showSettingPanel){
      this.showSettingPanel = false;
      this.cogIcon.nativeElement.style.color="#acbeca";
    }
    let el = this.volumeButton.nativeElement;
    let pos = this.getTopPos(el);
    if(!this.showVolumeBar){
      this.showVolumeBar = true;
      el.style.color="#e67233";
    }else if(this.showVolumeBar && event.pageY - pos > 0) {
      this.hideVolumeBar();
    }
  }

  //Pause/play media file
  togglePlay() {
  	let el = this.playButton.nativeElement;
  	if(this.video.paused){
  		this.video.play();
  		this.videoPlaying = true;
  		el.className = el.className.replace(/\bfa-play-circle\b/g, "fa-pause-circle");
  		this.updateProgressBar();
  	}else{
  		this.video.pause();
  		this.videoPlaying = false;
  		el.className = el.className.replace(/\bfa-pause-circle\b/g, "fa-play-circle");
  		clearInterval(this.progressBarTimer);
  	}
  }

  //On/off the volume
  toggleMute() {
  	let el = this.volumeButton.nativeElement;
  	if(this.video.volume == 0.0) {
  		this.video.volume = this.currentVolume;
        this.volumeScrubTop = this.currentVolume * 100;
  		el.className = el.className.replace(/\bfa-volume-off\b/g, "fa-volume-up");
  	}else{
  		this.video.volume = 0.0;
        this.volumeScrubTop = 0;
  		el.className = el.className.replace(/\bfa-volume-up\b/g, "fa-volume-off");
  	}
  }

  //Update the current time of the media
  updateTime(event) {
  	if(!this.video.seeking){
  		this.currentTime = event.target.currentTime;
	  	if(this.currentTime == this.totalTime) {
        if(this.videoRepeat){
          this.togglePlay();
        }else{
          let playButton = this.playButton.nativeElement;
          this.video.pause();
          clearInterval(this.progressBarTimer);
          this.videoPlaying = false;
          playButton.className = playButton.className.replace(/\bfa-pause-circle\b/g, "fa-play-circle");
          this.toggleControlsDisplay();
        }
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
  			self.updateProgressMeter();
  		}
	  }, 10);
  }

  //Update the progress meter bar or volume while dragging the progress bar or volume bar
  @HostListener('document:mousemove', ['$event'])
  mouseMoving(event) {
  	event.preventDefault();
  	if(this.isDragging) {
  		let pos = parseInt(this.getMousePos(event, this.progressMeterFull.nativeElement, "progressBar"));
  		if(pos>=100){
  			pos = 100;
  		}else if(pos <= 0){
  			pos = 0;
  		}
      this.scrubLeft = pos.toString();
  		
  	}else if(this.isDraggingVolume){
  		this.volumeSeek(event);
  	}
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
    if(event.buttons == 1){
      event.preventDefault();
      this.isDragging = true;
      this.scrubLeft = this.getMousePos(event, this.progressMeterFull.nativeElement, "progressBar");
    }
  }

  //End the draggin event on either progress or volume bar
  @HostListener('document:mouseup', ['$event'])
  dragStop(event) {
  	event.preventDefault();
  	if(this.isDragging) {
        this.videoSeek(event);
  	  	this.isDragging = false;
  	}else if(this.isDraggingVolume){
  		this.isDraggingVolume = false;
      this.volumeSeek(event);
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

  //Initiate the draggin event on the volume bar
  dragStartVolume(event) {
    if(event.buttons == 1){
      event.preventDefault();
      this.isDraggingVolume = true;
      this.volumeSeek(event);
    }
  }

  //Constrain the position of mouse while dragging on volume bar within 0-1
  //and update the current volume
  volumeSeek(event) {
    event.preventDefault();
    let pos = parseFloat(this.getMousePos(event, this.volumeMeterFull.nativeElement, "volumeBar"));
    if(pos>=100){
      pos = 100;
    }else if(pos <= 0){
      pos = 0;
    }
  	this.video.volume = pos/100;
  	this.volumeScrubTop = pos.toString();

    let el = this.volumeButton.nativeElement;
    if(pos == 0){
      el.className = el.className.replace(/\bfa-volume-up\b/g, "fa-volume-off");
    }else{
      el.className = el.className.replace(/\bfa-volume-off\b/g, "fa-volume-up");
    }

    if(!this.isDraggingVolume && pos != 0){
      this.currentVolume = this.video.volume;
    }
  }



  //Initiate the player, listen to the changes of current time and buffered data
  initPlayer(){
  	this.currentTime = 0;
  	this.totalTime = 0;
  	let self = this;
    this.renderer.listen(self.video, "loadstart", () => {
      self.scrubLeft = 0;
      let el = this.playButton.nativeElement;
      el.className = el.className.replace(/\bfa-pause-circle\b/g, "fa-play-circle");
    });
  	this.renderer.listen(self.video, "timeupdate", (event) => {
  		self.updateTime(event);
  	});
  	this.renderer.listen(self.video, "loadedmetadata", (event) => {
  		self.totalTime = event.target.duration;
  	});
    this.renderer.listen(self.video, "progress", () => {
        self.buffer();
    });
  }

  //Update the buffered percentage bar
  buffer() {
    let buffered = this.video.buffered;
    let loaded: number;
    if(buffered.length){
      loaded = (buffered.end(buffered.length - 1)) / this.video.duration * 100;
      this.bufferedPercentages = loaded.toFixed(2);
    }
  }

  //Toggle controls display
  toggleControlsDisplay() {
    let el = this.controller.nativeElement;
    if(this.controlsOpacity){
      this.controlsOpacity = 0;
      el.style.opacity = "0";
    }else{
      this.controlsOpacity = 1;
      el.style.opacity = "1";
    }
  }

  //Display/hide controls depending on mousemove on the player
  mouseMovingOnPlayer(){
    if(!this.video.paused){
      if(this.controlsOpacity == 0){
        this.controlsOpacity = 1;
        this.controller.nativeElement.style.opacity = "1";
      }else{
        clearTimeout(this.timer);
        let self = this;
        let mouseStopped = function(){
          self.toggleControlsDisplay();
        };
        this.timer=setTimeout(mouseStopped,700);
      }
    }else{
      clearTimeout(this.timer);
      this.controlsOpacity = 1;
      this.controller.nativeElement.style.opacity = "1";
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

  ngOnInit() {
  	this.video = this.videoElement.nativeElement;

  	this.initPlayer();
  }

}
