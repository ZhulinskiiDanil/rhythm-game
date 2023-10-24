import '@/style.css';
import { Scene } from '@/scene';
import { App } from './components/App';

new App().init()
const scene = new Scene()

function loop() {
  scene.draw();

  requestAnimationFrame(loop);
}; loop();