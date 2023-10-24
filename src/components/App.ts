import { Lobby } from '@/components/Lobby';

export class App {
  lobby =  new Lobby()
  
  init() {
    this.lobby.render()
  }
}