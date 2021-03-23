import pymysql

pymysql.version_info = (1, 4, 13, "final", 0)
pymysql.install_as_MySQLdb()


# 创建项目目录
# django-admin startproject bysms
# 启动服务器
# python manage.py runserver 0.0.0.0:8087
# 创建一个APP
# python manage.py startapp sales
# 创建数据库
# python manage.py migrate
# 创建数据库表
# python manage.py makemigrations common
# python manage.py migrate
# 创建管理员用户
# python manage.py createsuperuser
# 管理员 134@qq.com   密码 132115abc2
# firoom 132115abc 132115@qq.com
# 数据库管理平台
# http://127.0.0.1:8087/admin/