import { useReducer, useRef, type FC, type Key, type ReactNode } from "react";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import styles from "./events-swiper.module.scss";
import { Navigation } from "swiper/modules";

export interface EventsSwiperProps {
  data: {
    key: Key;
    title: string;
    description: ReactNode;
  }[];
  onSwiper: SwiperProps["onSwiper"];
}

export const EventsSwiper: FC<EventsSwiperProps> = ({ data, onSwiper }) => {
  const nextElRef = useRef<HTMLDivElement>(null);
  const prevElRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceRender] = useReducer((x) => !x, false);

  return (
    <div className={styles.root}>
      <Swiper
        spaceBetween={40}
        breakpoints={{
          400: {
            spaceBetween: 80,
          },
        }}
        slidesPerView="auto"
        className={styles.swiper}
        modules={[Navigation]}
        navigation={{ nextEl: nextElRef.current, prevEl: prevElRef.current }}
        onSwiper={onSwiper}
      >
        {data.map((it) => (
          <SwiperSlide key={it.key} className={styles.slide}>
            <div className={styles.title}>{it.title}</div>
            <div className={styles.description}>{it.description}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.navigation} ref={forceRender}>
        <div className={styles.navEl} ref={prevElRef}>
          <svg
            style={{
              transform: "rotate(180deg)",
            }}
            width="10"
            height="14"
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
        <div className={styles.navEl} ref={nextElRef}>
          <svg
            width="10"
            height="14"
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
