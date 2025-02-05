import type { FC, Key } from "react";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
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
    <Swiper
      onRealIndexChange={handleChange}
      onSwiper={onSwiper}
      modules={[Pagination, Navigation]}
      navigation={{
        prevEl: `.${styles.prevEl}`,
        nextEl: `.${styles.nextEl}`,
      }}
      pagination={{
        type: "fraction",
        formatFractionCurrent: (num) =>
          num < 10 ? `${num}`.padStart(2, "0") : num,
        formatFractionTotal: (num) =>
          num < 10 ? `${num}`.padStart(2, "0") : num,
        el: `.${styles.pagination}`,
        renderFraction: (currentClass, totalClass) =>
          `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`,
      }}
      className={styles.swiper}
    >
      {intervals.map(({ from, to, key }) => (
        <SwiperSlide key={key}>
          <div className={styles.slide}>
            <span className={clsx(styles.year, styles.from)}>{from}</span>
            <span className={clsx(styles.year, styles.to)}>{to}</span>
          </div>
        </SwiperSlide>
      ))}
      <div
        className={styles.controls}
        style={{
          zIndex: 2,
        }}
      >
        <div className={styles.pagination} />
        <div className={styles.navigation}>
          <div className={clsx(styles.prevEl, styles.navEl)}>{"<"}</div>
          <div className={clsx(styles.nextEl, styles.navEl)}>{">"}</div>
        </div>
      </div>
    </Swiper>
  );
};
