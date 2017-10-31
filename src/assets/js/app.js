function prevCarrousel(oControl){
    $('#'+oControl.name).carousel('prev');
}
function nextCarrousel(oControl){
    $('#'+oControl.name).carousel('next');
}
$(document).ready(function(){
    $('.carousel').carousel({
        interval: false
    }); 
});