$("#link_reg").on("click", function () {
  $(".login-box").hide();
  $(".reg-box").show();
});
$("#link_login").on("click", function () {
  $(".reg-box").hide();
  $(".login-box").show();
});
const form = layui.form;
const layer = layui.layer;
form.verify({
  repass(value) {
    const pwd = $(".reg-box [name=password").val();
    if (pwd !== value) return "两次密码不一致";
  },

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});
$("#form_reg").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.post({
    url: "/api/reguser",
    data,
    success: function (res) {
      const { status, message } = res;
      if (status !== 0) return layer.msg(message);
      $("#link_login").click();
    },
  });
});
$("#form-login").on("submit", function (e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.post({
    url: "/api/login",
    data,
    success: function (res) {
      const { status, message, token } = res;
      layer.msg(message);
      if (status !== 0) return layer.msg(message);
      localStorage.setItem("token", token);
      location.href = "/index.html";
    },
  });
});
