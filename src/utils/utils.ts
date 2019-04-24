import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

/**
 * 获取树形结构key值相同的第一个对象
 * @param {树形} tree
 * @param {key} key
 */
export function getTreeItem(tree, key) {
  let element = null;
  function getTree(data, id) {
    data.forEach(item => {
      if (item.id === id) {
        element = item;
        return;
      }
      if (item.children) {
        getTree(item.children, id);
      }
    });
  }
  getTree(tree, key);
  return element;
}
