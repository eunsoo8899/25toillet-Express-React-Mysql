var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session')

var indexRouter = require('./routes/index');

var aboutRouter = require('./routes/about');
var boardRouter = require('./routes/board')
var categoryRouter = require('./routes/category')
var contactRouter = require('./routes/contact');
var imagesRouter = require('./routes/images');
var reviewRouther = require('./routes/review')
var subscribeRouther = require('./routes/subscribe')
var usersRouter = require('./routes/users');
var workRouter = require('./routes/work');
var profileRouter = require('./routes/profile');



var swaggerUi = require('swagger-ui-express')
var swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config')


var app = express();

const swaggerDefinition = {
  info: {
    title: '25toillet Server API',
    version: '1.0.0',
    description: 'API description',
},
  // host: 'localhost:3000',
  host: config.url,
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};



app.use(cors())

//view의 경로 설정
app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'ejs');

const options = {
  swaggerDefinition,
  apis: ['./server/schemas/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger('dev'));
//logger 모듈을 사용한다면 설정
//logger 모듈 보다 위에 선언한 모듈에 대해서는 로깅을 받지 않는다.
//dev 설정을 하면 response에 따라 색이 다른 로그를 보여준다.

app.use(express.json());
//헤더의 content type을 자동으로 json으로 설정해 줌

app.use(express.urlencoded({ extended: false }));
//한글 등 url을 utf8로 인코딩 할 필요가 있을때 사용
//보다 다양한 모듈과 형식을 지원하고 싶으면 extended를 true로 설정한다.

app.use(cookieParser());
//서버에서 쿠키를 쉽게 생성할 수 있게 해주는 모듈
//http 프로토콜은 통신이 끝나면 상태 정보를 저장하지 않기 때문에, 유저가 다시 접속 시 이전 화면을 보여주는 등 상태에 대한 저장이 필요할 때 사용

app.use(express.static(path.join(__dirname, 'public')));
//static(전 경로에서 참조할 수 있는) 루트 디렉토리를 설정해 줌

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(
  session({
    key:"users_id",
    secret:"subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      // 24hour
      expires: 60 * 60 * 24,
    }
  })
)

app.use('/', indexRouter);
app.use('/about', aboutRouter); 
app.use('/board', boardRouter)
app.use('/category', categoryRouter)
app.use('/contact', contactRouter); 
app.use('/images', imagesRouter)
app.use('/review', reviewRouther)
app.use('/subscribe', subscribeRouther)
app.use('/users', usersRouter);
app.use('/work', workRouter); 
app.use('/profile', profileRouter); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
