<template>
  <div v-if="isLoad">
    <VssueComponent :title="title" :options="options" />
  </div>
</template>

<script>
import { VssueComponent } from "vssue";
import VssueAPI from "@vssue/api";
import ejs from "ejs";
import "./styles/index.styl";

export default {
  components: {
    VssueComponent: VssueComponent,
  },

  data() {
    return {
      isLoad: false,
    };
  },

  watch: {
    "$page.key"(val, old) {
      // 评论区防抖
      if (!val || old === val) {
        return;
      }
      // 在页面变化时刷新评论区
      this.initialize();
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initialize();
    });
  },
  methods: {
    initialize() {
      this.$el.remove();
      this.isLoad = false;
      setTimeout(() => {
        if (this.needComment(this.$frontmatter)) {
          const container = document.querySelector(VSSUE_CONTAINER);
          container.appendChild(this.$el);
          this.title = ejs.render(VSSUE_TITLE, {
            frontmatter: this.$frontmatter,
          });
          this.options = {
            api: VssueAPI,
            ...VSSUE_OPTIONS,
          };
          this.isLoad = true;
        }
      }, 1000);
    },

    needComment(frontmatter) {
      let nc = VSSUE_NEEDCOMMENTS;
      if (nc) {
        return frontmatter.comment !== false && frontmatter.comments !== false;
      } else {
        return frontmatter.comment === true || frontmatter.comments === true;
      }
    },
  },
};
</script>
