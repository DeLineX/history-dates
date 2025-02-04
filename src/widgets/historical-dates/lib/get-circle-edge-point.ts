import { Point } from "shared/lib";
import { utils } from "shared/lib/uitls";

// todo: написать доку
export const getCircleEdgePoint = (
  x: number,
  y: number,
  radius: number,
  angle: number,
): Point => {
  const radiansAngle = utils.degreesToRadians(angle);

  return {
    x: x + radius * Math.cos(radiansAngle),
    y: y + radius * Math.sin(radiansAngle),
  };
};
