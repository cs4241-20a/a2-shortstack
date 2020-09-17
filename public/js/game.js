let notes = [];
$(function () {
    $("textarea").on("blur", function () {
        console.log($(this).val());
        notes = [];
        $("textarea").each(function () {
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
    $('body').on("keydown", function (e) {
        if (e.repeat) {
            return
        }
        if ($(e.target).is('textarea')) return;
        if (e.keyCode == 32) {
            fetch("/gamedata")
                .then(response => response.json())
                .then(data => {
                    $("#overlay").html(`
            <table>
                <caption>Game Data</caption>
                <tr>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Notes</th>
                </tr>
                ${data.map(function (value) {
                        return `<tr>
                        <td>${value.name}</td>
                        <td>${value.color}</td>
                        <td>${value.notes}</td>
                </tr>`
                    })}
        })
            </table>`)
                    $("#overlay").show()
                })
        }

    });
    $('body').on("keyup", function (e) {
        if ($(e.target).is('textarea')) return;
        if (e.keyCode == 32) {
            $("#overlay").hide()
        }
    });
})