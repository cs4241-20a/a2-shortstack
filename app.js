const bodyParser = require('koa-body');
const Koa = require('koa');
const mount = require('koa-mount');
const render = require('./render');
const router = require('@koa/router')();
const serve = require('koa-static');

const app = new Koa();

// local database
const data = [
    {'name':"アンナチュラル", 'ps':9, 'ms':9, 'ss':8, 'es':10, 'date':'2020-05-19'},
    {name:"Harry Potter and the Sorcerer's Stone", ps:7, ms:6, ss:7, es:8, date:'2020-05-26'},
    {name:"Harry Potter and the Chamber of Secrets", ps:7, ms:7, ss:7, es:8, date:'2020-05-26'},
    {name:"Green Book", ps:8, ms:10, ss:8, es:9, date:'2020-05-27'},
    {name:"逃げるは恥だが役に立つ", ps:7, ms:7, ss:6, es:7, date:'2020-05-30'},
    {name:"Why Women Kill", ps:10, ms:9, ss:9, es:9, date:'2020-06-02'},
    {name:"Sherlock Season 1", ps:9, ms:7, ss:7, es:9, date:'2020-06-25'},
    {name:"La La Land", ps:9, ms:9, ss:10, es:10, date:'2020-06-25'},
    {name:"Sherlock Season 2", ps:8, ms:7, ss:7, es:8, date:'2020-07-27'},
    {name:"Fresh Off the Boat", ps:7, ms:7, ss:7, es:8, date:'2020-09-07'}
]

app.use(render);

app.use(bodyParser());

router.get('/', index);
router.get('/list', list);
router.get('/del/:id', del);
router.post('/add', add);

app.use(mount('/', router.routes()));
app.use(mount('/static', serve('./static')));

async function index(ctx) {
    await ctx.render('index', { data: data });
}

async function list(ctx) {
    for (let i = 0; i < data.length; i++) {

        if (typeof data[i].score !== 'undefined' || data[i].score == null) {
            data[i].ps = Number(data[i].ps);
            data[i].ms = Number(data[i].ms);
            data[i].ss = Number(data[i].ss);
            data[i].es = Number(data[i].es);

            data[i].score = ((data[i].ps + data[i].ms + data[i].ss + data[i].es) / 4).toFixed(2);
        }
    }

    data.sort(function (a, b) {return b.score - a.score;});
    ctx.body = data;
}

async function add(ctx) {
    const entry = ctx.request.body;

    entry.ps = Number(entry.ps);
    entry.ms = Number(entry.ms);
    entry.ss = Number(entry.ss);
    entry.es = Number(entry.es);

    const score = ((entry.ps + entry.ms + entry.ss + entry.es) / 4).toFixed(2);
    const id = data.push(entry) - 1;
    entry.id = id;
    entry.score = score;

    ctx.redirect('/');
}

async function del(ctx) {
    const id = ctx.params.id;
    data.splice(id, 1);

    ctx.redirect('/');
}


if (!module.parent) {
    app.listen(process.env.PORT || 3000);
    console.log('Started on port 3000');
}

module.exports = app;
