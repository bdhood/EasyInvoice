$.ajax({
  type: 'POST',
  url: "login.php",
  async: false,
  data: `{
    "email":"test@test.com",
    "password":"9bd4c8830b56e5a1ac0a8927c9f6d425ff0d5262ffcfca655fd5a6ce59c90782"
  }`,
  success: function(data) {
    if (data == "INVALID") {
      return;
    }
    let json = JSON.parse(data);
    localStorage.setItem('user_id', json['user_id']);
    localStorage.setItem('user_name', json['user_name']);
  },
  error: function(x, s, e) {
    localStorage.setItem('user_id', '');
    console.log("jQuery error message = ");
    console.log(x);
    console.log(s);
    console.log(e);
  }
});