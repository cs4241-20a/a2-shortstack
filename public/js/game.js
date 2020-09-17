let notes = [];
$(function() {
    $("textarea").on("blur", function() {
        console.log($(this).val());
        notes = [];
        $("textarea").each(function() {
            notes.push($(this).val())
        })

        fetch('/notes', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notes),
        })
    })
    $('body').on("keydown", function(e){
        if($(e.target).is('textarea')) return;
        if (e.keyCode == 32) {
            console.log("space down")
            fetch("/gamedata")
                .then(response => response.json())
                .then(data => console.log)
            $("overlay").innerHTML = `
            <table>
        <caption>Game Data</caption>
        <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Notes</th>
        </tr>
        <tr>
        </tr>
    </table>`
        }
    });
    $('body').on("keyup", function(e){
        if($(e.target).is('textarea')) return;
        if (e.keyCode == 32) {
            console.log("space up")
        }
    });
})