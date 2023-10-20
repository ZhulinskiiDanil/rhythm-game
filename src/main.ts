import '@/style.css';
import { Scene } from '@/scene';
import { useDispatch } from '@/hooks/useDispatch';
import { levelActions } from './store';

// Levels
import { yoasobiIdol } from './levels';

const scene = new Scene()
const dispatch = useDispatch()

dispatch(levelActions.setLevel({ level: yoasobiIdol }))

loop()
function loop() {
  scene.draw()
  
  requestAnimationFrame(loop)
}