from django.contrib import admin

# Register your models here.
from .models import MatchProblem, UserShot, MasterAnswer, AnswerImages

admin.site.register(MatchProblem)
admin.site.register(UserShot)
admin.site.register(MasterAnswer)
admin.site.register(AnswerImages)