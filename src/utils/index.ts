import { TABLET_WIDTH } from "@/constants";
import { DEFAULT_MAP_CENTER } from "@/constants/map";

import { CoordsType, IPickPoint } from "@/types/pickPoint.interface";

export const getCoords = (pickPoint?: IPickPoint | null): CoordsType => {
  if (!pickPoint?.latitude || !pickPoint?.latitude) return DEFAULT_MAP_CENTER;

  return [pickPoint.latitude, pickPoint.longitude];
};

export const isTablet = (windowWidth: number | null) => {
  if (!windowWidth) return false;

  return windowWidth <= TABLET_WIDTH;
};
