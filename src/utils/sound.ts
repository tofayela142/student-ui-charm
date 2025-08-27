// Sound utility for button interactions
class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor() {
    // Create sound effects using Web Audio API
    this.createSounds();
  }

  private createSounds() {
    // Create click sound using oscillator
    this.sounds.click = this.createTone(800, 0.1, 'sine');
    this.sounds.hover = this.createTone(600, 0.05, 'sine');
    this.sounds.success = this.createTone(523, 0.2, 'triangle');
  }

  private createTone(frequency: number, duration: number, type: OscillatorType): HTMLAudioElement {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
    
    // Create a dummy audio element for consistent interface
    const audio = new Audio();
    audio.play = () => {
      const newContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const newOscillator = newContext.createOscillator();
      const newGainNode = newContext.createGain();
      
      newOscillator.connect(newGainNode);
      newGainNode.connect(newContext.destination);
      
      newOscillator.frequency.value = frequency;
      newOscillator.type = type;
      
      newGainNode.gain.setValueAtTime(0.1, newContext.currentTime);
      newGainNode.gain.exponentialRampToValueAtTime(0.01, newContext.currentTime + duration);
      
      newOscillator.start(newContext.currentTime);
      newOscillator.stop(newContext.currentTime + duration);
      
      return Promise.resolve();
    };
    
    return audio;
  }

  play(soundName: string) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].play().catch(() => {
        // Ignore errors in case audio context is not allowed
      });
    }
  }
}

export const soundManager = new SoundManager();