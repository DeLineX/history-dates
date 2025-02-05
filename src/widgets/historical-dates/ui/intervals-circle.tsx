import clsx from "clsx";
import { FC, Key, useState } from "react";
import { Point } from "shared/lib";
import { getCircleEdgePoint } from "../lib/get-circle-edge-point";
import styles from "./intervals-circle.module.scss";

interface Dot {
  key: Key;
  title: string;
}

export interface IntervalsCircleProps {
  onDotClick: (dot: Dot) => void;
  activeDotKey: Key | undefined;
  dots: Dot[];
}

const SVG_SIZE = {
  width: 586,
  height: 530,
} as const;

const CIRCLE = {
  x: SVG_SIZE.width / 2,
  y: SVG_SIZE.height / 2,
  radius: 264.5,
} as const;

export const IntervalsCircle: FC<IntervalsCircleProps> = ({
  dots,
  activeDotKey,
  onDotClick,
}) => {
  const [hoveredDotKey, setHoveredDotKey] = useState<Dot["key"] | null>(null);
  const dotsCount = dots.length;
  const activeDotIndex = dots.findIndex((dot) => dot.key === activeDotKey);

  const dotsCoordinates: Point[] = [];

  const dAngle = 360 / dotsCount;
  let angleOffset = -60 - dAngle * activeDotIndex;
  dots.forEach(() => {
    const point = getCircleEdgePoint(
      CIRCLE.x,
      CIRCLE.y,
      CIRCLE.radius,
      angleOffset,
    );

    dotsCoordinates.push(point);
    angleOffset += dAngle;
  });

  const renderDot = (point: Point, idx: number) => {
    const dot = dots[idx];
    const isActive = dot.key === activeDotKey;
    const isHovered = dot.key === hoveredDotKey;
    return (
      <g
        key={dot.key}
        className={clsx(styles.group, {
          [styles.active]: isHovered || isActive,
          [styles.hover]: isHovered && !isActive,
        })}
      >
        <g
          onMouseEnter={() => setHoveredDotKey(dot.key)}
          onMouseLeave={() => setHoveredDotKey(null)}
        >
          <circle
            cx={point.x}
            cy={point.y}
            r={10}
            className={styles.dotHoverHelper}
          />
          <circle
            cx={point.x}
            cy={point.y}
            className={clsx(styles.dot, {
              [styles.active]: isActive,
            })}
            onClick={() => onDotClick(dot)}
          />
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
      className={styles.circle}
    >
      <circle
        opacity="0.2"
        cx={CIRCLE.x}
        cy={CIRCLE.y}
        r={CIRCLE.radius}
        stroke="#42567A"
      />
      {dotsCoordinates.map((point, idx) => renderDot(point, idx))}
    </svg>
  );
};
