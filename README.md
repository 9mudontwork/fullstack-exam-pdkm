# fullstack-exam-pdkm

### การรัน service

โปรเจคอยู่ใน backend

ตั้งค่า env โดย generate key ด้วยคำสั่ง

`php artisan key:generate`

APP_KEY=

ตั้งค่าการเชื่อมต่อ database ห้ถูกต้อง (ใช้ mariadb หรือ mysql)

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

จากนั้นรันคำสั่ง เพื่อน generate ข้อมูล
`php artisan db:seed`

รัน service ด้วยคำสั่ง
`php artisan run serve`

### การรัน Frontend
