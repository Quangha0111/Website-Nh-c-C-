var x = document.querySelector('.go_to_top');
x.addEventListener('click',function(){
    window.scrollTo(0,0);
})

//validate_register

const isPassword = (value) => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return reg.test(value);
}

const isRequired = (value) => {
    return value === "" || value === undefined || value === null ? false : true;
}
const isConfirmPassword = (value1, value2) => {
    return value2 === "" || value2 === undefined || value2 === null || value1 !== value2 ? false : true;
}
const isPhone = (value) => {
    //regex phone
    const reg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return reg.test(value);
}
const isEmail = (value) => {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return reg.test(value);
}
const show_message = (Id, message) => {
    var el = document.querySelector(Id).parentElement.querySelector('.form-message');
    el.innerHTML = message;
}
$(document).ready(function() {
    const form1 =$('#form-1 input')
    $.each(form1, (index,item)=>{
        $(item).on('blur', function(){
            validate_register();
        })
        $(item).on('input', function(){
            validate_register();
        })
    })

    const RegisterForm = $('#form-1');
    RegisterForm.on('submit', (e)=>{
        e.preventDefault()
        const name = document.getElementById('fullname').value;
        const email         = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmpass = document.getElementById('password_confirmation').value;
        
        const user ={
            name:name,
            email:email,
            password:password,
            confirmpass:confirmpass
        }
        if (validate_register()===true) {
            
            // RegisterForm.submit();
            localStorage.setItem("dangki",JSON.stringify(user))
            RegisterForm.trigger("reset");
            window.location =('profile.html');
    
        }
    
    });
    const user = JSON.parse(localStorage.getItem("dangki"));
    $('#ten').text(user.name);
    $('#email').text(user.email);
    console.log(user);

    // Login user
    $('#form_login').submit(function(event) {
        event.preventDefault();
        var email1 =$('#email1').val();
        var password1 =$('#password1').val();
        if(email1 === user.email && password1 === user.password){
            window.location= ('profile.html');
        }
        else{
            alert('Sai Email hoặc Mật Khẩu');
        }
    })
});
const validate_register = () => {
    const name = document.getElementById('fullname').value;
    const email         = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmpass = document.getElementById('password_confirmation').value;
    isRequired(name) === false ?
        show_message('#fullname', "Không để trông") :
        show_message('#fullname', "");
    isPassword(password) === false ?
        show_message('#password', "Mật khẩu >8 và cần 1 kí tự và số.") :
        show_message('#password', "");
    isEmail(email)=== false?
        show_message('#email',"Nhập email có dạng abc@gmail.com"):
        show_message('#email',"")
    isConfirmPassword(password, confirmpass) === false ?
        show_message('#password_confirmation', "Hai mật khẩu không trùng nhau") :
        show_message('#password_confirmation', "");
    if (isRequired(name) &&  isEmail(email)&& 
        isPassword(password) &&
        isConfirmPassword(password, confirmpass)
    ) {
        return true;
    } else {
        return false;
    }
}



