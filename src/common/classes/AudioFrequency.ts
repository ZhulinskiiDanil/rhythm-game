export class AudioFrequency {
  audio: HTMLAudioElement | null = null
  audioCtx = new AudioContext();
  audioSource: MediaElementAudioSourceNode | null = null
  analyser: AnalyserNode | null = null
  fftSize = 32
  dataArray = new Uint8Array()

  setAudio(audio: HTMLAudioElement) {
    this.audio = audio
    const audioCtx = this.audioCtx

    this.audioSource = audioCtx.createMediaElementSource(audio);
    this.analyser = audioCtx.createAnalyser();
    this.analyser.fftSize = this.fftSize
    this.audioSource.connect(this.analyser);
    this.analyser.connect(audioCtx.destination);

    const bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(bufferLength)
  }

  getSongFrequency() {
    if (this.analyser) {
      const dataArray = this.dataArray
      this.analyser.getByteFrequencyData(dataArray);
      
      const maxBarHeight = 255
      const dataArraySum = dataArray.reduce((acc, elm) => acc + elm, 0)
      const barHeight = dataArraySum / dataArray.length
    
      return barHeight / maxBarHeight
    }

    return 0
  }
}