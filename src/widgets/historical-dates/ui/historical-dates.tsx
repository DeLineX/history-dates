import { FC, Key, useRef, useState, type ReactNode } from "react";
import styles from "./historical-dates.module.scss";
import { IntervalsCircle } from "./intervals-circle";
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
  const eventsSwiper = useRef<SwiperClass | null>(null);

  const currentInterval: HistoricalDateInterval = intervals.find(
    (it) => it.key === activeIntervalKey,
  )!;

  const handleYearsIntervalChange: YearsIntervalsSwiperProps["onSlideChange"] =
    (interval) => {
      setActiveIntervalKey(interval.key);
      eventsSwiper.current?.slideTo(0);
    };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.container}>
        <div className={styles.bgDecoration}>
          <IntervalsCircle activeDotKey={activeIntervalKey} dots={intervals} />
        </div>
        <div className={styles.yearsInterval}>
          <YearsIntervalsSwiper
            intervals={intervals}
            onSlideChange={handleYearsIntervalChange}
          />
        </div>
      </div>
      <EventsSwiper
        data={currentInterval.events}
        onSwiper={(swiper) => {
          eventsSwiper.current = swiper;
        }}
      />
    </div>
  );
};
