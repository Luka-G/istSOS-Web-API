$(document).ready(function() {

    $('#auto-update').change(function(evt) {
        if (this.checked) {
            $('.auto-update-interval').show();
        } else {
            $('.auto-update-interval').hide();
        }
    });


    $('#map_tool').click(function() {
        $('.common-item').val("");
        $('#preview').html("");
        $('#tools>div').hide();
        $('.widget-layout').hide();
        $('#server_data>div').hide();
        $('#code_output').val("");
        $('#map_tool_container').show();
        $('#common_settings').show();
        $('#update-container').show();
        $('#map_tool_info').show();
        $('#map_button').show();
    });


});