from django.urls import path

from . import views

urlpatterns = [
   path('problem/state', views.listMatchProblemState),
   path('problem/stateDetail', views.listStateDetail),
   path('post/problemShots', views.uploadShots),
   path('post/saveQuestionData', views.saveQuestionData),
]