import { Placemark, Map as YMap, YMaps } from "@pbe/react-yandex-maps";
import { FC, useState } from "react";

import { DEFAULT_MAP_CENTER, MAP_ZOOM } from "@/constants/map";

import { getCoords } from "@/utils";

import { Loader } from "@/components/Loader";

import { IPickPoint, PickPointId } from "@/types/pickPoint.interface";

import pointerSVG from "../../assets/img/pointer.svg";
import styles from "./Map.module.scss";

interface IProps {
  selectedPickPoint: IPickPoint | null;
  data: IPickPoint[];
  onPickPointClick: (id: PickPointId) => void;
}

export const MapComponent: FC<IProps> = ({
  onPickPointClick,
  data,
  selectedPickPoint,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const coords = getCoords(selectedPickPoint);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.overlay}>
          <Loader />
        </div>
      ) : null}

      <YMaps>
        <YMap
          width="100%"
          height="100%"
          onLoad={() => setIsLoading(false)}
          className={styles.map}
          state={{
            center: coords,
            zoom: MAP_ZOOM,
          }}
          defaultState={{
            center: DEFAULT_MAP_CENTER,
            zoom: MAP_ZOOM,
          }}
        >
          {data.map(({ id, latitude, longitude }) => (
            <Placemark
              onClick={() => onPickPointClick(id)}
              key={id}
              geometry={[latitude, longitude]}
              options={{
                iconLayout: "default#image",
                iconImageSize: [33, 50],
                iconImageHref: pointerSVG,
              }}
            />
          ))}
        </YMap>
      </YMaps>
    </div>
  );
};
