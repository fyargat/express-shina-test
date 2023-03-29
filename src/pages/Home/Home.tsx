import axios from "axios";
import cn from "classnames";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { pickPointAPI } from "@/api";

import * as utils from "@/utils";

import { useWindowSize } from "@/hooks/useWindowSize";

import { Wrapper } from "@/layouts/Wrapper";

import { Aside } from "@/components/Aside";
import { DropDown } from "@/components/DropDown";
import { MapComponent } from "@/components/Map";

import { IPickPoint, PickPointId } from "@/types/pickPoint.interface";

import styles from "./Home.module.scss";

const Home: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IPickPoint[]>([]);
  const [selectedPickPoint, setSelectedPickPoint] = useState<IPickPoint | null>(
    null,
  );

  const dataMap = useRef<Map<PickPointId, IPickPoint>>(new Map());

  const windowSize = useWindowSize();
  const isTablet = utils.isTablet(windowSize.width);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = (await pickPointAPI.fetchData(source)) as IPickPoint[];

        setData(data);
        setIsLoading(false);

        for (const pickPoint of data) {
          dataMap.current.set(pickPoint.id, pickPoint);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      source.cancel("request cancelled");
    };
  }, []);

  const handlePickPointClick = useCallback((id: PickPointId) => {
    const selectedPickPoint = dataMap.current.get(id) ?? null;
    setSelectedPickPoint(selectedPickPoint);
  }, []);

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={cn(styles.side, styles.sideLeft)}>
          {isTablet ? (
            <DropDown
              selectedPickPoint={selectedPickPoint}
              data={data}
              onPickPointClick={handlePickPointClick}
            />
          ) : (
            <Aside
              isLoading={isLoading}
              selectedPickPoint={selectedPickPoint}
              data={data}
              onPickPointClick={handlePickPointClick}
            />
          )}
        </div>
        <div className={cn(styles.side, styles.sideRight)}>
          <MapComponent
            data={data}
            selectedPickPoint={selectedPickPoint}
            onPickPointClick={handlePickPointClick}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
