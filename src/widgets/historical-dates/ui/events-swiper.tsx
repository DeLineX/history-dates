import type { FC, Key, ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./events-swiper.module.scss";

export interface EventsSwiperProps {
  data: {
    key: Key;
    title: string;
    description: ReactNode;
  }[];
}

export const EventsSwiper: FC<EventsSwiperProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      <Swiper spaceBetween={80} slidesPerView="auto">
        {data.map((it) => (
          <SwiperSlide key={it.key} className={styles.slide}>
            <div className={styles.title}>{it.title}</div>
            <div className={styles.description}>{it.description}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
