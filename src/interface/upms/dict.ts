/**
 * 字典表接口
 */
export interface DictState {
  dictList: [];
  dictPage: {};
  dict: {};
  treeDict: [];
}

/**
 * 列表
 */
export interface ListDictItem {
  // 主键
  id: string;
  // 创建日期
  crtTime: string;
  // 更新日期
  updTime: string;
  // 创建者
  creator: string;
  // 更新者
  updator: string;
  // 状态
  status: string;
  // 排序
  sort: string;
  // 父主键 默认-1
  pid: string;
  // 字典key
  dictKey: string;
  // 字典value
  dictValue: string;
  // 备注
  des: string;
}

/**
 * 分页
 */
export interface PageDictItem {
  records: ListDictItem[];
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}

/**
 * 树形
 */
export interface TreeDict {
  id: string;
  pid: string;
  children: TreeDict[];
  title: string;
  key: string;
  value: string;
  des: string;
}
