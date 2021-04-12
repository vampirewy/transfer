/**
 * @Author: csx
 * @Description
 * @Date: 2021/4/15 19:06
 * @Last Modified by: csx
 * @Last Modified time: 2021/4/15 19:06
 */

export default {
  methods: {
    showTitle(item) {
      let { title } = item.meta;
      if (!title) return;
      title = (item.meta && item.meta.title) || item.name;
      return title;
    },
    showChildren(item) {
      return (
        item.children &&
        (item.children.length > 1 || (item.meta && item.meta.showAlways))
      );
    },
    getNameOrHref(item, children0) {
      const name = children0 ? item.children[0].name : item.name;
      return item.href ? `isTurnByHref_${item.href}` : name;
    },
  },
};
