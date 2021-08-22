# fullstack-exam-pdkm

## ข้อ 1
### การรันโปรเจค
โปรเจคจะอยู่ใน solve-problem

```
npm install
npm run dev
```


## ข้อ 2
### การรัน service

โปรเจคอยู่ใน backend

ใช้ composer ในการจัดการ package รันคำสั่ง `composer install`

ตั้งค่า env โดย generate key ด้วยคำสั่ง

`php artisan key:generate`

สร้าง database เปล่า ๆ แล้วตั้งค่าการเชื่อมต่อ database ให้ถูกต้อง (ใช้ mariadb หรือ mysql)

```
DB_CONNECTION=mysql<br>
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

จากนั้นรันคำสั่ง เพื่อน generate ข้อมูล
`php artisan db:seed`

รัน service ด้วยคำสั่ง
`php artisan run serve`

### การรัน Frontend

โปรเจคอยู่ใน frontend

```
npm install
npm run build
npm run start
```

หากต้องการเปลี่ยน end point service จะอยู่ที่ frontend/config/app.js

path ของหน้าเว็บ ตัวอย่าง localhost:3000/store
