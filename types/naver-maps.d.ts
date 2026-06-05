declare namespace naver.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Map {
    constructor(element: HTMLElement | string, options: MapOptions);
  }

  class Marker {
    constructor(options: MarkerOptions);
  }

  enum Position {
    TOP_RIGHT = 3,
  }

  interface MapOptions {
    center: LatLng;
    zoom: number;
    zoomControl?: boolean;
    zoomControlOptions?: {
      position?: Position;
    };
  }

  interface MarkerOptions {
    position: LatLng;
    map: Map;
  }
}

declare namespace naver {
  const maps: typeof naver.maps;
}

interface Window {
  naver?: typeof naver;
}
