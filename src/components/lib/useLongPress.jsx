import { useState, useEffect } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);
  const [event, setEvent] = useState();

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(() => callback(event), ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress, callback, ms, event]);

  return {
    onMouseDown: (e) => {
      setEvent(e);
      e.persist();
      setStartLongPress(true);
    },
    onMouseUp: (e) => setStartLongPress(false),
    onMouseLeave: (e) => setStartLongPress(false),
    onTouchStart: (e) => {
      setEvent(e);
      e.persist();
      setStartLongPress(true);
    },
    onTouchEnd: (e) => setStartLongPress(false),
  };
}
