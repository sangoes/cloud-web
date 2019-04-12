/**
 * 字典表接口
 */
export interface DictState {
  list: ListItem[];
  page: PageItem;
  dict: {};
}

/**
 * 列表
 */
export interface ListItem {
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
export interface PageItem {}
