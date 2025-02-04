import type { FC, Key } from "react";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import type SwiperClass from "swiper";
import styles from "./years-intervals-swiper.module.scss";
import clsx from "clsx";

interface Interval {
  key: Key;
  from: string;
  to: string;
}

export interface YearsIntervalsSwiperProps {
  intervals: Interval[];
  onSlideChange: (interval: Interval) => void;
  onSwiper: SwiperProps["onSwiper"];
}

export const YearsIntervalsSwiper: FC<YearsIntervalsSwiperProps> = ({
  intervals,
  onSlideChange,
  onSwiper,
}) => {
  const handleChange = (swiper: SwiperClass) => {
    onSlideChange(intervals[swiper.realIndex]);
  };

  return (
    <Swiper onRealIndexChange={handleChange} onSwiper={onSwiper}>
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
