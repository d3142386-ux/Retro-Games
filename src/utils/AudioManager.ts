type AudioMap = Record<string, HTMLAudioElement>;

class AudioManager {
  private music: HTMLAudioElement | null = null;
  private sfx: AudioMap = {};
  private enabledMusic = true;
  private enabledSfx = true;

  setMusic(src: string) {
    if (this.music) this.music.pause();
    this.music = new Audio(src);
    this.music.loop = true;
    if (this.enabledMusic) this.music.play().catch(() => {});
  }

  toggleMusic(enabled: boolean) {
    this.enabledMusic = enabled;
    if (this.music) {
      if (enabled) this.music.play().catch(() => {});
      else this.music.pause();
    }
  }

  registerSfx(name: string, src: string) {
    this.sfx[name] = new Audio(src);
  }

  playSfx(name: string) {
    if (!this.enabledSfx) return;
    const a = this.sfx[name];
    if (!a) return;
    try {
      const clone = a.cloneNode(true) as HTMLAudioElement;
      clone.play().catch(() => {});
    } catch (e) {
      // ignore
    }
  }

  toggleSfx(enabled: boolean) {
    this.enabledSfx = enabled;
  }
}

export const audioManager = new AudioManager();