from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, JsonResponse

from users.models import Users
import os


def uploadCertification(request):
    image = request.FILES['name']
    print(image)
    print('uploadUserShot')
    type = request.POST.get('type')
    basedir = 'D:\\ProgramSoft\\Git\\Virtual-try-on\\FiRoom_backend\\static\\masterCertification\\'
    if not os.path.exists(basedir + type + '.jpg'):
        with open(basedir + type + '.jpg', 'wb') as f:
            f.write(image.read())
            f.close()
    return JsonResponse({'code': 0, 'data': '', 'msg': 'success'})