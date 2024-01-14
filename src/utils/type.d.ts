/**
 * @param key: 唯一标识
 * @param provinceName: 省名
 * @param code: 编码
 * @param mount:医院数量
 * @param doctorNumber: 医生数量
 */
declare interface dictionaryDataType {
  /** 唯一标识 */
  key: React.Key;
  /** 省名 */
  provinceName: string;
  /** 编码 */
  code: string;
  /** 医院数量 */
  mount: number;
  /** 医生数量 */
  doctorNumber: number;
}
/**
 * @param  key: 唯一标识
 * @param  hospitalName: 医院名称
 * @param  additionDate: 添加的时间
 * @param  hospitalLevel: 医院水平
 * @param  province: 省名
 * @param  hospitalId?: 医院id
 */
declare interface ExpandedDataType {
  /** 唯一标识 */
  key: React.Key;
  /** 医院名称 */
  hospitalName: string;
  /** 添加的时间  */
  additionDate: string;
  /** 医院水平  */
  hospitalLevel: string;
  /** 省名  */
  province: string;
  /** 医院id  */
  hospitalId?: string;
}
/**
 * @param key 唯一标识
 * @param  id 序号
 * @param  customer 患者姓名
 * @param hospitalName 医院名称
 * @param  departmentName 科室
 * @param  createdDate 创建事件
 * @param  tags 病情
 */
declare interface addDataType {
  /** 唯一标识 */
  key: string;
  /** 序号 */
  id: string;
  /**患者姓名 */
  customer: string;
  /**医院名称 */
  hospitalName: string;
  /**科室 */
  departmentName: string;
  /**创建时间 */
  createdDate: string;
  /**病情 */
  tags: Array<string>;
}
/**
 * @param  key: string;
 * @param  orderId: string;
 * @param  customer: string;
 * @param name: string;
 * @param  departmentName: string;
 * @param  time: string;
 * @param  tags: Array<string>;
 */
declare interface listDataType {
  /** 唯一标识 */
  key: string;
  /** 订单id */
  orderId: string;
  /** 患者姓名 */
  customer: string;
  /** 医院名称 */
  hospitalName: string;
  /** 科室 */
  departmentName: string;
  /** 创建时间 */
  createdDate: string;
  /** 检查类别 */
  tags: Array<string>;
}
/**
 * @param key: 唯一标识;
 * @param  customer: 患者名称
 * @param  hospitalName: 医院名称
 * @param  departmentName: 科室
 * @param  createdDate:创建时间
 * @param  tags: 检查类别
 */
declare interface lookDataType {
  /** 唯一标识 */
  key: string;
  /** 患者名称 */
  customer: string;
  /** 医院名称 */
  hospitalName: string;
  /** 科室 */
  departmentName: string;
  /** 创建时间 */
  createdDate: string;
  /** 检查类别 */
  tags: Array<string>;
}
/**
 * @param hospitalName: 医院名称;
 * @param hospitalId: 医院id;
 * @param additionDate: 添加时间;
 * @param hospitalLevel: 医院水平;
 * @param position: 医院位置;
 */
declare interface child {
  /** 医院名称 */
  hospitalName: string;
  /** 医院id */
  hospitalId: string;
  /** 添加时间 */
  additionDate: string;
  /** 医院水平 */
  hospitalLevel: string;
  /** 医院位置 */
  position: string;
}
/**
 * @param provinceName 省名
 * @param code 编码
 * @param doctorNumber 医生数量
 * @param mount 医院数量
 */
declare interface ProvinceData {
  /** 省名 */
  provinceName: string;
  /** 编码 */
  code: string;
  /** 医生数量 */
  doctorNumber: number;
  /** 医院数量 */
  mount: number;
  /**
   * @example
   * hospitalName 医院名称
   * hospitalId 医院id
   * additionDate 添加的时间
   * hospitalLevel 医院等级
   * position 地址
   */
  children: child[];
}
/**
 * @param key 唯一标识
 * @param id 序号
 * @param order 订单号
 * @param hospitalName 医院名称
 * @param departmentName 科室名称
 * @param position 医生职称
 * @param scheduleTime 安排时间
 * @param customer 患者姓名
 * @param number 预约号
 * @param fee 费用
 * @param station 状况
 * @param createdDate 创建时间
 */
declare interface orderDataType {
  /** 唯一标识 */
  key: string;
  /** 序号 */
  id: string;
  /** 订单号 */
  order: string;
  /** 医院名称 */
  hospitalName: string;
  /** 科室名称 */
  departmentName: string;
  /** 医生职称 */
  position: string;
  /** 安排时间 */
  scheduleTime: string;
  /** 患者姓名 */
  customer: string;
  /** 预约号 */
  number: number;
  /** 费用 */
  fee: number;
  /** 状况 */
  station: string;
  /** 创建时间 */
  createdDate: string;
}

interface common {
  /** 患者姓名 */
  customer: string;
  /** 医院名称 */
  hospitalName: string;
  /** 医院水平 */
  hospitalLevel?: string;
  /** 医院地址 */
  hospitalAddress?: string;
  /** 就诊时间 */
  createdDate: string;
}
/**
 * @description 患者信息页面
 * @param key 唯一标识
 * @param customer 患者姓名
 * @param hospitalName 医院名称
 * @param hospitalLevel 医院水平
 * @param hospitalAddress 医院地址
 * @param createdDate 就诊时间
 * @param times 就诊次数
 * @param tags 患病标签
 * @param prescriptionDrug 处方药
 */
declare interface DataType extends common {
  /** 唯一标识 */
  key: string;
  /** 患病标签 */
  tags: string[];
  /** 就诊次数 */
  times: number;
  /** 处方药 */
  prescriptionDrug?: string;
}
/**
 * @description 数据库类型
 * @param customer 患者姓名
 * @param hospitalName 医院名称
 * @param hospitalLevel 医院水平
 * @param hospitalAddress 医院地址
 * @param createdDate 就诊时间
 * @param tags 患病标签
 * @param cause 患病原因
 * @param customerId 患者id
 * @param depart 科室
 * @param province 省份
 * @param prescriptionDrug 处方药
 */
declare interface Info extends common {
  /**  患病标签 */
  tags: string;
  /** 患病原因 */
  cause: string;
  /** 患者id */
  customerId: string;
  /** 科室 */
  depart: string;
  /** 省份 */
  province: string;
  /** 就诊次数 */
  times: number;
  /** 处方药 */
  prescriptionDrug: string;
}
/**
 * @param key 唯一标识
 * @param customer 患者姓名
 * @param hospitalName 医院名称
 * @param hospitalLevel 医院名称
 * @param hospitalAddress 医院地址
 * @param tags 患病标签
 * @param createdDate 就诊时间
 * @param reason 患病原因
 */
declare interface badDataType extends common {
  /** 唯一标识 */
  key: string;
  /** 患病标签 */
  tags: string[];
  /** 患病原因 */
  reason: string;
}
