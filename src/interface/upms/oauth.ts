import { TreeDict } from '@/interface/upms/dict';
/**
 * 授权表接口
 */
export interface OauthState {
  oauthList: ListOauthItem[];
  oauthPage: {};
  oauth: {};
  grantType: TreeDict[];
}

/**
 * 列表
 */
export interface ListOauthItem {
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
  // 客户端ID
  clientId: string;
  // 客户端密钥
  clientSecret: string;
  // 资源ID
  resourceIds: string;
  // 授权域
  scope: string;
  // 授权模式
  authorizedGrantTypes: string;
  // 回调地址
  webServerRedirectUri: string;
  // 权限
  authorities: string;
  // 失效时间
  accessTokenValidity: string;
  // 刷新时间
  refreshTokenValidity: string;
  // 扩展信息
  additionalInformation: string;
  // 是否自动放行
  autoapprove: string;
}

/**
 * 分页
 */
export interface PageOauthItem {
  records: ListOauthItem[];
  total: number;
  size: number;
  current: number;
  searchCount: boolean;
  pages: number;
}
