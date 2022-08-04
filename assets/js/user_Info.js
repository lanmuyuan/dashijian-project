const form = layui.form;
$(function () {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: (val) => {
      if (val.length > 6) return "昵称长度必须在 1 ~ 6 个字符之间！";
    },
  });
  const layer = layui.layer;
  // 初始化用户信息
  const initUserInfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        const { status, message, data } = res;
        if (status !== 0) return layer.msg(message);
        form.val("formUserInfo", data);
      },
    });
  };

  initUserInfo();
  $("#resetBtn").on("click", function (e) {
    e.preventDefault();
    initUserInfo();
  });
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.post({
      url: "/my/userinfo",
      data: form.val("formUserInfo"),
      success: function (res) {
        const { message, status } = res;
        layer.msg(message);
        if (status == 0) {
          window.parent.getInfo();
        }
      },
    });
  });
});
