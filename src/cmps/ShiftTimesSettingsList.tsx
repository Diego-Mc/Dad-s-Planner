import React, { useLayoutEffect, useRef } from 'react'
import { WorkerState } from '../types'

interface Props {
  handleToggleShift: (workerId: string, shiftTime: string) => void
  workers: WorkerState[]
}

export const ShiftTimesSettingsList: React.FC<Props> = ({
  handleToggleShift,
  workers,
}) => {
  const prevScrollDiff = useRef(0)
  const listRef = useRef<HTMLElement>(null)

  const onScroll = (ev: React.UIEvent) => {
    prevScrollDiff.current =
      (listRef.current?.scrollHeight || 0) -
        (listRef.current?.scrollTop || 0) || 0
  }

  useLayoutEffect(() => {
    // use the captured snapshot here
    if (listRef.current)
      listRef.current.scrollTop =
        listRef.current.scrollHeight - prevScrollDiff.current
  }, [workers])

  return (
    <section className="list-workers-shifts" ref={listRef} onScroll={onScroll}>
      {workers ? (
        <>
          {workers.map((worker) => (
            <article
              className={`worker-shift-item ${
                worker.shiftTime ? `selected ${worker.shiftTime}` : ''
              }`}
              key={worker._id}>
              <p>{worker.name}</p>
              <div className="icons">
                <span
                  className={`material-symbols-outlined ${
                    worker.shiftTime === 'morning'
                      ? `selected ${worker.shiftTime}`
                      : ''
                  }`}
                  onClick={(e) => handleToggleShift(worker._id, 'morning')}>
                  light_mode
                </span>
                <span
                  className={`material-symbols-outlined ${
                    worker.shiftTime === 'evening'
                      ? `selected ${worker.shiftTime}`
                      : ''
                  }`}
                  onClick={(e) => handleToggleShift(worker._id, 'evening')}>
                  nights_stay
                </span>
                <span
                  className={`material-symbols-outlined ${
                    worker.shiftTime === 'night'
                      ? `selected ${worker.shiftTime}`
                      : ''
                  }`}
                  onClick={(e) => handleToggleShift(worker._id, 'night')}>
                  dark_mode
                </span>
              </div>
            </article>
          ))}
        </>
      ) : null}
    </section>
  )
}
