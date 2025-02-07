import {
  FC,
  Key,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./historical-dates.module.scss";
import { IntervalsCircle } from "./intervals-circle";
import { EventsSwiper } from "./events-swiper";
import {
  YearsIntervalsSwiper,
  type YearsIntervalsSwiperProps,
} from "./years-intervals-swiper";
import type SwiperClass from "swiper";
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
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 400px)").matches,
  );
  const eventsSwiper = useRef<SwiperClass | null>(null);
  const nextElRef = useRef<HTMLDivElement>(null);
  const prevElRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.matchMedia("(max-width: 400px)").matches);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  });

  const currentInterval: HistoricalDateInterval = intervals.find(
    (it) => it.key === activeIntervalKey,
  )!;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceRender] = useReducer((x) => !x, false);

  const handleYearsIntervalChange: YearsIntervalsSwiperProps["onSlideChange"] =
    (interval) => {
      setActiveIntervalKey(interval.key);
      eventsSwiper.current?.slideTo(0);
    };

  const yearsIntervalsSwiperControls = () => {
    const currentSlide =
      intervals.findIndex((it) => it.key === activeIntervalKey) + 1;
    return (
      <div className={styles.controls} ref={() => forceRender()}>
        <div className={styles.pagination}>
          {currentSlide.toString().padStart(2, "0")}/
          {intervals.length.toString().padStart(2, "0")}
        </div>
        <div className={styles.navigation}>
          <div className={clsx(styles.navEl)} ref={prevElRef}>
            <svg
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.49988 0.750001L2.24988 7L8.49988 13.25"
                stroke="#42567A"
                stroke-width="2"
              />
            </svg>
          </div>
          <div className={clsx(styles.navEl)} ref={nextElRef}>
            <svg
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
                stroke="#42567A"
                stroke-width="2"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const renderDeskTop = () => (
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
            nextEl={nextElRef.current}
            prevEl={prevElRef.current}
          />
          {yearsIntervalsSwiperControls()}
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

  const renderMobile = () => (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.yearsInterval}>
        <YearsIntervalsSwiper
          intervals={intervals}
          onSlideChange={handleYearsIntervalChange}
          nextEl={nextElRef.current}
          prevEl={prevElRef.current}
          paginationEl={paginationRef.current}
        />
      </div>
      <EventsSwiper
        data={currentInterval.events}
        onSwiper={(swiper) => {
          eventsSwiper.current = swiper;
        }}
      />
      <div className={styles.mobileControlsWrapper}>
        {yearsIntervalsSwiperControls()}
        <div className={styles.mobilePagination} ref={paginationRef} />
      </div>
    </div>
  );

  return isMobile ? renderMobile() : renderDeskTop();
};
