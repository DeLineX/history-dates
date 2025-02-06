import clsx from "clsx";
import { FC, Key, useEffect, useRef, useState } from "react";
import { Point } from "shared/lib";
import { getCircleEdgePoint } from "../lib/get-circle-edge-point";
import styles from "./intervals-circle.module.scss";

interface Dot {
  key: Key;
  title: string;
}

export interface IntervalsCircleProps {
  activeDotKey: Key | undefined;
  dots: Dot[];
}

const SVG_SIZE = {
  width: 586,
  height: 586,
} as const;

const CIRCLE = {
  x: SVG_SIZE.width / 2,
  y: SVG_SIZE.height / 2,
  radius: 264.5,
} as const;

export const IntervalsCircle: FC<IntervalsCircleProps> = ({
  dots,
  activeDotKey,
}) => {
  const dotsCount = dots.length;
  const activeDotIndex = dots.findIndex((dot) => dot.key === activeDotKey);

  const dAngle = 360 / dotsCount;
  const [offset, setOffset] = useState(dAngle * activeDotIndex);
  const newOffsetRef = useRef<number>(offset);
  const prevOffsetRef = useRef<number>(offset);
  const currentOffsetRef = useRef<number>(offset);

  currentOffsetRef.current = offset;

  useEffect(() => {
    newOffsetRef.current = dAngle * activeDotIndex;
    prevOffsetRef.current = currentOffsetRef.current;
  }, [activeDotIndex, activeDotKey, dAngle]);

  useEffect(() => {
    const speed = 150;
    const deltaDeg =
      Math.abs(prevOffsetRef.current - newOffsetRef.current) / speed;

    const timeoutId = setTimeout(() => {
      if (Math.abs(offset - newOffsetRef.current) > deltaDeg) {
        setOffset(
          (offset) =>
            offset + Math.sign(newOffsetRef.current - offset) * deltaDeg,
        );
      } else {
        setOffset(newOffsetRef.current);
      }
    }, 1);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeDotIndex, dAngle, offset]);

  const dotsCoordinates = dots.map((_, idx) =>
    getCircleEdgePoint(
      CIRCLE.x,
      CIRCLE.y,
      CIRCLE.radius,
      dAngle * idx - 60 - offset,
    ),
  );

  const renderDot = (point: Point, idx: number) => {
    const dot = dots[idx];
    const isActive = dot.key === activeDotKey;
    return (
      <g
        key={dot.key}
        className={clsx({
          [styles.active]: isActive,
        })}
      >
        <g>
          <circle cx={point.x} cy={point.y} className={clsx(styles.dot)} />
          <text x={point.x} y={point.y} className={styles.num}>
            {idx + 1}
          </text>
        </g>
        <text x={point.x + 47.5} y={point.y} className={styles.title}>
          {dot.title}
        </text>
      </g>
    );
  };

  return (
    <svg
      width="100%"
      height={SVG_SIZE.height}
      viewBox={[0, 0, SVG_SIZE.width, SVG_SIZE.height].join(" ")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.wrapper}
    >
      <circle
        cx={CIRCLE.x}
        cy={CIRCLE.y}
        r={CIRCLE.radius}
        className={styles.circle}
      />
      {dotsCoordinates.map((point, idx) => renderDot(point, idx))}
    </svg>
  );
};
