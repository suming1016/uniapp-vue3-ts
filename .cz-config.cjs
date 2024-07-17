"use strict";
// git提交自定义提示;
module.exports = {
  types: [
    { value: "feature", name: "feature: 🚀 增加新功能", emoji: "🚀" },
    { value: "bug", name: "bug:      测试反馈bug列表中的bug号" },
    { value: "fix", name: "fix:      🧩 修复bug", emoji: "🧩" },
    { value: "ui", name: "ui:       更新UI" },
    { value: "docs", name: "docs:     📚  文档变更", emoji: "📚" },
    { value: "style", name: "style:    🎨  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: "🎨" },
    { value: "perf", name: "perf:    ⚡️  性能优化", emoji: "⚡️" },
    { value: "refactor", name: "refactor:  ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: "♻️" },
    { value: "release", name: "release:  发布" },
    { value: "deploy", name: "deploy:   部署" },
    { value: "test", name: "test:     ✅  添加疏漏测试或已有测试改动", emoji: "✅" },
    { value: "chore", name: "chore:    构建过程或辅助工具的变动(更改配置文件)" },
    { value: "revert", name: "revert:   ⏪️  回滚 commit", emoji: "⏪️" },
    {
      value: "build",
      name: "build:    📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）",
      emoji: "📦️"
    },
    { value: "workflow", name: "工作流:   📋  工作流程改进", emoji: "📋" },
    { value: "types", name: "类型:   🔰  类型定义文件修改", emoji: "🔰" }
  ],
  // override the messages, defaults are as follows
  messages: {
    type: "请选择提交类型:",
    customScope: "请输入您修改的范围(可选):",
    subject: "请简要描述提交 message (必填):",
    body: "请输入详细描述(可选，待优化去除，跳过即可):",
    footer: "请输入要关闭的issue(待优化去除，跳过即可):",
    confirmCommit: "确认使用以上信息提交？(y/n/e/h)"
  },
  useEmoji: true,
  allowCustomScopes: true,
  skipQuestions: ["body", "footer"],
  subjectLimit: 72
};
