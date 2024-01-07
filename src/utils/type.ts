export interface DataType {
  key: string;
  customer: string;
  name: string;
  level: string;
  address: string;
  tags: string[];
  time: string;
  timer: number;
}
export interface badDataType {
  key: string;
  customer: string;
  name: string;
  level: string;
  address: string;
  tags: string[];
  time: string;
  reason: string;
}
export interface orderDataType {
  key: string;
  id: string;
  order: string;
  name: string;
  departmentName: string;
  position: string;
  scheduleTime: string;
  customer: string;
  number: number;
  fee: number;
  station: string;
  time: string;
}
export interface dictionaryDataType {
  key: React.Key;
  sort: string;
  code: string;
  level: number;
  doctorNumber: number;
}
export interface ExpandedDataType {
  key: React.Key;
  id: string;
  name: string;
  level: string;
  time: string;
}
export interface addDataType {
  key: string;
  id: string;
  customer: string;
  name: string;
  departmentName: string;
  time: string;
  tags: Array<string>;
}

export interface listDataType {
  key: string;
  orderId: string;
  customer: string;
  name: string;
  departmentName: string;
  time: string;
  tags: Array<string>;
}
export interface lookDataType {
  key: string;
  customer: string;
  name: string;
  departmentName: string;
  time: string;
  tags: Array<string>;
}
