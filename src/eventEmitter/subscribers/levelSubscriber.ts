import ee from "event-emitter";
import { store } from "@/store";
import { useSelector } from "@/hooks/useSelector";

export function levelSubscriber(eventEmitter: ee.Emitter) {
  const level = useSelector(state => state.level.data)

  store.subscribe(() => {
    const newLevel = useSelector(state => state.level.data)

    if (level !== newLevel && newLevel) {
      eventEmitter.emit('level', newLevel)
    }
  })
}