/**
 * @Author: jrucker
 * @Description
 * @Date: 2020/8/19 19:06
 * @Last Modified by: jrucker
 * @Last Modified time: 2020/8/19 19:06
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
