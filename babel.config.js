module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // ← 기본값만 유지
  };
};
