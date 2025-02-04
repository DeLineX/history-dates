import { FC, Key, useRef, useState, type ReactNode } from "react";
import styles from "./historical-dates.module.scss";
import { IntervalsCircle, IntervalsCircleProps } from "./intervals-circle";
import { EventsSwiper } from "./events-swiper";
import {
  YearsIntervalsSwiper,
  type YearsIntervalsSwiperProps,
} from "./years-intervals-swiper";
import type SwiperClass from "swiper";

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
  const yearsSwiper = useRef<SwiperClass | null>(null);

  const handleDotClick: IntervalsCircleProps["onDotClick"] = (dot) => {
    setActiveIntervalKey(dot.key);
    yearsSwiper.current?.slideTo(
      intervals.findIndex((it) => it.key === dot.key),
    );
  };

  const currentInterval: HistoricalDateInterval = intervals.find(
    (it) => it.key === activeIntervalKey,
  )!;

  const handleYearsIntervalChange: YearsIntervalsSwiperProps["onSlideChange"] =
    (interval) => {
      setActiveIntervalKey(interval.key);
    };

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
          <YearsIntervalsSwiper
            intervals={intervals}
            onSlideChange={handleYearsIntervalChange}
            onSwiper={(swiper) => {
              yearsSwiper.current = swiper;
            }}
          />
        </div>
      </div>
      <EventsSwiper key={activeIntervalKey} data={currentInterval.events} />
    </div>
  );
};
