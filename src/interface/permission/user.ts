/**
 * 用户表接口
 */
export interface UserState {
  userList: ListUserItem[];
  userPage: {};
  user: {};
}

/**
 * 列表
 */
export interface ListUserItem {
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
  // 备注
  des: string;
  // 用户名
  username: string;
  // 真实姓名
  realName: string;
  // 手机号
  mobile: string;
  // 加密密码
  password: string;
  // 邮箱
  email: string;
  // 出生日期
  birthday: string;
  // 头像
  avatar: string;
  // 性别 110男 111女 112未知
  gender: string;
  // 体重 单位kg
  weight: string;
  // 身高 单位厘米
  height: string;
  // 积分
  integration: string;
}

/**
 * 分页
 */
export interface PageUserItem {
  records: ListUserItem[];
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}
