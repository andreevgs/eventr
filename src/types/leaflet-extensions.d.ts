declare namespace L {
  namespace Control {
    interface Locate extends Control {
      start: () => void;
      stop: () => void;
      locate: () => Locate;
    }
  }
  namespace control {
    function locate(): Control.Locate;
  }
  interface Map {
    selectArea: {
      enable: () => void;
      disable: () => void;
      enabled(): () => boolean;
      setControlKey: (key: boolean) => void;
      setValidate: () => void;
    };
  }
  interface LeafletEventBounds {
    contains: (
      layerLatLngs: L.LatLng | (L.LatLng[] | L.LatLng[][] | L.LatLng[][][])
    ) => boolean;
  }
  interface LeafletEvent {
    bounds: LeafletEventBounds;
  }
}
