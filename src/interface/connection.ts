/**
 * 链接接口
 */
export interface ConnState {
  list: ListItem[];
  page: PageItem;
}

/**
 * 列表
 */
export interface ListItem {
  id: string;
  // 链接名称
  connectionName: string;
  // 数据库IP
  ip: string;
  // 数据库端口
  port: string;
  // 数据库名
  dbName: string;
  // 数据库用户名
  dbUsername: string;
  // 数据库密码
  dbPassword: string;
  // 备注
  des: string;
}

/**
 * 分页
 */
export interface PageItem {}
