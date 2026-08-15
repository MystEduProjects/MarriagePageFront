// Equivalente simplificado a interpolate() + Extrapolation.CLAMP de Reanimated.
// Solo soporta 3 puntos (el caso que usa RenderItem), que es lo que necesitamos acá.
export const interpolate = (value, inputRange, outputRange) => {
  const [inMin, inMid, inMax] = inputRange;
  const [outMin, outMid, outMax] = outputRange;

  if (value <= inMin) return outMin;
  if (value >= inMax) return outMax;

  if (value <= inMid) {
    const t = (value - inMin) / (inMid - inMin);
    return outMin + t * (outMid - outMin);
  }

  const t = (value - inMid) / (inMax - inMid);
  return outMid + t * (outMax - outMid);
};
