import type { FC, Key } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type SwiperClass from "swiper";
import styles from "./years-intervals-swiper.module.scss";
import clsx from "clsx";
import { Navigation, Pagination } from "swiper/modules";

interface Interval {
  key: Key;
  from: string;
  to: string;
}

export interface YearsIntervalsSwiperProps {
  intervals: Interval[];
  onSlideChange: (interval: Interval) => void;
  nextEl?: HTMLElement | null;
  prevEl?: HTMLElement | null;
  paginationEl?: HTMLElement | null;
}

export const YearsIntervalsSwiper: FC<YearsIntervalsSwiperProps> = ({
  intervals,
  onSlideChange,
  nextEl,
  prevEl,
  paginationEl,
}) => {
  const handleChange = (swiper: SwiperClass) => {
    onSlideChange(intervals[swiper.realIndex]);
  };

  return (
    <Swiper
      onRealIndexChange={handleChange}
      modules={[Pagination, Navigation]}
      navigation={{
        prevEl,
        nextEl,
      }}
      className={styles.swiper}
      pagination={{
        el: paginationEl,
      }}
      breakpoints={{
        400: { pagination: false },
      }}
    >
      {intervals.map(({ from, to, key }) => (
        <SwiperSlide key={key}>
          <div className={styles.slide}>
            <span className={clsx(styles.year, styles.from)}>{from}</span>
            <span className={clsx(styles.year, styles.to)}>{to}</span>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
