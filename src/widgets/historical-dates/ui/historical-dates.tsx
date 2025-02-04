import { FC, Key, useState, type ReactNode } from "react";
import styles from "./historical-dates.module.scss";
import { IntervalsCircle, IntervalsCircleProps } from "./intervals-circle";
import { EventsSwiper } from "./events-swiper";
import clsx from "clsx";

interface HistoricalDateIntervalEvent {
  key: Key;
  title: string;
  description: ReactNode;
}

interface HistoricalDateInterval {
  key: Key;
  from: string;
  to: string;
  title: string;
  events: HistoricalDateIntervalEvent[];
}

export interface HistoricalDatesProps {
  title: ReactNode;
  intervals: HistoricalDateInterval[];
}

export const HistoricalDates: FC<HistoricalDatesProps> = ({
  title,
  intervals,
}) => {
  const [activeIntervalKey, setActiveIntervalKey] = useState<Key | undefined>(
    intervals.at(0)?.key,
  );

  const handleDotClick: IntervalsCircleProps["onDotClick"] = (dot) => {
    setActiveIntervalKey(dot.key);
  };

  const currentInterval: HistoricalDateInterval = intervals.find(
    (it) => it.key === activeIntervalKey,
  )!;

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.container}>
        <IntervalsCircle
          activeDotKey={activeIntervalKey}
          dots={intervals}
          onDotClick={handleDotClick}
        />
        <div className={styles.yearsInterval}>
          <span className={clsx(styles.year, styles.from)}>
            {currentInterval.from}
          </span>
          <span className={clsx(styles.year, styles.to)}>
            {currentInterval.to}
          </span>
        </div>
      </div>
      <EventsSwiper key={activeIntervalKey} data={currentInterval.events} />
    </div>
  );
};
