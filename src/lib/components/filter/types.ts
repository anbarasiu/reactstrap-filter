export enum EFilterConfigType {
  date = 'date',
  number = 'amount',
  list = 'list',
  string = 'string',
}

export interface IFilterConfig {
  key: string;
  label: string;
  type: EFilterConfigType;
  data:
    | IFilterConfigNumber
    | IFilterConfigDate
    | IFilterConfigList
    | IFilterConfigString;
  selected: boolean;
}

export interface IFilterConfigDate {
  values: string[];
}

export interface IFilterConfigNumber {
  values: string[];
}

export interface IFilterConfigString {
  values: string[];
}

export interface IFilterConfigListOption {
  name: string;
  value: string;
}

export interface IFilterConfigList {
  options: IFilterConfigListOption[];
  values: string[];
}
