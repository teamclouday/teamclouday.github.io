$(document).ready(function(){
    // set events
    $(".page_header_btn_group #btn_home").on('click', ()=>{
        window.location.href = "https://www.google.com/"; // TODO: update url
    });
    $(".page_header_btn_group #btn_about").on('click', ()=>{
        window.location.href = "https://www.google.com/"; // TODO: update url
    });
    $(".page_header_btn_group #btn_projects").on('click', ()=>{
        window.location.href = "https://www.google.com/"; // TODO: update url
    });
    $(".page_header_btn_group #btn_blog").on('click', ()=>{
        window.location.href = "https://www.google.com/"; // TODO: update url
    });
    // set body height
    var height = $(window).height();
    $("#page_body").height(height - 280);
});