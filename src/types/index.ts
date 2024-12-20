export interface SelectOption {
  name: string;
  value: string;
}

interface ICSLocation {
  location: [number?, number?];
  geocode: string;
}

export interface SharedEvent {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  notification: string;
  icsLocation?: ICSLocation;
}
