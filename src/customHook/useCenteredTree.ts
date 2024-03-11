import { useCallback, useState } from "react";

type UseCenteredPropTypes = {
  x: number;
  y: number;
};

type DimensionPropTypes = {
  width: number;
  height: number;
};
export const useCenteredTree = (defaultTranslate = { x: 10, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const [dimensions, setDimensions] = useState<DimensionPropTypes>({
    width: 0,
    height: 0,
  });
  const containerRef: any = useCallback((containerElem: any) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width: width , height: height });
      setTranslate({ x: width / 2.5, y: height / 3 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};
